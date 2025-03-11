'use client';

import { useEffect, useState } from 'react';
import ReactStars from 'react-stars';

export const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [reviewExists, setReviewExists] = useState(false);

  // Отримуємо відгук при завантаженні сторінки
  useEffect(() => {
    const fetchReview = async () => {
      try {
        const res = await fetch('/api/reviews/user', {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setRating(data.rating);
          setComment(data.comment);
          setReviewExists(true);
        }
      } catch (error) {
        console.error('Failed to fetch review:', error);
      }
    };

    fetchReview();
  }, []);

  // Функція для створення або оновлення відгуку
  const handleSave = async () => {
    setLoading(true);
    const method = reviewExists ? 'PATCH' : 'POST';
    const url = reviewExists ? '/api/reviews/update' : '/api/reviews/create';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ rating, comment }),
      });

      if (res.ok) {
        setReviewExists(true);
      } else {
        console.error('Error saving review');
      }
    } catch (error) {
      console.error('Failed to save review:', error);
    } finally {
      setLoading(false);
    }
  };

  // Функція для видалення відгуку
  const handleDelete = async () => {
    setLoading(true);

    try {
      const res = await fetch('/api/reviews/delete', {
        method: 'DELETE',
        credentials: 'include',
      });

      if (res.ok) {
        setRating(0);
        setComment('');
        setReviewExists(false);
      } else {
        console.error('Error deleting review');
      }
    } catch (error) {
      console.error('Failed to delete review:', error);
    } finally {
      setLoading(false);
    }
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
