export const API_ROOT = process.env.NEXT_PUBLIC_API_URL;
export const BASE_URL = `${API_ROOT}/api/v1`;
export const NEXT_PUBLIC_PAYPAL_CLIENT_ID =
  process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
export const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
export const NEXT_PUBLIC_PAYPAL_BASE_URL =
  process.env.NEXT_PUBLIC_PAYPAL_BASE_URL;
export const LOGIN_PAGE = '/login';
export const REGISTER_PAGE = '/register';
export const EMAIL_VERIFY_PAGE = '/email-verify';
export const ORDERS_PAGE = '/orders';
export const ORDER_DETAIL_PAGE = '/order';
export const PAYMENT_PAGE = '/payment';
export const CATEGORY_PAGE = '/category';
export const CAR_DETAIL_PAGE = '/car';
export const PAYMENT_METHOD_COD = 'COD';
export const PAYMENT_METHOD_PAYPAL = 'PAYPAL';
export const SENTRY_DSN = process.env.SENTRY_DSN;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export const REGISTER_TOKEN_SECRET = process.env.REGISTER_TOKEN_SECRET;
export const MAILTRAP_HOST = process.env.MAILTRAP_HOST;
export const MAILTRAP_PORT = process.env.MAILTRAP_PORT;
export const MAILTRAP_USER = process.env.MAILTRAP_USER;
export const MAILTRAP_PASSWORD = process.env.MAILTRAP_PASSWORD;
