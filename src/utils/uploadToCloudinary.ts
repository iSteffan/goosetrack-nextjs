import axios from 'axios';

export const uploadToCloudinary = async (
  file: File,
): Promise<string | null> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append(
    'upload_preset',
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!,
  );

  try {
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    );

    return data.secure_url || null;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};
