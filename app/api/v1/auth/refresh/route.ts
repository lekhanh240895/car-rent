import { ApiError, handleError } from '@/app/lib/exceptions';
import {
  generateAccessToken,
  generateRefreshToken,
  saveRefreshTokenToDatabase,
  verifyToken
} from '@/app/lib/utils';
import { sql } from '@vercel/postgres';
import { JwtPayload } from 'jsonwebtoken';

export async function POST(req: Request) {
  const { refresh_token } = await req.json();
  const decoded = verifyToken(refresh_token, 'refresh') as JwtPayload;
  if (!decoded) {
    const error = ApiError.fromUnauthorized();
    return handleError(error, 401);
  }
  const userId = decoded.userId;

  const { rows } =
    await sql`SELECT * FROM available_tokens WHERE refresh_token = ${refresh_token}`;
  if (rows.length === 0) {
    const error = ApiError.fromUnauthorized();
    return handleError(error, 401);
  }

  await sql`DELETE FROM available_tokens WHERE refresh_token = ${refresh_token} AND user_id = ${userId}`;

  const access_token = generateAccessToken(userId);
  const new_refresh_token = generateRefreshToken(userId);

  await saveRefreshTokenToDatabase(userId, new_refresh_token);

  return Response.json({
    status_code: 201,
    message: 'Refresh token successfully',
    data: {
      access_token,
      refresh_token: new_refresh_token
    }
  });
}
