import initTranslations from '@/app/i18n';
import { ApiError, handleError } from '@/app/lib/exceptions';
import { loginSchema } from '@/app/lib/schema';
import {
  generateAccessToken,
  generateRefreshToken,
  saveRefreshTokenToDatabase
} from '@/app/lib/utils';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { headers } from 'next/headers';
import * as yup from 'yup';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const lang = headers().get('Accept-Language') || 'en';
  const { t } = await initTranslations(lang, ['common']);

  try {
    await loginSchema(t).validate(
      {
        email,
        password
      },
      {
        abortEarly: false
      }
    );
  } catch (error: any) {
    if (error instanceof yup.ValidationError) {
      const apiError = ApiError.fromYupError(error, 'LO-001');
      return handleError(apiError, 400);
    } else {
      const apiError = ApiError.fromUnexpected();
      return handleError(apiError, 500);
    }
  }

  const { rows: users } = await sql`SELECT * FROM users WHERE email = ${email}`;

  if (users.length === 0) {
    const apiError = ApiError.fromInvalidEmailPassword();
    return handleError(apiError, 400);
  }

  const user = users[0];

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    const apiError = ApiError.fromInvalidEmailPassword();
    return handleError(apiError, 400);
  }

  if (!user.is_verified) {
    const apiError = ApiError.fromUnverified();
    return handleError(apiError, 400);
  }

  const access_token = generateAccessToken(user.id);
  const refresh_token = generateRefreshToken(user.id);

  await saveRefreshTokenToDatabase(user.id, refresh_token);

  return Response.json({
    status_code: 200,
    message: 'Success',
    data: {
      access_token,
      refresh_token
    }
  });
}
