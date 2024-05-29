import initTranslations from '@/app/i18n';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { TFunction } from 'i18next';
import { headers } from 'next/headers';
import * as yup from 'yup';
import { ApiError, handleError } from '@/app/lib/exceptions';
import nodemailer from 'nodemailer';
import {
  generateRegisterToken,
  saveRegisterTokenToDatabase
} from '@/app/lib/utils';
import { mailContent } from '@/app/lib/mailtrap';
import {
  MAILTRAP_HOST,
  MAILTRAP_PASSWORD,
  MAILTRAP_PORT,
  MAILTRAP_USER
} from '@/app/lib/constants';
import Queue from 'bull';
import redis from '@/app/lib/redis';

export async function POST(req: Request) {
  const { email, password, confirm_password, full_name } = await req.json();
  const hashedPassword = await bcrypt.hash(password, 10);
  const lang = headers().get('Accept-Language') || 'en';
  const { t } = await initTranslations(lang, ['common']);

  try {
    await registerSchema(t).validate(
      {
        email,
        password,
        confirm_password,
        full_name
      },
      {
        abortEarly: false
      }
    );
  } catch (error: any) {
    if (error instanceof yup.ValidationError) {
      const apiError = ApiError.fromYupError(error, 'RE-002');
      return handleError(apiError, 400);
    } else {
      const apiError = ApiError.fromUnexpected();
      return handleError(apiError, 500);
    }
  }

  const { rows } =
    await sql`SELECT EXISTS(SELECT 1 FROM users WHERE email = ${email})`;

  if (rows[0].exists) {
    const apiError = ApiError.fromEmailExists();
    return handleError(apiError, 400);
  }

  const { rows: users } = await sql`
    INSERT INTO users (email, full_name, password)
    VALUES (${email}, ${full_name}, ${hashedPassword})
    RETURNING *;
  `;

  const user = users[0];

  const register_token = generateRegisterToken(user.id);
  await saveRegisterTokenToDatabase(user.id, register_token);

  const transporter = nodemailer.createTransport({
    host: MAILTRAP_HOST,
    port: Number(MAILTRAP_PORT),
    auth: {
      user: MAILTRAP_USER,
      pass: MAILTRAP_PASSWORD
    }
  });

  const emailQueue = new Queue('sendEmail', {
    createClient: function (type) {
      switch (type) {
        case 'client':
          return redis;
        case 'subscriber':
          return redis.duplicate();
        default:
          return redis;
      }
    }
  });

  emailQueue.process(async (job) => {
    try {
      const { to, html } = job.data;
      await transporter.sendMail({
        from: '"Car Rent Team" <morent@car-rent.com>',
        to,
        subject: 'Account Registration Verification',
        text: 'Thank you for registering with us! Please use the following link to verify your account:',
        html
      });
    } catch (error) {
      const apiError = ApiError.fromSentEmail();
      return handleError(apiError, 500);
    }
  });

  await emailQueue.add({
    to: user.email,
    html: mailContent(register_token, user.email)
  });

  return Response.json({
    status_code: 201,
    message: 'Success',
    data: user
  });
}

const registerSchema = (t: TFunction<[string, string], undefined>) => {
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
        )
    })
    .required();
};
