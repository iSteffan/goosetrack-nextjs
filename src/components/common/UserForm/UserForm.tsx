'use client';

import {
  useIsFetching,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export interface IUser {
  name: string;
  email: string;
  avatarURL: string;
  birthday: string;
  phone: string;
  telegram: string;
}

export const UserForm = () => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(['user']);
  const isFetching = useIsFetching({ queryKey: ['user'] });

  const [showComponents, setShowComponents] = useState(false);

  console.log('data account', data);

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

  const firstLetter = data?.user?.name.charAt(0).toUpperCase();

  return (
    <div className="relative rounded-[16px] bg-white px-[18px] pb-[40px] pt-[59px]">
      {data?.user?.avatarURL ? (
        <Image
          src={data?.user?.avatarURL}
          alt="user avatar"
          width={72}
          height={72}
        />
      ) : (
        <div className="absolute left-1/2 top-[-32px] flex h-[72px] w-[72px] translate-x-[-50%] items-center justify-center rounded-[72px] border-[1.8px] border-blueMain bg-white text-[36px] font-700 leading-[1.28] text-blackCustom dark:text-white md:h-[124px] md:w-[124px] md:rounded-[124px] md:text-[48px]">
          {firstLetter}
        </div>
      )}
      <p className="mb-[4px] block text-center text-[14px] font-700 leading-[1.28] text-blackText">
        {data?.user?.name}
      </p>
      <p className="mb-[40px] block text-center text-[12px] font-600 leading-[1.28] text-blackText">
        User
      </p>
      UserForm
    </div>
  );
};
