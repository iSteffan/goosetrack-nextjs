export interface ReviewData {
  rating: number;
  comment: string;
}

export const fetchReview = async (): Promise<{
  success: boolean;
  data?: ReviewData;
  message?: string;
}> => {
  try {
    const res = await fetch('/api/reviews/user', {
      credentials: 'include',
    });
    if (res.ok) {
      const data = await res.json();
      return { success: true, data };
    }
    return { success: false, message: 'Failed to fetch review' };
  } catch (error) {
    console.error('Failed to fetch review:', error);
    return { success: false, message: 'Failed to fetch review' };
  }
};

export const saveReview = async (
  rating: number,
  comment: string,
  reviewExists: boolean,
): Promise<{ success: boolean; message?: string }> => {
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
      return { success: true };
    } else {
      return { success: false, message: 'Error saving review' };
    }
  } catch (error) {
    console.error('Failed to save review:', error);
    return { success: false, message: 'Failed to save review' };
  }
};

export const deleteReview = async (): Promise<{
  success: boolean;
  message?: string;
}> => {
  try {
    const res = await fetch('/api/reviews/delete', {
      method: 'DELETE',
      credentials: 'include',
    });

    if (res.ok) {
      return { success: true };
    } else {
      return { success: false, message: 'Error deleting review' };
    }
  } catch (error) {
    console.error('Failed to delete review:', error);
    return { success: false, message: 'Failed to delete review' };
  }
};
