import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { MiddlewareFactory } from './types';
import { cookies } from 'next/headers';
import {
  LOGIN_PAGE,
  ORDERS_PAGE,
  ORDER_DETAIL_PAGE,
  PAYMENT_PAGE,
  REGISTER_PAGE
} from '@/app/lib/constants';

export const withAuthorization: MiddlewareFactory = (next) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;
    const cookieStore = cookies();
    const currentUser = cookieStore.get('currentUser')?.value;
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH;

    // Define unauthenticated routes
    const unauthenticatedRoutes = [
      LOGIN_PAGE,
      `/vi${LOGIN_PAGE}`,
      REGISTER_PAGE,
      `/vi${REGISTER_PAGE}`
    ];

    const authenticatedRoutes = [
      PAYMENT_PAGE,
      `/vi${PAYMENT_PAGE}`,
      ORDERS_PAGE,
      `/vi${ORDERS_PAGE}`,
      ORDER_DETAIL_PAGE,
      `/vi${ORDER_DETAIL_PAGE}`
    ];

    if (currentUser) {
      if (unauthenticatedRoutes?.some((path) => pathname.startsWith(path))) {
        const baseUrl = basePath ? `${basePath}/` : '/';
        const url = new URL(baseUrl, request.nextUrl);
        return NextResponse.redirect(url);
      }
    } else {
      if (authenticatedRoutes?.some((path) => pathname.startsWith(path))) {
        const baseUrl = basePath ? `${basePath}/login` : '/login';
        const url = new URL(baseUrl, request.nextUrl);
        const { pathname, search } = request.nextUrl;

        url.searchParams.set('callbackUrl', encodeURI(`${pathname}${search}`));
        return NextResponse.redirect(url);
      }
    }

    // Continue to the next middleware for other cases
    return next(request, _next);
  };
};
