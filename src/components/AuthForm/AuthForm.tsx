'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

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
          <div className="relative mb-[24px] flex flex-col md:mb-[18px]">
            <label htmlFor="name" className="authFormLabel">
              Name
            </label>
            <input
              id="name"
              {...register('name', { required: 'Name is required' })}
              className="inputStyles"
              placeholder="Enter your name"
            />
            {errors.name && <p className="inputError">{errors.name.message}</p>}
          </div>
        )}

        {/* Email */}
        <div className="relative mb-[24px] flex flex-col md:mb-[18px]">
          <label htmlFor="email" className="authFormLabel">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+$/, message: 'Invalid email' },
            })}
            className="inputStyles"
            placeholder="Enter email"
          />
          {errors.email && <p className="inputError">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="relative mb-[32px] flex flex-col md:mb-[48px]">
          <label htmlFor="password" className="authFormLabel">
            Password
          </label>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Min 6 characters' },
            })}
            className="inputStyles"
            placeholder="Enter password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-9 text-sm text-blue-500 hover:underline"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
          {errors.password && (
            <p className="inputError">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded-[16px] bg-blueMain py-[14px] text-[14px] font-600 leading-[1.28] tracking-[-0.28px] text-white transition-colors hover:bg-blueAccent focus:bg-blueAccent"
        >
          {type === 'logIn' ? 'Log In' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};
