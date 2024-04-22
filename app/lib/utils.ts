import { format } from 'date-fns';
import jwt from 'jsonwebtoken';
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  REGISTER_TOKEN_SECRET
} from './constants';
import { sql } from '@vercel/postgres';

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages
  ];
};

export const formattedDate = (date: Date) => {
  return format(date, 'yyyy-MM-dd');
};

export const generateAccessToken = (userId: string) => {
  if (ACCESS_TOKEN_SECRET) {
    return jwt.sign({ userId }, ACCESS_TOKEN_SECRET, {
      expiresIn: '15m'
    });
  } else {
    throw new Error('ACCESS_TOKEN_SECRET is not defined');
  }
};

export const generateRegisterToken = (userId: string) => {
  if (REGISTER_TOKEN_SECRET) {
    return jwt.sign({ userId }, REGISTER_TOKEN_SECRET, {
      expiresIn: '1h'
    });
  } else {
    throw new Error('REGISTER_TOKEN_SECRET is not defined');
  }
};

// Function to generate refresh token
export const generateRefreshToken = (userId: string) => {
  if (REFRESH_TOKEN_SECRET) {
    return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: '1h' });
  } else {
    throw new Error('REFRESH_TOKEN_SECRET is not defined');
  }
};

export const refreshToken = () => {
  if (REFRESH_TOKEN_SECRET) {
    return jwt.sign({}, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
  } else {
    throw new Error('REFRESH_TOKEN_SECRET is not defined');
  }
};

// Function to save refresh token to database
export const saveRefreshTokenToDatabase = async (
  userId: string,
  refreshToken: string
) => {
  await sql`
  CREATE TABLE IF NOT EXISTS available_tokens (
    id SERIAL PRIMARY KEY,
    user_id UUID,
    refresh_token VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
  `;
  await sql`
      INSERT INTO available_tokens (user_id, refresh_token)
      VALUES (${userId}, ${refreshToken})
  `;
};

// Function to save refresh token to database
export const saveRegisterTokenToDatabase = async (
  userId: string,
  register_token: string
) => {
  await sql`
  CREATE TABLE IF NOT EXISTS register_tokens (
    id SERIAL PRIMARY KEY,
    user_id UUID,
    register_token VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
  `;
  await sql`
      INSERT INTO register_tokens (user_id, register_token)
      VALUES (${userId}, ${register_token})
  `;
};

export const verifyToken = (
  token: string,
  type: 'access' | 'refresh' | 'register'
) => {
  let secret;

  switch (type) {
    case 'access':
      secret = ACCESS_TOKEN_SECRET;
      break;
    case 'refresh':
      secret = REFRESH_TOKEN_SECRET;
      break;
    case 'register':
      secret = REGISTER_TOKEN_SECRET;
      break;
    default:
      throw new Error('Invalid token type');
  }

  if (secret) {
    try {
      const decoded = jwt.verify(token, secret);
      return decoded;
    } catch (error) {
      return null;
    }
  } else {
    throw new Error(`${type.toUpperCase()}_TOKEN_SECRET is not defined`);
  }
};

export function calculateNumberOfDays(
  startDateStr: string,
  endDateStr: string
): number {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  // Calculate the difference in milliseconds
  const differenceInMs = endDate.getTime() - startDate.getTime();

  // Convert milliseconds to days
  const millisecondsInADay = 1000 * 60 * 60 * 24;
  const numberOfDays = Math.floor(differenceInMs / millisecondsInADay) + 1;
  return numberOfDays;
}
