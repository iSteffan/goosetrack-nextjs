'use client';

import { useEffect, useState } from 'react';
import ReactStars from 'react-stars';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';

import { saveReview, deleteReview } from '@/utils/getReviews';
import { FeedbackFormSkeleton } from '@/components/ui/FeedbackFormSkeleton/FeedbackFormSkeleton';

import EditIcon from '@/public/icon/pencil.svg';
import DeleteIcon from '@/public/icon/feedbackDelete.svg';

interface IFeedbackForm {
  onClose: () => void;
  review:
    | Awaited<ReturnType<typeof import('@/utils/getReviews').fetchReview>>
    | undefined;
  isReviewLoading: boolean;
}

export const FeedbackForm = ({
  onClose,
  review,
  isReviewLoading,
}: IFeedbackForm) => {
  const queryClient = useQueryClient();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [showComponents, setShowComponents] = useState(false);

  const t = useTranslations('FeedbackForm');

  useEffect(() => {
    if (!isReviewLoading) {
      const timer = setTimeout(() => {
        setShowComponents(true);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isReviewLoading]);

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
      toast.success(t('reviewSaved'));
    },
    onError: () => {
      toast.error(t('reviewNotSaved'));
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      setRating(0);
      setComment('');
      queryClient.invalidateQueries({ queryKey: ['review'] });
      toast.success(t('reviewDeleted'));
    },
    onError: () => {
      toast.error(t('reviewNotDeleted'));
    },
  });

  const handleSave = () => {
    if (rating === 0) {
      toast.error(t('noRating'));
      return;
    }

    if (comment.trim() === '') {
      toast.error(t('noText'));
      return;
    }

    saveMutation.mutate();
  };

  const handleEdit = () => {
    setIsEditOpen(!isEditOpen);
  };

  const isUnchanged =
    review?.data &&
    rating === review.data.rating &&
    comment.trim() === review.data.comment.trim();

  if (isReviewLoading || !showComponents) {
    return <FeedbackFormSkeleton />;
  }

  return (
    <div className="w-[295px] md:w-[404px]">
      <div className="mb-[20px] md:mb-[24px]">
        <p className="text-[12px] leading-[1.16] text-blackText dark:text-grayTheme">
          {t('rating')}
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
            {t('review')}
          </p>

          {review?.data && (
            <div className="flex gap-[8px]">
              <button
                type="button"
                onClick={handleEdit}
                className="group flex h-[30px] w-[30px] items-center justify-center rounded-[50%] bg-bluePale transition-colors hover:bg-blueMain dark:bg-[#353647] dark:hover:bg-blueMain"
              >
                <EditIcon className="h-[16px] w-[16px] stroke-blueMain transition-colors group-hover:stroke-white" />
              </button>
              <button
                type="button"
                onClick={() => deleteMutation.mutate()}
                disabled={deleteMutation.isPending}
                className="group flex h-[30px] w-[30px] items-center justify-center rounded-[50%] bg-[#ea3d6533] transition-colors hover:bg-blueMain"
              >
                <DeleteIcon className="h-[16px] w-[16px] stroke-radioHigh transition-colors group-hover:stroke-white" />
              </button>
            </div>
          )}
        </div>

        <textarea
          className="min-h-[130px] w-full resize-none rounded-[8px] border bg-grayBg px-[14px] py-[12px] text-[14px] leading-[1.28] dark:bg-blackLightBg dark:text-white"
          placeholder={t('noReview')}
          value={comment}
          onChange={e => setComment(e.target.value)}
        ></textarea>
      </div>

      {(!review?.data || isEditOpen) && (
        <div className="mt-[14px] flex justify-between gap-[8px]">
          <button
            className={`w-full rounded-[8px] py-[12px] text-[14px] font-600 text-white ${
              saveMutation.isPending || isUnchanged
                ? 'cursor-not-allowed bg-gray-400'
                : 'btnEffect bg-blueMain'
            } `}
            onClick={handleSave}
            disabled={saveMutation.isPending || isUnchanged}
          >
            {saveMutation.isPending ? (
              <div className="mx-auto h-[16px] w-[16px] animate-spin rounded-full border-[2px] border-white border-t-transparent" />
            ) : review?.data ? (
              t('edit')
            ) : (
              t('save')
            )}
          </button>
          <button
            className="w-full rounded-[8px] bg-[#E5EDFA] py-[12px] text-[14px] font-600 text-blackText transition-colors hover:bg-gray-300 dark:bg-[#21222C] dark:text-white"
            onClick={onClose}
          >
            {t('cancel')}
          </button>
        </div>
      )}
    </div>
  );
};
