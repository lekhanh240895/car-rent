import { ApiError, handleError } from '@/app/lib/exceptions';
import { verifyToken } from '@/app/lib/utils';
import { sql } from '@vercel/postgres';
import { JwtPayload } from 'jsonwebtoken';
import { headers } from 'next/headers';

export async function POST(req: Request) {
  const { refresh_token } = await req.json();
  const headerList = headers();
  const access_token = headerList.get('Authorization')?.split(' ')[1];

  if (!access_token) return;

  const decoded = verifyToken(access_token, 'access') as JwtPayload;
  if (!decoded) {
    const error = ApiError.fromUnauthorized();
    return handleError(error, 401);
  }
  const userId = decoded.userId;

  const { rows } = await sql`
  SELECT * FROM available_tokens WHERE refresh_token = ${refresh_token}
  `;
  if (rows.length === 0) {
    const error = ApiError.fromInvalidToken();
    return handleError(error, 401);
  }

  await sql`DELETE FROM available_tokens WHERE refresh_token = ${refresh_token} AND user_id = ${userId}`;

  return Response.json({
    status_code: 200,
    message: 'Success'
  });
}
