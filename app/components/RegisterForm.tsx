'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Trans, useTranslation } from 'react-i18next';
import { useState } from 'react';
import {
  EyeIcon,
  EyeSlashIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import Button from './Button';
import { toast } from 'react-toastify';
import Label from './Label';
import Input from './Input';
import FormItem from './FormItem';
import { useRouter } from 'next/navigation';
import { useConfirmRedirectIfDirty } from '@/app/hooks/useConfirmRedirectIfDirty';
import { EMAIL_VERIFY_PAGE, LOGIN_PAGE } from '../lib/constants';
import { registerSchema } from '../lib/schema';
import ApiManager from '../lib/ApiManager/ApiManager';
import { FetchSuccess } from '../lib/ApiManager/ApiMethods';

export type RegisterFormData = {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
  terms_and_policy_checked: boolean;
};

function RegisterForm() {
  const { t, i18n } = useTranslation();
  const [show, setShow] = useState<{
    [key: string]: any;
  }>({
    password: false,
    confirm_password: false
  });
  const [error, setError] = useState('');
  const router = useRouter();
  const locale = i18n.language;

  const {
    register,
    handleSubmit,
    reset,
    setError: setHookFormError,
    formState: { isSubmitting, errors, isDirty }
  } = useForm<RegisterFormData>({
    defaultValues: {
      full_name: '',
      email: '',
      password: '',
      confirm_password: '',
      terms_and_policy_checked: false
    },
    resolver: yupResolver(registerSchema(t))
  });

  const handleShow = (fieldName: string) => {
    setShow({
      ...show,
      [fieldName]: !show[fieldName]
    });
  };

  useConfirmRedirectIfDirty(isDirty);

  const onSubmit = async (data: RegisterFormData) => {
    if (!data.terms_and_policy_checked) return;

    try {
      setError('');
      const res: FetchSuccess<User> = await ApiManager.register(locale, data);

      const { data: user } = res.body;

      reset();

      toast.success(t('register:register_success'), {
        className: 'bg-green-500',
        autoClose: 1000
      });
      router.push(`${EMAIL_VERIFY_PAGE}?email=${user.email}`);
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
            full_name: t('name_field'),
            email: t('email_field'),
            password: t('password_field'),
            confirm_password: t('confirm_password_field')
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
            label={t('name_field').toUpperCase()}
            inputProps={{
              register,
              name: 'full_name',
              placeholder: t('name_field_placeholder')
            }}
            name="full_name"
            error={errors.full_name}
          />

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
              type: show.password ? 'text' : 'password',
              iconRight: !show.password ? (
                <EyeSlashIcon
                  className="h-6 w-6"
                  onClick={() => handleShow('password')}
                />
              ) : (
                <EyeIcon
                  className="h-6 w-6"
                  onClick={() => handleShow('password')}
                />
              )
            }}
            name="password"
            error={errors.password}
          />

          <FormItem
            label={t('confirm_password_field').toUpperCase()}
            inputProps={{
              register,
              name: 'confirm_password',
              placeholder: t('confirm_password_field_placeholder'),
              type: show.confirm_password ? 'text' : 'password',
              iconRight: !show.confirm_password ? (
                <EyeSlashIcon
                  className="h-6 w-6"
                  onClick={() => handleShow('confirm_password')}
                />
              ) : (
                <EyeIcon
                  className="h-6 w-6"
                  onClick={() => handleShow('confirm_password')}
                />
              )
            }}
            name="confirm_password"
            error={errors.confirm_password}
          />

          <FormItem error={errors.terms_and_policy_checked}>
            <div className="flex items-center gap-3">
              <div>
                <Input
                  type="checkbox"
                  name="terms_and_policy_checked"
                  register={register}
                  className="form-checkbox h-4 w-4 border-gray-300 bg-gray-100 p-1 text-blue-600 focus:ring-blue-500"
                  rounded="md"
                />
              </div>
              <Label
                htmlFor="terms_and_policy_checked"
                className="order-2 mb-0 text-base text-gray-900 dark:text-white"
              >
                <Trans i18nKey="register:read_and_accept">
                  I have read and accept to{' '}
                  <Button
                    to="/terms-of-service"
                    className="inline-flex h-[unset] p-0 text-primary"
                    target="_blank"
                    variant="text"
                  >
                    Terms of Service
                  </Button>
                  and{' '}
                  <Button
                    to="/privacy-policy"
                    className="inline-flex h-[unset] p-0 text-primary"
                    target="_blank"
                    variant="text"
                  >
                    Privacy Policy
                  </Button>
                </Trans>
              </Label>
            </div>
          </FormItem>

          <div className="mt-4 flex justify-center">
            <Button
              type="submit"
              variant="primary"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              {t('register:register_title')}
            </Button>
          </div>
        </div>
      </form>

      <p className="text-center font-semibold">
        <Trans i18nKey="register:sign_in_link">
          Already have an account?{' '}
          <Button
            to={LOGIN_PAGE}
            variant="text"
            className="ml-1 inline-flex p-0 text-primary"
          >
            Sign in here
          </Button>
        </Trans>
      </p>
    </>
  );
}

export default RegisterForm;
