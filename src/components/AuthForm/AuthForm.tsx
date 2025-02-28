'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import LogInIcon from '@/public/icon/logIn.svg';
import CorrectIcon from '@/public/icon/inputCorrect.svg';
import ErrorIcon from '@/public/icon/inputError.svg';
import HideIcon from '@/public/icon/password-hide.svg';
import ShowIcon from '@/public/icon/password-show.svg';

import data from '@/data/common.json';
import { loginUser, registerUser } from '@/utils/auth';

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
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { logIn, signUp } = data;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  // const handleRegister = async (formData: FormData) => {
  //   try {
  //     await registerUser({
  //       name: formData.name ?? '',
  //       email: formData.email,
  //       password: formData.password,
  //     });
  //     toast.success('Registration successful! Please log in.');
  //     router.push('/en/login');
  //   } catch (error) {
  //     console.log('error', error);

  //     const errorMessage =
  //       (error as Error).message || 'Registration failed. Try again.';
  //     toast.error(errorMessage);
  //   }
  // };

  // const handleLogin = async (formData: FormData) => {
  //   try {
  //     await loginUser({
  //       email: formData.email,
  //       password: formData.password,
  //     });
  //     toast.success('Login successful! Redirecting...');
  //     router.push('/en/calendar');
  //   } catch (error) {
  //     console.log('error', error);

  //     const errorMessage =
  //       (error as Error).message || 'Login failed. Check your credentials.';
  //     toast.error(errorMessage);
  //   }
  // };

  const handleRegister = async (formData: FormData) => {
    setIsLoading(true);
    try {
      await registerUser({
        name: formData.name ?? '',
        email: formData.email,
        password: formData.password,
      });
      toast.success('Registration successful! Please log in.');
      router.push('/en/login');
    } catch (error) {
      console.log('error', error);

      const errorMessage =
        (error as Error).message || 'Registration failed. Try again.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (formData: FormData) => {
    setIsLoading(true);
    try {
      await loginUser({
        email: formData.email,
        password: formData.password,
      });
      toast.success('Login successful! Redirecting...');
      router.push('/en/calendar');
    } catch (error) {
      console.log('error', error);

      const errorMessage =
        (error as Error).message || 'Login failed. Check your credentials.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto w-[] rounded-[8px] bg-white px-[24px] py-[40px] md:w-[480px]">
      <h2 className="mb-[32px] text-[28px] font-600 leading-[1.33] text-blueMain md:mb-[40px]">
        {type === 'logIn' ? logIn : signUp}
      </h2>

      <form
        onSubmit={handleSubmit(
          type === 'signUp' ? handleRegister : handleLogin,
        )}
      >
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
          disabled={isLoading}
          className={`flex w-full justify-center gap-[11px] rounded-[16px] bg-blueMain py-[14px] text-[14px] font-600 leading-[1.28] tracking-[-0.28px] text-white transition-colors hover:bg-blueAccent focus:bg-blueAccent ${
            isLoading ? 'cursor-not-allowed' : ''
          }`}
        >
          {type === 'logIn' ? 'Log In' : 'Sign Up'}
          {isLoading ? (
            <div className="h-[18px] w-[18px] animate-spin rounded-full border-[2px] border-white border-t-transparent" />
          ) : (
            <LogInIcon className="h-[18px] w-[18px] stroke-white" />
          )}
        </button>
      </form>
    </div>
  );
};
