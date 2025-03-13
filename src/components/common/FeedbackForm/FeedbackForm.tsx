'use client';

import { useEffect, useState } from 'react';
import ReactStars from 'react-stars';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchReview, saveReview, deleteReview } from '@/utils/getReviews';

export const FeedbackForm = () => {
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const { data: review, isLoading } = useQuery({
    queryKey: ['review'],
    queryFn: fetchReview,
  });

  useEffect(() => {
    if (review?.success && review.data) {
      setRating(review.data.rating);
      setComment(review.data.comment);
    }
  }, [review]);

  const saveMutation = useMutation({
    mutationFn: () => saveReview(rating, comment, !!review?.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['review'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      setRating(0);
      setComment('');
      queryClient.invalidateQueries({ queryKey: ['review'] });
    },
  });

  return (
    <div>
      <div className="mb-[20px] md:mb-[24px]">
        <p className="text-[12px] leading-[1.16] text-blackText">Rating</p>
        <ReactStars
          count={5}
          size={30}
          color2={'#FFAC33'}
          color1={'#CEC9C1'}
          value={rating}
          half={true}
          onChange={newRating => setRating(newRating)}
        />
      </div>

      <div>
        <p className="mb-[8px] text-[12px] leading-[1.16] text-blackText">
          Review
        </p>

        <textarea
          className="w-full rounded-[8px] border bg-grayBg px-[14px] py-[12px]"
          placeholder="Write your review..."
          value={comment}
          onChange={e => setComment(e.target.value)}
        ></textarea>
      </div>

      <div className="mt-4 flex justify-between">
        <button
          className="rounded-md bg-blue-500 px-4 py-2 text-white disabled:bg-gray-400"
          onClick={() => saveMutation.mutate()}
          disabled={saveMutation.isPending || isLoading}
        >
          {review?.data ? 'Edit Review' : 'Submit Review'}
        </button>

        {review?.data && (
          <button
            className="rounded-md bg-red-500 px-4 py-2 text-white disabled:bg-gray-400"
            onClick={() => deleteMutation.mutate()}
            disabled={deleteMutation.isPending}
          >
            Delete Review
          </button>
        )}
      </div>
    </div>
  );
};
