import { BASE_URL } from '../constants';
import { configureRefreshFetch, fetchJSON } from 'refresh-fetch';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { INVALID_TOKEN } from '../error-code';
import { ENDPOINTS } from './endpoints';

const shouldRefreshToken = (error: any) => {
  const { error_id } = error.body.error;
  return error.response.status === 401 && error_id === INVALID_TOKEN;
};

let isRefreshing = false;
let refreshQueue: (() => void)[] = [];

const refreshToken = async () => {
  if (isRefreshing) {
    return new Promise<void>((resolve) => {
      refreshQueue.push(() => resolve());
    });
  }

  isRefreshing = true;
  const refresh_token = getCookie('refresh_token');

  if (!refresh_token) {
    throw new Error('Missing refresh_token');
  }

  const url = ENDPOINTS.REFRESH_TOKEN;

  return ApiMethods.apiRequest('POST', 'en', url, { refresh_token })
    .then(
      (
        response: FetchSuccess<{
          access_token: string;
          refresh_token: string;
        }>
      ) => {
        const {
          data: { access_token, refresh_token }
        } = response.body;

        setCookie('access_token', access_token);
        setCookie('refresh_token', refresh_token);
      }
    )
    .catch((error: any) => {
      deleteCookie('access_token');
      deleteCookie('refresh_token');
      deleteCookie('currentUser');
      throw error;
    })
    .finally(() => {
      isRefreshing = false;

      if (refreshQueue.length > 0) {
        const nextRefresh = refreshQueue.shift();
        if (nextRefresh) nextRefresh();
      }
    });
};

export type FetchSuccess<T = any> = {
  body: {
    status_code: number;
    message: string;
    data: T;
  };
  response: Response;
};

const getHeaders = (locale: string) => {
  const access_token = getCookie('access_token');

  return {
    'Accept-Language': locale,
    'Content-Type': 'application/json',
    Authorization: `Bearer ${access_token}`
  };
};

class ApiMethods {
  static apiRequest<T>(
    method: string,
    locale: string,
    url: string,
    body?: T,
    options?: RequestInit
  ): Promise<FetchSuccess> {
    url = `${BASE_URL}${url}`;

    return fetchJSON(url, {
      method,
      body: JSON.stringify(body),
      headers: getHeaders(locale),
      ...options
    });
  }

  static async refreshTokenApiRequest<T>(
    method: string,
    locale: string,
    url: string,
    body?: T,
    options?: RequestInit
  ): Promise<FetchSuccess> {
    const refreshFetch = configureRefreshFetch({
      fetch: () => this.apiRequest(method, locale, url, body, options),
      shouldRefreshToken,
      refreshToken
    });

    return await refreshFetch();
  }

  static get(locale: string, url: string, options?: RequestInit) {
    return this.refreshTokenApiRequest('GET', locale, url, undefined, options);
  }
  static post<T>(locale: string, url: string, data?: T, options?: RequestInit) {
    return this.refreshTokenApiRequest<T>('POST', locale, url, data, options);
  }
  static put<T>(locale: string, url: string, data?: T, options?: RequestInit) {
    return this.refreshTokenApiRequest<T>('PUT', locale, url, data, options);
  }
  static delete<T>(
    locale: string,
    url: string,
    data?: T,
    options?: RequestInit
  ) {
    return this.refreshTokenApiRequest<T>('PUT', locale, url, data, options);
  }
}

export default ApiMethods;
