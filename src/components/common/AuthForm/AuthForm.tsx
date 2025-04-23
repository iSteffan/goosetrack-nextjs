'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';

import LogInIcon from '@/public/icon/logIn.svg';
import CorrectIcon from '@/public/icon/inputCorrect.svg';
import ErrorIcon from '@/public/icon/inputError.svg';
import HideIcon from '@/public/icon/password-hide.svg';
import ShowIcon from '@/public/icon/password-show.svg';

import { loginUser, registerUser } from '@/utils/getAuth';

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
  const t = useTranslations('AuthForm');

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const handleRegister = async (formData: FormData) => {
    setIsLoading(true);
    try {
      await registerUser({
        name: formData.name ?? '',
        email: formData.email,
        password: formData.password,
      });
      toast.success(t('registerSuccess'));
      router.push('/en/login');
    } catch (error) {
      console.log('error', error);

      const errorMessage = (error as Error).message || t('registerError');
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
      toast.success(t('loginSuccess'));
      router.push('/en/calendar');
    } catch (error) {
      console.log('error', error);

      const errorMessage = (error as Error).message || t('loginError');
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto w-[] rounded-[8px] bg-white px-[24px] py-[40px] md:w-[480px]">
      <h2 className="mb-[32px] text-[28px] font-600 leading-[1.33] text-blueMain md:mb-[40px]">
        {type === 'logIn' ? t('logIn') : t('signUp')}
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
              {t('nameLabel')}
            </label>
            <input
              id="name"
              {...register('name', { required: t('nameError') })}
              className={`inputStyles ${
                errors.name
                  ? 'border-error'
                  : watch('name') && !errors.name
                    ? 'border-greenCorrect'
                    : ''
              }`}
              placeholder={t('namePlaceholder')}
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
            {t('emailLabel')}
          </label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: t('emailError'),
              pattern: {
                value: /^\S+@\S+$/,
                message: t('emailPatternError'),
              },
            })}
            className={`inputStyles ${
              errors.email
                ? 'border-error'
                : watch('email') && !errors.email
                  ? 'border-greenCorrect'
                  : ''
            }`}
            placeholder={t('emailPlaceholder')}
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
            {t('passLabel')}
          </label>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...register('password', {
              required: t('passError'),
              minLength: { value: 6, message: t('passPatternError') },
            })}
            className={`inputStyles ${
              errors.password
                ? 'border-error'
                : watch('password') && !errors.password
                  ? 'border-greenCorrect'
                  : ''
            }`}
            placeholder={t('passPlaceholder')}
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
          className={`btnEffect flex w-full justify-center gap-[11px] rounded-[16px] bg-blueMain py-[14px] text-[14px] font-600 leading-[1.28] tracking-[-0.28px] text-white ${
            isLoading ? 'cursor-not-allowed' : ''
          }`}
        >
          {type === 'logIn' ? t('logInBtn') : t('signUpBtn')}
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
