import axios from 'axios';

import { IReview } from '@/sections/MainPageSection/ReviewsSection/ReviewsSection';

export interface ReviewData {
  rating: number;
  comment: string;
}

const api = axios.create({
  baseURL: '/api/reviews',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// -------------------------------------------------------------All comments are left for educational purposes----------------------------------------------------------

export const getAllReviews = async (): Promise<IReview[]> => {
  const { data } = await axios.get('/api/reviews/all');
  return data;
};

// export const fetchReview = async (): Promise<{
//   success: boolean;
//   data?: ReviewData;
//   message?: string;
// }> => {
//   try {
//     const res = await fetch('/api/reviews/userReview', {
//       credentials: 'include',
//     });
//     if (res.ok) {
//       const data = await res.json();
//       return { success: true, data };
//     }
//     return { success: false, message: 'Failed to fetch review' };
//   } catch (error) {
//     console.error('Failed to fetch review:', error);
//     return { success: false, message: 'Failed to fetch review' };
//   }
// };

export const fetchReview = async (): Promise<{
  success: boolean;
  data?: ReviewData;
  message?: string;
}> => {
  try {
    const { data } = await api.get('/userReview');
    return { success: true, data };
  } catch (error) {
    console.error('Failed to fetch review:', error);
    return { success: false, message: 'Failed to fetch review' };
  }
};

// export const saveReview = async (
//   rating: number,
//   comment: string,
//   reviewExists: boolean,
// ): Promise<{ success: boolean; message?: string }> => {
//   const method = reviewExists ? 'PATCH' : 'POST';
//   const url = reviewExists ? '/api/reviews/update' : '/api/reviews/create';

//   try {
//     const res = await fetch(url, {
//       method,
//       headers: { 'Content-Type': 'application/json' },
//       credentials: 'include',
//       body: JSON.stringify({ rating, comment }),
//     });

//     if (res.ok) {
//       return { success: true };
//     } else {
//       return { success: false, message: 'Error saving review' };
//     }
//   } catch (error) {
//     console.error('Failed to save review:', error);
//     return { success: false, message: 'Failed to save review' };
//   }
// };

export const saveReview = async (
  rating: number,
  comment: string,
  reviewExists: boolean,
): Promise<{ success: boolean; message?: string }> => {
  const endpoint = reviewExists ? '/update' : '/create';
  const method = reviewExists ? 'patch' : 'post';

  try {
    await api[method](endpoint, { rating, comment });
    return { success: true };
  } catch (error) {
    console.error('Failed to save review:', error);
    return { success: false, message: 'Error saving review' };
  }
};

// export const deleteReview = async (): Promise<{
//   success: boolean;
//   message?: string;
// }> => {
//   try {
//     const res = await fetch('/api/reviews/delete', {
//       method: 'DELETE',
//       credentials: 'include',
//     });

//     if (res.ok) {
//       return { success: true };
//     } else {
//       return { success: false, message: 'Error deleting review' };
//     }
//   } catch (error) {
//     console.error('Failed to delete review:', error);
//     return { success: false, message: 'Failed to delete review' };
//   }
// };

export const deleteReview = async (): Promise<{
  success: boolean;
  message?: string;
}> => {
  try {
    await api.delete('/delete');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete review:', error);
    return { success: false, message: 'Error deleting review' };
  }
};
