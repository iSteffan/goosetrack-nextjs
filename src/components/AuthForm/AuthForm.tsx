'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import LogInIcon from '@/public/icon/logIn.svg';
import CorrectIcon from '@/public/icon/inputCorrect.svg';
import ErrorIcon from '@/public/icon/inputError.svg';
import HideIcon from '@/public/icon/password-hide.svg';
import ShowIcon from '@/public/icon/password-show.svg';

import data from '@/data/common.json';

type FormType = 'signUp' | 'logIn';

interface AuthFormProps {
  type: FormType;
}

type FormData = {
  name?: string;
  email: string;
  password: string;
};

export const AuthForm = ({ type }: AuthFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const { logIn, signUp } = data;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(type === 'logIn' ? 'Logging in:' : 'Signing up:', data);
  };

  return (
    <div className="mx-auto w-[] rounded-[8px] bg-white px-[24px] py-[40px] md:w-[480px]">
      <h2 className="mb-[32px] text-[28px] font-600 leading-[1.33] text-blueMain md:mb-[40px]">
        {type === 'logIn' ? logIn : signUp}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        {type === 'signUp' && (
          <div className="relative mb-[24px] flex flex-col">
            <label
              htmlFor="name"
              className={`authFormLabel ${
                errors.name
                  ? 'text-error'
                  : watch('name') && !errors.name
                    ? 'text-greenCorrect'
                    : ''
              }`}
            >
              Name
            </label>
            <input
              id="name"
              {...register('name', { required: 'Name is required' })}
              className={`inputStyles ${
                errors.name
                  ? 'border-error'
                  : watch('name') && !errors.name
                    ? 'border-greenCorrect'
                    : ''
              }`}
              placeholder="Enter your name"
            />
            {errors.name ? (
              <ErrorIcon className="formIcon" />
            ) : watch('name') && !errors.name ? (
              <CorrectIcon className="formIcon" />
            ) : (
              ''
            )}

            {errors.name && <p className="inputError">{errors.name.message}</p>}
          </div>
        )}

        {/* Email */}
        <div className="relative mb-[24px] flex flex-col">
          <label
            htmlFor="email"
            className={`authFormLabel ${
              errors.email
                ? 'text-error'
                : watch('email') && !errors.email
                  ? 'text-greenCorrect'
                  : ''
            }`}
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+$/, message: 'Invalid email' },
            })}
            className={`inputStyles ${
              errors.email
                ? 'border-error'
                : watch('email') && !errors.email
                  ? 'border-greenCorrect'
                  : ''
            }`}
            placeholder="Enter email"
          />
          {errors.email ? (
            <ErrorIcon className="formIcon" />
          ) : watch('email') && !errors.email ? (
            <CorrectIcon className="formIcon" />
          ) : (
            ''
          )}

          {errors.email && <p className="inputError">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="relative mb-[32px] flex flex-col md:mb-[48px]">
          <label
            htmlFor="password"
            className={`authFormLabel ${
              errors.password
                ? 'text-error'
                : watch('password') && !errors.password
                  ? 'text-greenCorrect'
                  : ''
            }`}
          >
            Password
          </label>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Min 6 characters' },
            })}
            className={`inputStyles ${
              errors.password
                ? 'border-error'
                : watch('password') && !errors.password
                  ? 'border-greenCorrect'
                  : ''
            }`}
            placeholder="Enter password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute bottom-[11px] right-[18px] text-[12px] text-blueMain md:bottom-[14px]"
          >
            {!showPassword ? (
              <HideIcon className="h-[24px] w-[24px]" />
            ) : (
              <ShowIcon className="h-[24px] w-[24px]" />
            )}
          </button>
          {errors.password && (
            <p className="inputError">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="flex w-full justify-center gap-[11px] rounded-[16px] bg-blueMain py-[14px] text-[14px] font-600 leading-[1.28] tracking-[-0.28px] text-white transition-colors hover:bg-blueAccent focus:bg-blueAccent"
        >
          {type === 'logIn' ? 'Log In' : 'Sign Up'}
          <LogInIcon className="h-[18px] w-[18px]" />
        </button>
      </form>
    </div>
  );
};
