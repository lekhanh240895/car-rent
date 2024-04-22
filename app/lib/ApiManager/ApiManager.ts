import { LoginFormData } from '@/app/components/LoginForm';
import { RegisterFormData } from '@/app/components/RegisterForm';
import { ENDPOINTS } from './endpoints';
import ApiMethods from './ApiMethods';
class ApiManager {
  static login = (locale: string, data: LoginFormData) => {
    const url = ENDPOINTS.LOGIN;
    return ApiMethods.post(locale, url, data);
  };
  static register = (locale: string, data: RegisterFormData) => {
    const url = ENDPOINTS.REGISTER;
    return ApiMethods.post(locale, url, data);
  };
  static verifyEmail = (locale: string, token: string) => {
    const url = ENDPOINTS.VERIFY_EMAIL(token);

    return ApiMethods.get(locale, url);
  };
  static getMe = (locale: string) => {
    const url = ENDPOINTS.ME;

    return ApiMethods.get(locale, url);
  };
  static refreshToken = (
    locale: string,
    data: {
      refresh_token: string;
    }
  ) => {
    const url = ENDPOINTS.REFRESH_TOKEN;
    return ApiMethods.post(locale, url, data);
  };
  static logOut = (
    locale: string,
    data: {
      refresh_token: string;
    }
  ) => {
    const url = ENDPOINTS.LOGOUT;
    return ApiMethods.post(locale, url, data);
  };
  static getLocations = (locale: string) => {
    const url = ENDPOINTS.LOCATIONS;

    return ApiMethods.get(locale, url, {
      next: {
        revalidate: 60
      }
    });
  };
  static getCars = (locale: string, params?: string) => {
    const url = ENDPOINTS.CARS + `?${params}`;

    return ApiMethods.get(locale, url, {
      next: {
        revalidate: 60
      }
    });
  };
  static getPopularCars = (locale: string, limit: number) => {
    const url = ENDPOINTS.POPULAR_CARS + `?limit=${limit}`;

    return ApiMethods.get(locale, url, {
      next: {
        revalidate: 60
      }
    });
  };
  static getRecommendCars = (locale: string, limit: number, offset: number) => {
    const url = ENDPOINTS.RECOMMEND_CARS + `?limit=${limit}&offset=${offset}`;

    return ApiMethods.get(locale, url, {
      next: {
        revalidate: 60
      }
    });
  };
  static getFilterTags = (locale: string) => {
    const url = ENDPOINTS.FILTER_TAGS;

    return ApiMethods.get(locale, url, {
      next: {
        revalidate: 60
      }
    });
  };
  static getCarDetail = (locale: string, id: number) => {
    const url = ENDPOINTS.CARS + `/${id}`;

    return ApiMethods.get(locale, url, {
      next: {
        revalidate: 60
      }
    });
  };
  static createRental = (
    locale: string,
    data: {
      billing_info: {
        name: string;
        phone_number: string;
        address: string;
        city: string;
      };
      rental_info: {
        car_id: number;
        pick_up_location_id: number;
        pick_up_time: string;
        drop_off_location_id: number;
        drop_off_time: string;
      };
      payment_method: string;
      promo_code?: string;
      displayed_total: number;
    }
  ) => {
    const url = ENDPOINTS.RENTALS;

    return ApiMethods.post(locale, url, data);
  };
  static getRentalSummary = (locale: string, params: string) => {
    const url = ENDPOINTS.RENTALS_SUMMARY + `?${params}`;

    return ApiMethods.get(locale, url);
  };
  static checkoutCapture = (locale: string, id?: string) => {
    const url = ENDPOINTS.CHECKOUT_CAPTURE(id);
    return ApiMethods.post(locale, url);
  };
  static checkoutCancel = (locale: string, id?: string) => {
    const url = ENDPOINTS.CHECKOUT_CANCEL(id);
    return ApiMethods.post(locale, url);
  };
  static getOrders = (locale: string, params?: string) => {
    const url = ENDPOINTS.RENTALS + `?${params}`;

    return ApiMethods.get(locale, url);
  };
  static getOrderDetail = (locale: string, id: string) => {
    const url = ENDPOINTS.RENTAL_DETAIL(id);

    return ApiMethods.get(locale, url);
  };
  static getCarReviews = (locale: string, id: number, params?: string) => {
    const url = ENDPOINTS.REVIEWS(id) + `?${params}`;

    return ApiMethods.get(locale, url);
  };
}

export default ApiManager;
