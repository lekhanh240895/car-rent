'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Trans, useTranslation } from 'react-i18next';
import { useState } from 'react';
import {
  EyeIcon,
  EyeSlashIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import Button from './Button';
import FormItem from './FormItem';
import { toast } from 'react-toastify';
import { useRouter, useSearchParams } from 'next/navigation';
import { setCookie } from 'cookies-next';
import { useConfirmRedirectIfDirty } from '@/app/hooks/useConfirmRedirectIfDirty';
import { REGISTER_PAGE } from '../lib/constants';
import { loginSchema } from '../lib/schema';
import { useAppDispatch } from '../hooks/hooks';
import { logout } from '../redux/features/userSlice';
import ApiManager from '../lib/ApiManager/ApiManager';
import { FetchSuccess } from '../lib/ApiManager/ApiMethods';

export type LoginFormData = {
  email: string;
  password: string;
};

function LoginForm() {
  const { t, i18n } = useTranslation();
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const locale = i18n.language;
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const dispatch = useAppDispatch();

  const {
    register,
    reset,
    handleSubmit,
    setError: setHookFormError,
    formState: { isSubmitting, errors, isDirty }
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema(t))
  });

  const handleShow = () => {
    setShow(!show);
  };

  useConfirmRedirectIfDirty(isDirty);

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      setError('');

      const res: FetchSuccess<{
        access_token: string;
        refresh_token: string;
      }> = await ApiManager.login(locale, data);

      reset({
        email: '',
        password: ''
      });

      const {
        data: { access_token, refresh_token }
      } = res.body;
      setCookie('access_token', access_token);
      setCookie('refresh_token', refresh_token);

      try {
        const userRes = await ApiManager.getMe(locale);
        const { data: user } = userRes.body;
        setCookie('currentUser', JSON.stringify(user));

        toast.success(t('login:login_success'), {
          className: 'bg-green-500',
          autoClose: 1000
        });
        router.push(callbackUrl ? callbackUrl : '/');
        router.refresh();
      } catch (error) {
        toast.error(t('error_messages.unknown_error'));
        dispatch(logout());
      }
    } catch (e: any) {
      const error: CustomError = e.body?.error;
      if (error) {
        const { message, error_id } = error;
        const errorMessage = `${message} (${error_id})`;

        if (error.errors && error.errors.length > 0) {
          const fieldErrors = error.errors;

          const fieldNames: {
            [key: string]: any;
          } = {
            email: t('email_field'),
            password: t('password_field')
          };

          fieldErrors.forEach((e) => {
            const { field, message, error_id } = e;
            const fieldName = fieldNames[field] || field;
            const errorMessage = `[${fieldName}] ${message} (${error_id})`;

            return setHookFormError(field as any, {
              type: 'manual',
              message: errorMessage
            });
          });

          toast.error(errorMessage);
        } else {
          setError(errorMessage);
        }
      } else {
        toast.error(t('error_messages.unknown_error'));
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col flex-wrap gap-6 p-4">
          {error && (
            <div className="flex flex-wrap items-center justify-center gap-4 self-center bg-[#f92d6a0d] px-4 py-2 text-red-500">
              <XCircleIcon className="h-12 w-12 flex-shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          <FormItem
            label={t('email_field').toUpperCase()}
            inputProps={{
              register,
              name: 'email',
              placeholder: t('email_field_placeholder')
            }}
            name="email"
            error={errors.email}
          />

          <FormItem
            label={t('password_field').toUpperCase()}
            inputProps={{
              register,
              name: 'password',
              placeholder: t('password_field_placeholder'),
              type: show ? 'text' : 'password',
              iconRight: !show ? (
                <EyeSlashIcon className="h-6 w-6" onClick={handleShow} />
              ) : (
                <EyeIcon className="h-6 w-6" onClick={handleShow} />
              )
            }}
            name="password"
            error={errors.password}
          />

          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              loading={isSubmitting}
              variant="primary"
            >
              {t('login:login_title')}
            </Button>
          </div>
        </div>
      </form>

      <p className="mt-4 text-center font-semibold">
        <Trans i18nKey="login:sign_up_link">
          Don&apos;t have an account?{' '}
          <Button
            to={REGISTER_PAGE}
            variant="text"
            className="ml-1 inline-flex p-0 text-primary"
          >
            Sign up here
          </Button>
        </Trans>
      </p>
    </>
  );
}

export default LoginForm;
