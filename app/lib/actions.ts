'use server';

import { notFound } from 'next/navigation';
import ApiManager from './ApiManager/ApiManager';
import { NOTFOUND_CAR } from './error-code';
import { FetchSuccess } from './ApiManager/ApiMethods';
import { FetchException } from './exceptions';
import { TFunction } from 'i18next';

export const getCars = async (
  t: TFunction<'translation', undefined>,
  locale: string,
  params?: string
) => {
  try {
    const res: FetchSuccess<SearchResult<Car[]>> = await ApiManager.getCars(
      locale,
      params
    );

    const data = res.body.data;
    return data;
  } catch (error: any) {
    throw new FetchException(
      t('error_messages.fetch_exception', {
        name: t('car_title')
      })
    );
  }
};

export const getPopularCars = async (
  t: TFunction<'translation', undefined>,
  locale: string,
  limit: number
) => {
  try {
    const res: FetchSuccess<Car[]> = await ApiManager.getPopularCars(
      locale,
      limit
    );
    const items = res.body.data;
    return items;
  } catch (error: any) {
    throw new FetchException(
      t('error_messages.fetch_exception', {
        name: t('home:popular_car_title')
      })
    );
  }
};

export const getRecommendCars = async (
  t: TFunction<'translation', undefined>,
  locale: string,
  limit: number,
  offset: number
) => {
  try {
    const res: FetchSuccess<SearchResult<Car[]>> =
      await ApiManager.getRecommendCars(locale, limit, offset);
    const data = res.body.data;
    return data;
  } catch (error: any) {
    throw new FetchException(
      t('error_messages.fetch_exception', {
        name: t('recommend_car_title')
      })
    );
  }
};

export const getCarDetail = async (
  t: TFunction<'translation', undefined>,
  locale: string,
  id: number
) => {
  try {
    const res: FetchSuccess<CarDetail> = await ApiManager.getCarDetail(
      locale,
      id
    );
    const item = res.body.data;
    return item;
  } catch (error: any) {
    const e: CustomError = error.body?.error;

    if (e && e.error_id === NOTFOUND_CAR) {
      notFound();
    }

    throw new FetchException(
      t('error_messages.fetch_exception', {
        name: t('car_detail')
      })
    );
  }
};

export const getLocations = async (
  t: TFunction<'translation', undefined>,
  locale: string
) => {
  try {
    const res: FetchSuccess<FilterLocation[]> =
      await ApiManager.getLocations(locale);

    const locations = res.body.data;
    return locations;
  } catch (error: any) {
    throw new FetchException(
      t('error_messages.fetch_exception', {
        name: t('filter.location_title')
      })
    );
  }
};

export const getFiltersTag = async (
  t: TFunction<'translation', undefined>,
  locale: string
) => {
  try {
    const res: FetchSuccess<Filters> = await ApiManager.getFilterTags(locale);

    const filters = res.body.data;
    return filters;
  } catch (error: any) {
    throw new FetchException(
      t('error_messages.fetch_exception', {
        name: t('filter_tags')
      })
    );
  }
};

export const getCarReviews = async (
  t: TFunction<'translation', undefined>,
  locale: string,
  id: number,
  params?: string
) => {
  try {
    const res: FetchSuccess<SearchResult<Review[]>> =
      await ApiManager.getCarReviews(locale, id, params);

    const data = res.body.data;
    return data;
  } catch (error: any) {
    throw new FetchException(
      t('error_messages.fetch_exception', {
        name: t('car_reviews')
      })
    );
  }
};
