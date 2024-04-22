import { ApiError, handleError } from '@/app/lib/exceptions';
import { verifyToken } from '@/app/lib/utils';
import { sql } from '@vercel/postgres';
import { JwtPayload } from 'jsonwebtoken';
import { headers } from 'next/headers';

export async function GET() {
  const headerList = headers();
  const access_token = headerList.get('Authorization')?.split(' ')[1];

  if (!access_token) {
    const error = ApiError.fromUnauthorized();
    return handleError(error, 401);
  }

  const decoded = verifyToken(access_token, 'access') as JwtPayload;
  if (!decoded) {
    const error = ApiError.fromUnauthorized();
    return handleError(error, 401);
  }
  const userId = decoded.userId;

  const { rows: users } = await sql`
  SELECT id, email, image, full_name, role, is_verified, created_at, updated_at
  FROM users
  WHERE id = ${userId};  
  `;

  return Response.json({
    status_code: 200,
    message: 'Success',
    data: users[0]
  });
}
