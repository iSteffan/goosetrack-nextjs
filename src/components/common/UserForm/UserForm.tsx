'use client';

import {
  useIsFetching,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { updateUser } from '@/utils/getAuth';

export interface IUser {
  name: string;
  email: string;
  avatarURL?: string;
  birthday: string;
  phone: string;
  telegram: string;
}

export const UserForm = () => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<{ user: IUser }>(['user']);
  const isFetching = useIsFetching({ queryKey: ['user'] });

  const [showComponents, setShowComponents] = useState(false);

  //   console.log('data account', data);
  //   console.log('showComponents', showComponents);

  const firstLetter = data?.user?.name.charAt(0).toUpperCase();

  const {
    register,
    handleSubmit,
    // watch,
    setValue,
    formState: {
      //   errors,
      isDirty,
    },
    // setError,
    // clearErrors,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      birthday: new Date().toISOString().split('T')[0],
      phone: '',
      telegram: '',
    },
  });

  // Заповнюємо форму отриманими даними // закоментований код підходить для аватара, а код нижче його не враховує оскільки аватар буде додано пізніше
  //   useEffect(() => {
  //     if (data?.user) {
  //       (Object.keys(data.user) as Array<keyof IUser>).forEach(key => {
  //         setValue(key, data.user[key] || '');
  //       });
  //     }
  //   }, [data, setValue]);

  useEffect(() => {
    if (data?.user) {
      (['name', 'email', 'birthday', 'phone', 'telegram'] as const).forEach(
        key => {
          setValue(key, data.user[key] || '');
        },
      );
    }
  }, [data, setValue]);

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const onSubmit = async (values: IUser) => {
    const updatedFields: Partial<IUser> = {};

    Object.keys(values).forEach(key => {
      if (values[key as keyof IUser] !== data?.user[key as keyof IUser]) {
        updatedFields[key as keyof IUser] = values[key as keyof IUser];
      }
    });

    if (Object.keys(updatedFields).length > 0) {
      await mutation.mutateAsync(updatedFields);
    }
  };

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

  if (isFetching || !showComponents) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
        <label>
          User Name
          <input {...register('name')} className="inputStyles" />
        </label>

        <label>
          Birthday
          <input
            type="date"
            {...register('birthday')}
            className="inputStyles"
          />
        </label>

        <label>
          Email
          <input {...register('email')} className="inputStyles" />
        </label>

        <label>
          Phone
          <input
            {...register('phone')}
            className="inputStyles"
            placeholder="38 (097) 256 34 77"
          />
        </label>

        <label>
          Telegram
          <input
            {...register('telegram')}
            className="inputStyles"
            placeholder="Add Telegram username"
          />
        </label>

        <button
          type="submit"
          //   className={`btn ${isDirty ? 'active' : 'disabled'}`}
          disabled={!isDirty}
        >
          Save changes
        </button>
      </div>
    </form>
  );
};
