'use client';

import { useEffect, useState } from 'react';
import ReactStars from 'react-stars';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { fetchReview, saveReview, deleteReview } from '@/utils/getReviews';
import EditIcon from '@/public/icon/feedbackEdit.svg';
import DeleteIcon from '@/public/icon/feedbackDelete.svg';
import { FeedbackFormSkeleton } from '@/components/ui/FeedbackFormSkeleton/FeedbackFormSkeleton';

interface IFeedbackForm {
  onClose: () => void;
}

export const FeedbackForm = ({ onClose }: IFeedbackForm) => {
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [showComponents, setShowComponents] = useState(false);

  const {
    data: review,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['review'],
    queryFn: fetchReview,
  });

  useEffect(() => {
    if (isFetching) {
      setShowComponents(false);
    } else {
      const timer = setTimeout(() => {
        setShowComponents(true);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isFetching]);

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
      toast.success('Review saved successfully!');
    },
    onError: () => {
      toast.error('Failed to save review. Please try again.');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      setRating(0);
      setComment('');
      queryClient.invalidateQueries({ queryKey: ['review'] });
      toast.success('Review deleted successfully!');
    },
    onError: () => {
      toast.error('Failed to delete review. Please try again.');
    },
  });

  const handleSave = () => {
    if (rating === 0) {
      toast.error('Please provide a rating before submitting.');
      return;
    }

    if (comment.trim() === '') {
      toast.error('Review text cannot be empty.');
      return;
    }

    saveMutation.mutate();
  };

  const handleEdit = () => {
    setIsEditOpen(!isEditOpen);
  };

  if (isFetching || !showComponents) {
    return <FeedbackFormSkeleton />;
  }

  return (
    <div className="w-[295px] md:w-[404px]">
      <div className="mb-[20px] md:mb-[24px]">
        <p className="text-[12px] leading-[1.16] text-blackText dark:text-grayTheme">
          Rating
        </p>
        <ReactStars
          count={5}
          size={24}
          color2={'#FFAC33'}
          color1={'#CEC9C1'}
          value={rating}
          half={true}
          onChange={newRating => setRating(newRating)}
        />
      </div>

      <div>
        <div className="mb-[8px] flex h-[30px] items-center justify-between">
          <p className="text-[12px] leading-[1.16] text-blackText dark:text-grayTheme">
            Review
          </p>

          {review?.data && (
            <div className="flex gap-[8px]">
              <button
                type="button"
                onClick={handleEdit}
                className="group flex h-[30px] w-[30px] items-center justify-center rounded-[50%] bg-[#E3F3FF] transition-colors hover:bg-blueMain dark:bg-[#353647] dark:hover:bg-blueMain"
              >
                <EditIcon className="h-[16px] w-[16px] stroke-[#3E85F3] transition-colors group-hover:stroke-white" />
              </button>
              <button
                type="button"
                onClick={() => deleteMutation.mutate()}
                disabled={deleteMutation.isPending}
                className="group flex h-[30px] w-[30px] items-center justify-center rounded-[50%] bg-[#ea3d6533] transition-colors hover:bg-blueMain"
              >
                <DeleteIcon className="h-[16px] w-[16px] stroke-[#EA3D65] transition-colors group-hover:stroke-white" />
              </button>
            </div>
          )}
        </div>

        <textarea
          className="min-h-[130px] w-full resize-none rounded-[8px] border bg-grayBg px-[14px] py-[12px] text-[14px] leading-[1.28] dark:bg-blackLightBg dark:text-white"
          placeholder="Write your review..."
          value={comment}
          onChange={e => setComment(e.target.value)}
        ></textarea>
      </div>

      {(!review?.data || isEditOpen) && (
        <div className="mt-[14px] flex justify-between gap-[8px]">
          <button
            className="btnEffect w-full rounded-[8px] bg-blueMain py-[12px] text-[14px] font-600 text-white"
            onClick={handleSave}
            disabled={saveMutation.isPending || isLoading}
          >
            {review?.data ? 'Edit' : 'Save'}
          </button>
          <button
            className="w-full rounded-[8px] bg-[#E5EDFA] py-[12px] text-[14px] font-600 text-blackText transition-colors hover:bg-gray-300 dark:bg-[#21222C] dark:text-white"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};
