'use client';

import { useEffect, useState } from 'react';
import ReactStars from 'react-stars';
import { fetchReview, saveReview, deleteReview } from '@/utils/getReviews';

export const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [reviewExists, setReviewExists] = useState(false);

  useEffect(() => {
    const getReview = async () => {
      const result = await fetchReview();
      if (result.success && result.data) {
        setRating(result.data.rating);
        setComment(result.data.comment);
        setReviewExists(true);
      } else {
        console.error(result.message);
      }
    };

    getReview();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    const result = await saveReview(rating, comment, reviewExists);
    if (result.success) {
      setReviewExists(true);
    } else {
      console.error(result.message);
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    const result = await deleteReview();
    if (result.success) {
      setRating(0);
      setComment('');
      setReviewExists(false);
    } else {
      console.error(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="">
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
          onClick={handleSave}
          disabled={loading}
        >
          {reviewExists ? 'Edit Review' : 'Submit Review'}
        </button>

        {reviewExists && (
          <button
            className="rounded-md bg-red-500 px-4 py-2 text-white disabled:bg-gray-400"
            onClick={handleDelete}
            disabled={loading}
          >
            Delete Review
          </button>
        )}
      </div>
    </div>
  );
};
