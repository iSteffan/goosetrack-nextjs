'use client';

import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useForm, useWatch, Controller } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';
import { useTranslations } from 'next-intl';

import { uploadToCloudinary } from '@/utils/uploadToCloudinary';
import { updateUser } from '@/utils/getAuth';
import { UserFormSkeleton } from '@/components/ui/UserFormSkeleton/UserFormSkeleton';
import { IUser, useUserStore } from '@/store/userStore';

import PlusIcon from '@/public/icon/plus.svg';

export const UserForm = () => {
  const t = useTranslations('UserForm');

  // i can't do like this due to infinite loop
  // const { user, setUser, isUserLoading, setIsUserLoading } = useUserStore(
  //   state => ({
  //     user: state.user,
  //     setUser: state.setUser,
  //     isUserLoading: state.isUserLoading,
  //     setIsUserLoading: state.setIsUserLoading,
  //   }),
  // );

  const user = useUserStore(state => state.user);
  const setUser = useUserStore(state => state.setUser);
  const isUserLoading = useUserStore(state => state.isUserLoading);
  const setIsUserLoading = useUserStore(state => state.setIsUserLoading);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const firstLetter = user?.name?.charAt(0).toUpperCase();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IUser>();

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || '',
        email: user.email || '',
        birthday: user.birthday || new Date().toISOString().split('T')[0],
        phone: user.phone || '',
        telegram: user.telegram || '',
        avatarURL: user.avatarURL || '',
      });
    }
  }, [user, reset]);

  const mutation = useMutation({
    mutationFn: updateUser,
    onMutate: () => setIsUserLoading(true),
    onSuccess: updatedUser => {
      setUser(updatedUser.user);
    },
    onSettled: () => {
      setIsUserLoading(false);
    },
  });

  const watchedValues = useWatch<IUser>({ control });

  const isFormChanged =
    (Object.keys(watchedValues) as (keyof IUser)[]).some(
      key => watchedValues[key] !== user?.[key],
    ) || avatarFile !== null;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFile(file);
    }
  };

  const onSubmit = async (values: IUser) => {
    const updatedFields: Partial<IUser> = {};

    (Object.keys(values) as (keyof IUser)[]).forEach(key => {
      if (values[key] !== user?.[key]) {
        updatedFields[key] = values[key];
      }
    });

    if (avatarFile) {
      const avatarURL = await uploadToCloudinary(avatarFile);
      if (avatarURL) {
        updatedFields.avatarURL = avatarURL;
      }
    }

    if (Object.keys(updatedFields).length > 0) {
      const updated = await mutation.mutateAsync(updatedFields);
      setAvatarFile(null);

      // Якщо бек нічого не повертає — оновлюємо локально:
      if (user && !updated) {
        setUser({
          ...user,
          ...updatedFields,
        });
      }
    }
  };

  if (isUserLoading || !user) {
    return <UserFormSkeleton />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <div className="relative rounded-[16px] bg-white px-[18px] pb-[40px] pt-[59px] dark:bg-blackAccentBg md:px-[175px] md:pt-[40px] xl:px-[164px] xl:py-[60px]">
        <div className="absolute left-1/2 top-[-32px] flex h-[72px] w-[72px] translate-x-[-50%] items-center justify-center rounded-[72px] border-[2px] border-blueMain bg-white text-[36px] font-700 leading-[1.28] text-blackCustom dark:bg-blackAccentBg dark:text-white md:relative md:left-0 md:top-0 md:mx-auto md:mb-[20px] md:h-[124px] md:w-[124px] md:transform-none md:rounded-[124px] md:text-[48px]">
          {avatarFile ? (
            <Image
              src={URL.createObjectURL(avatarFile)}
              alt="user avatar"
              width={72}
              height={72}
              className="h-full w-full rounded-full object-cover"
            />
          ) : user?.avatarURL ? (
            <Image
              src={user?.avatarURL}
              alt="user avatar"
              width={72}
              height={72}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <p>{firstLetter}</p>
          )}

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="btnEffect absolute bottom-[-6px] right-[13px] flex h-[14px] w-[14px] items-center justify-center rounded-[50%] bg-blueMain md:h-[24px] md:w-[24px]"
          >
            <PlusIcon className="h-[8px] w-[8px] stroke-white md:h-[18px] md:w-[18px]" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
        </div>

        <p className="mb-[4px] block text-center text-[14px] font-700 leading-[1.28] text-blackText dark:text-white md:mb-[8px] md:text-[18px] md:leading-[1]">
          {user?.name}
        </p>
        <p className="mb-[40px] block text-center text-[12px] font-600 leading-[1.28] text-blackText dark:text-grayTheme md:text-[14px] xl:mb-[44px]">
          {t('user')}
        </p>

        <div className="mb-[40px] flex flex-col gap-[18px] md:gap-[24px] xl:mb-[88px] xl:grid xl:grid-cols-2 xl:gap-x-[50px]">
          <div className="flex flex-col gap-[18px] md:gap-[24px]">
            <div className="relative">
              <label
                htmlFor="name"
                className="mb-[8px] block text-[12px] font-400 leading-[1.16] text-blackCustom dark:text-grayTheme md:text-[14px] md:leading-[1.28]"
              >
                {t('userName')}
              </label>
              <input
                id="name"
                {...register('name', {
                  required: t('userNameError'),
                  maxLength: {
                    value: 16,
                    message: t('userNamePatternError'),
                  },
                })}
                className="inputAccount"
                placeholder={t('userNamePlaceholder')}
              />
              {errors.name && (
                <p className="inputError">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="birthday"
                className="mb-[8px] block text-[12px] font-400 leading-[1.16] text-blackCustom dark:text-grayTheme md:text-[14px] md:leading-[1.28]"
              >
                {t('birthday')}
              </label>
              <input
                type="date"
                id="birthday"
                {...register('birthday')}
                className="inputAccount"
                placeholder={t('birthdayPlaceholder')}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-[8px] block text-[12px] font-400 leading-[1.16] text-blackCustom dark:text-grayTheme md:text-[14px] md:leading-[1.28]"
              >
                {t('email')}
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                readOnly
                className="inputAccount bg-grayBg"
              />
            </div>
          </div>

          <div className="flex flex-col gap-[18px] md:gap-[24px]">
            <div>
              <label
                htmlFor="phone"
                className="mb-[8px] block text-[12px] font-400 leading-[1.16] text-blackCustom dark:text-grayTheme md:text-[14px] md:leading-[1.28]"
              >
                {t('phone')}
              </label>

              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <PatternFormat
                    {...field}
                    format="+38 (###) ### ## ##"
                    mask="_"
                    className="inputAccount"
                    placeholder="+38 (XXX) XXX XX XX"
                    value={field.value || ''}
                    allowEmptyFormatting
                    onValueChange={values => {
                      setValue('phone', values.value);
                    }}
                    disabled={false}
                  />
                )}
              />
            </div>

            <div>
              <label
                htmlFor="telegram"
                className="mb-[8px] block text-[12px] font-400 leading-[1.16] text-blackCustom dark:text-grayTheme md:text-[14px] md:leading-[1.28]"
              >
                {t('telegram')}
              </label>
              <input
                id="telegram"
                {...register('telegram')}
                className="inputAccount"
                placeholder={t('telegramPlaceholder')}
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
          {t('save')}
        </button>
      </div>
    </form>
  );
};
