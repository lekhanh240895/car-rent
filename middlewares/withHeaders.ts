import { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server';

import { MiddlewareFactory } from './types';
import { API_ROOT } from '@/app/lib/constants';

export const withHeaders: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
    const cspHeader = `
      default-src 'self' ${API_ROOT} https://car-rent-lekhanh.vercel.app https://www.sandbox.paypal.com https://www.paypal.com;
      script-src 'self' https://www.sandbox.paypal.com https://www.paypal.com 'unsafe-inline' ${
        process.env.NODE_ENV === 'production' ? '' : `'unsafe-eval'`
      };
      style-src 'self' 'unsafe-inline';
      img-src 'self' blob: data: https://xsgames.co https://www.paypalobjects.com;
      font-src 'self' https://fonts.googleapis.com;
      object-src 'none';
      form-action 'self';
      frame-ancestors 'self';
  `;

    // Replace newline characters and spaces
    const contentSecurityPolicyHeaderValue = cspHeader
      .replace(/\s{2,}/g, ' ')
      .trim();

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-nonce', nonce);
    requestHeaders.set(
      'Content-Security-Policy',
      contentSecurityPolicyHeaderValue
    );

    const response = await next(request, _next);

    if (response) {
      response.headers.set('x-nonce', nonce);
      response.headers.set(
        'Content-Security-Policy',
        contentSecurityPolicyHeaderValue
      );
      response.headers.set('x-content-type-options', 'nosniff');
      response.headers.set('x-dns-prefetch-control', 'false');
      response.headers.set('x-download-options', 'noopen');
    }

    return response;
  };
};
