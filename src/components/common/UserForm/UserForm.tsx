'use client';

import {
  useIsFetching,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import PlusIcon from '@/public/icon/plus.svg';

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
    control,
    setValue,
    formState: {
      //   errors,
      // isDirty,
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

  // const isFormChanged = JSON.stringify(watch()) !== JSON.stringify(data?.user);

  // const watchedValues = useWatch({ control });
  const watchedValues = useWatch<IUser>({ control });

  // const isFormChanged = Object.keys(watchedValues).some(
  //   key => watchedValues[key as keyof IUser] !== data?.user[key as keyof IUser],
  // );

  const isFormChanged = (Object.keys(watchedValues) as (keyof IUser)[]).some(
    key => watchedValues[key] !== data?.user[key],
  );

  if (isFetching || !showComponents) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <div className="dark:bg-blackAccentBg relative rounded-[16px] bg-white px-[18px] pb-[40px] pt-[59px] md:px-[175px] md:pt-[40px] xl:px-[164px] xl:py-[60px]">
        <div className="dark:bg-blackAccentBg absolute left-1/2 top-[-32px] flex h-[72px] w-[72px] translate-x-[-50%] items-center justify-center rounded-[72px] border-[2px] border-blueMain bg-white text-[36px] font-700 leading-[1.28] text-blackCustom dark:text-white md:relative md:left-0 md:top-0 md:mx-auto md:mb-[20px] md:h-[124px] md:w-[124px] md:transform-none md:rounded-[124px] md:text-[48px]">
          {data?.user?.avatarURL ? (
            <Image
              src={data?.user?.avatarURL}
              alt="user avatar"
              width={72}
              height={72}
            />
          ) : (
            <p>{firstLetter}</p>
          )}

          <button
            type="button"
            className="btnEffect absolute bottom-[-6px] right-[13px] flex h-[14px] w-[14px] items-center justify-center rounded-[50%] bg-blueMain md:h-[24px] md:w-[24px]"
          >
            <PlusIcon className="h-[8px] w-[8px] md:h-[18px] md:w-[18px]" />
          </button>
        </div>

        <p className="mb-[4px] block text-center text-[14px] font-700 leading-[1.28] text-blackText dark:text-white md:mb-[8px] md:text-[18px] md:leading-[1]">
          {data?.user?.name}
        </p>
        <p className="mb-[40px] block text-center text-[12px] font-600 leading-[1.28] text-blackText dark:text-grayTheme md:text-[14px] xl:mb-[44px]">
          User
        </p>

        <div className="mb-[40px] flex flex-col gap-[18px] md:gap-[24px] xl:mb-[88px] xl:grid xl:grid-cols-2 xl:gap-x-[50px]">
          <div className="flex flex-col gap-[18px] md:gap-[24px]">
            <div>
              <label
                htmlFor="name"
                className="mb-[8px] block text-[12px] font-400 leading-[1.16] text-blackCustom dark:text-grayTheme md:text-[14px] md:leading-[1.28]"
              >
                User Name
              </label>
              <input id="name" {...register('name')} className="inputAccount" />
            </div>

            <div>
              <label
                htmlFor="birthday"
                className="mb-[8px] block text-[12px] font-400 leading-[1.16] text-blackCustom dark:text-grayTheme md:text-[14px] md:leading-[1.28]"
              >
                Birthday
              </label>
              <input
                type="date"
                id="birthday"
                {...register('birthday')}
                className="inputAccount"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-[8px] block text-[12px] font-400 leading-[1.16] text-blackCustom dark:text-grayTheme md:text-[14px] md:leading-[1.28]"
              >
                Email
              </label>
              <input
                id="email"
                {...register('email')}
                className="inputAccount"
              />
            </div>
          </div>

          <div className="flex flex-col gap-[18px] md:gap-[24px]">
            <div>
              <label
                htmlFor="phone"
                className="mb-[8px] block text-[12px] font-400 leading-[1.16] text-blackCustom dark:text-grayTheme md:text-[14px] md:leading-[1.28]"
              >
                Phone
              </label>
              <input
                id="phone"
                {...register('phone')}
                className="inputAccount"
                placeholder="38 (097) 256 34 77"
              />
            </div>

            <div>
              <label
                htmlFor="telegram"
                className="mb-[8px] block text-[12px] font-400 leading-[1.16] text-blackCustom dark:text-grayTheme md:text-[14px] md:leading-[1.28]"
              >
                Telegram
              </label>
              <input
                id="telegram"
                {...register('telegram')}
                className="inputAccount"
                placeholder="Add Telegram username"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className={`mx-auto block rounded-[16px] px-[50px] py-[14px] text-[14px] font-600 leading-[1.28] text-white md:px-[83px] md:py-[15px] ${
            isFormChanged
              ? 'btnEffect bg-blueMain'
              : 'cursor-not-allowed bg-gray-400'
          }`}
          disabled={!isFormChanged}
        >
          Save changes
        </button>
      </div>
    </form>
  );
};
