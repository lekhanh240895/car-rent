import { TFunction } from 'i18next';
import * as yup from 'yup';

export const loginSchema = (t: TFunction<[string, string], undefined>) => {
  return yup
    .object({
      email: yup
        .string()
        .email(t('error_messages.invalid_email_format'))
        .required(
          t('error_messages.field_required', {
            field: t('email_field')
          })
        )
        .max(
          255,
          t('error_messages.max_length', {
            field: `${t('email_field')}`,
            number: 255
          })
        ),
      password: yup
        .string()
        .required(
          t('error_messages.field_required', {
            field: t('password_field')
          })
        )
        .min(8, t('error_messages.invalid_password_format'))
        .max(
          255,
          t('error_messages.max_length', {
            field: `${t('password_field')}`,
            number: 255
          })
        )
        .test(
          'is-password-valid',
          t('error_messages.invalid_password_format'),
          (value) => {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

            return passwordRegex.test(value);
          }
        )
    })
    .required();
};

export const registerSchema = (t: TFunction<[string, string], undefined>) => {
  return yup
    .object({
      full_name: yup
        .string()
        .required(
          t('error_messages.field_required', {
            field: t('name_field')
          })
        )
        .min(
          5,
          t('error_messages.min_length', {
            field: `${t('name_field')}`,
            number: 5
          })
        )
        .max(
          255,
          t('error_messages.max_length', {
            field: `${t('name_field')}`,
            number: 255
          })
        ),
      email: yup
        .string()
        .required(
          t('error_messages.field_required', {
            field: t('email_field')
          })
        )
        .email(t('error_messages.invalid_email_format'))
        .max(
          255,
          t('error_messages.max_length', {
            number: 255
          })
        ),
      password: yup
        .string()
        .required(
          t('error_messages.field_required', {
            field: t('password_field')
          })
        )
        .min(8, t('error_messages.invalid_password_format'))
        .max(
          255,
          t('error_messages.max_length', {
            field: t('password_field'),
            number: 255
          })
        )
        .test(
          'is-password-valid',
          t('error_messages.invalid_password_format'),
          (value) => {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

            return passwordRegex.test(value);
          }
        ),
      confirm_password: yup
        .string()
        .required(
          t('error_messages.field_required', {
            field: t('confirm_password_field')
          })
        )
        .max(255)
        .oneOf(
          [yup.ref('password')],
          t('error_messages.passwords_do_not_match')
        ),
      terms_and_policy_checked: yup
        .bool()
        .default(false)
        .oneOf([true], t('error_messages.terms_check_required'))
    })
    .required();
};

export const rentDetailSchema = (t: TFunction<[string, string], undefined>) => {
  return yup.object().shape({
    pickUp: yup.object().shape({
      location: yup
        .object()
        .shape({
          id: yup.number().required(),
          name: yup.string().required()
        })
        .required(
          t('common:error_messages.field_required', {
            field: t('pick_up_location')
          })
        ),
      date: yup.date().required(
        t('common:error_messages.field_required', {
          field: t('pick_up_date')
        })
      )
    }),
    dropOff: yup.object().shape({
      location: yup
        .object()
        .shape({
          id: yup.number().required(),
          name: yup.string().required()
        })
        .required(
          t('common:error_messages.field_required', {
            field: t('drop_off_location')
          })
        ),
      date: yup.date().required(
        t('common:error_messages.field_required', {
          field: t('drop_off_date')
        })
      )
    })
  });
};

export const paymentFormSchema = (
  t: TFunction<[string, string], undefined>
) => {
  return yup.object().shape({
    billing_info: yup.object().shape({
      name: yup
        .string()
        .required(
          t('common:error_messages.field_required', {
            field: t('name_field')
          })
        )
        .max(
          255,
          t('common:error_messages.max_length', {
            field: `${t('name_field')}`,
            number: 255
          })
        ),
      address: yup.string().required(
        t('common:error_messages.field_required', {
          field: t('address_field')
        })
      ),
      phone_number: yup.string().required(
        t('common:error_messages.field_required', {
          field: t('phone_field')
        })
      ),
      city: yup.string().required(t('common:error_messages.city_required'))
    }),
    payment_method: yup.string().required(
      t('common:error_messages.field_required', {
        field: t('payment_method_title')
      })
    ),
    confirmation: yup.object().shape({
      email_notify: yup.bool().default(false),
      terms_and_services: yup
        .bool()
        .default(false)
        .oneOf([true], t('common:error_messages.terms_check_required'))
    }),
    rentDetail: rentDetailSchema(t)
  });
};
