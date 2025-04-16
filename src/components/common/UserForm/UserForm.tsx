'use client';

import {
  useIsFetching,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useForm, useWatch, Controller } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';

import { uploadToCloudinary } from '@/utils/uploadToCloudinary';
import PlusIcon from '@/public/icon/plus.svg';
import { updateUser } from '@/utils/getAuth';
import { UserFormSkeleton } from '@/components/ui/UserFormSkeleton/UserFormSkeleton';
import { IUser } from '@/store/userStore';

export const UserForm = () => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<{ user: IUser }>(['user']);
  const isFetching = useIsFetching({ queryKey: ['user'] });

  const [showComponents, setShowComponents] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const firstLetter = data?.user?.name.charAt(0).toUpperCase();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<IUser>({
    defaultValues: {
      name: '',
      email: '',
      birthday: new Date().toISOString().split('T')[0],
      phone: '',
      telegram: '',
      avatarURL: '',
    },
  });

  useEffect(() => {
    if (data?.user) {
      (
        ['name', 'email', 'birthday', 'phone', 'telegram', 'avatarURL'] as const
      ).forEach(key => {
        setValue(key, data.user[key] || '');
      });
    }
  }, [data, setValue]);

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

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

  const watchedValues = useWatch<IUser>({ control });

  const isFormChanged =
    (Object.keys(watchedValues) as (keyof IUser)[]).some(
      key => watchedValues[key] !== data?.user[key],
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
      if (values[key] !== data?.user[key]) {
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
      await mutation.mutateAsync(updatedFields);
      setAvatarFile(null);
    }
  };

  if (isFetching || !showComponents) {
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
          ) : data?.user?.avatarURL ? (
            <Image
              src={data?.user?.avatarURL}
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
          {data?.user?.name}
        </p>
        <p className="mb-[40px] block text-center text-[12px] font-600 leading-[1.28] text-blackText dark:text-grayTheme md:text-[14px] xl:mb-[44px]">
          User
        </p>

        <div className="mb-[40px] flex flex-col gap-[18px] md:gap-[24px] xl:mb-[88px] xl:grid xl:grid-cols-2 xl:gap-x-[50px]">
          <div className="flex flex-col gap-[18px] md:gap-[24px]">
            <div className="relative">
              <label
                htmlFor="name"
                className="mb-[8px] block text-[12px] font-400 leading-[1.16] text-blackCustom dark:text-grayTheme md:text-[14px] md:leading-[1.28]"
              >
                User Name
              </label>
              {/* <input id="name" {...register('name')} className="inputAccount" /> */}
              <input
                id="name"
                {...register('name', {
                  required: 'Name is required',
                  maxLength: {
                    value: 16,
                    message: 'Name cannot be longer than 16 characters',
                  },
                })}
                className="inputAccount"
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
