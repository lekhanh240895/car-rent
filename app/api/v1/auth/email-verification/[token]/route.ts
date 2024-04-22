import { ApiError, handleError } from '@/app/lib/exceptions';
import { verifyToken } from '@/app/lib/utils';
import { sql } from '@vercel/postgres';
import { JwtPayload } from 'jsonwebtoken';

export const fetchCache = 'auto';

export async function GET(
  req: Request,
  {
    params
  }: {
    params: { token: string };
  }
) {
  const { token } = params;
  console.log(req.headers);
  try {
    const decoded = verifyToken(token, 'register') as JwtPayload;
    const userId = decoded.userId;

    const { rows: register_tokens } = await sql`
    SELECT * FROM register_tokens WHERE register_token = ${token}
    `;

    if (register_tokens.length === 0) {
      const error = ApiError.fromInvalidRegisterToken();
      return handleError(error, 401);
    }

    await sql`
    UPDATE users
    SET is_verified = true WHERE id = ${userId}
    `;

    await sql`
    DELETE FROM register_tokens WHERE register_token = ${token} and user_id = ${userId}
    `;

    return Response.json({ status_code: 200, message: 'Success' });
  } catch (e) {
    const error = ApiError.fromInvalidToken();
    return handleError(error, 401);
  }
}
