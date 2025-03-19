// import { NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';
// import { cookies } from 'next/headers';

// import { dbConnect } from '@/utils/dbConnect';
// import User from '@/models/User';

// interface DecodedToken {
//   id: string;
//   name: string;
//   email: string;
//   iat: number;
//   exp: number;
// }

// export async function PATCH(req: Request) {
//   try {
//     await dbConnect();

//     const cookieStore = await cookies();
//     const token = cookieStore.get('token')?.value;

//     if (!token) {
//       return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
//     }

//     // Перевірка токена
//     let decoded;
//     try {
//       decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
//     } catch (error) {
//       console.error('JWT Verification Error:', error);
//       return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
//     }

//     const user = await User.findById(decoded.id);
//     if (!user) {
//       return NextResponse.json({ message: 'User not found' }, { status: 404 });
//     }

//     // Отримуємо оновлені дані (тільки передані поля)
//     const updates = await req.json();

//     Object.keys(updates).forEach(key => {
//       if (updates[key] !== undefined) {
//         user[key] = updates[key];
//       }
//     });

//     await user.save();

//     return NextResponse.json(
//       {
//         message: 'User updated successfully',
//         user: {
//           name: user.name,
//           email: user.email,
//           avatarURL: user.avatarURL,
//           birthday: user.birthday,
//           phone: user.phone,
//           telegram: user.telegram,
//         },
//       },
//       { status: 200 },
//     );
//   } catch (error) {
//     console.error('Error updating user:', error);
//     return NextResponse.json(
//       { message: 'Something went wrong' },
//       { status: 500 },
//     );
//   }
// }

import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { dbConnect } from '@/utils/dbConnect';
import User from '@/models/User';
import { v2 as cloudinary } from 'cloudinary';

interface DecodedToken {
  id: string;
  name: string;
  email: string;
  iat: number;
  exp: number;
}

// Налаштування Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function PATCH(req: Request) {
  try {
    await dbConnect();

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    } catch (error) {
      console.error('JWT Verification Error:', error);
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Отримання даних з форми
    const formData = await req.formData();
    const updates: Record<string, any> = {};

    const avatarFile = formData.get('avatar') as File | null;
    // if (avatarFile) {
    //   const arrayBuffer = await avatarFile.arrayBuffer();
    //   const buffer = Buffer.from(arrayBuffer);

    //   const uploadResult = await new Promise((resolve, reject) => {
    //     cloudinary.uploader
    //       .upload_stream(
    //         {
    //           folder: 'user_avatars',
    //           resource_type: 'image',
    //         },
    //         (error, result) => {
    //           if (error) reject(error);
    //           else resolve(result);
    //         },
    //       )
    //       .end(buffer);
    //   });

    //   updates.avatarURL = (uploadResult as any).secure_url;
    // }

    // // Отримуємо інші оновлені дані
    // ['name', 'email', 'birthday', 'phone', 'telegram'].forEach(key => {
    //   const value = formData.get(key);
    //   if (value) updates[key] = value;
    // });

    // Object.assign(user, updates);
    // await user.save();

    if (avatarFile) {
      const arrayBuffer = await avatarFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: 'user_avatars',
              resource_type: 'image',
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            },
          )
          .end(buffer);
      });

      updates.avatarURL = (uploadResult as any).secure_url;
    }

    ['name', 'email', 'birthday', 'phone', 'telegram'].forEach(key => {
      const value = formData.get(key);
      if (value) updates[key] = value;
    });

    Object.assign(user, updates);
    await user.save();

    return NextResponse.json(
      {
        message: 'User updated successfully',
        user: {
          name: user.name,
          email: user.email,
          avatarURL: user.avatarURL,
          birthday: user.birthday,
          phone: user.phone,
          telegram: user.telegram,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 },
    );
  }
}
