export const CHECKOUT = '/checkout';

export const ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  VERIFY_EMAIL: (token: string) => `/auth/email-verification/${token}`,
  ME: '/auth/me',
  REFRESH_TOKEN: '/auth/refresh',
  LOGOUT: '/auth/logout',
  LOCATIONS: '/locations',
  CARS: '/cars',
  POPULAR_CARS: `/cars/popular`,
  RECOMMEND_CARS: `/cars/recommendation`,
  FILTER_TAGS: '/cars/filter-tags',
  RENTALS: '/rentals',
  RENTALS_SUMMARY: '/rentals/summary',
  CHECKOUT_CAPTURE: (id?: string) => `/checkout/${id}/capture`, // endpoint for capture checkout with transaction_id
  CHECKOUT_CANCEL: (id?: string) => `/checkout/${id}/cancel`, // endpoint for cancel checkout with transaction_id
  RENTAL_DETAIL: (id: string) => `/rentals/${id}`,
  REVIEWS: (id: number) => `/cars/${id}/reviews`
};
