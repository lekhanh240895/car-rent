'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FilterIcon, SearchIcon } from './icons/icons';
import Button from './Button';
import { useTranslation } from 'react-i18next';
import FormItem from './FormItem';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import FilterMenu from './FilterMenu';
import queryString from 'query-string';
import { useEffect, useRef } from 'react';
import { CATEGORY_PAGE } from '../lib/constants';
import { userSelector } from '../redux/selectors';
import { getCookie } from 'cookies-next';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks';
import { ENDPOINTS } from '../lib/ApiManager/endpoints';
import { INVALID_TOKEN } from '../lib/error-code';
import { resetUserSlice } from '../redux/features/userSlice';

export type SearchFormData = {
  query?: string;
  filter: {
    price: number;
    types: (string | boolean)[];
    capacities: (string | boolean)[];
  };
};

type Props = {
  filters: Filters;
};

const SearchForm = ({ filters }: Props) => {
  const { t, i18n } = useTranslation();
  const searchParams = useSearchParams();
  const { replace, refresh } = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { isSubmitting }
  } = useForm<SearchFormData>({
    defaultValues: {
      query: searchParams.get('query')?.toString(),
      filter: {
        price: filters.price.max,
        types: [],
        capacities: []
      }
    }
  });

  const { error } = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const locale = i18n.language;
  const access_token = getCookie('access_token');
  const initRef = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true;

      if (access_token) {
        dispatch({
          type: 'user/fetchUser',
          payload: {
            path: ENDPOINTS.ME,
            locale
          }
        });
      }
    }
  }, [access_token, dispatch, locale]);

  useEffect(() => {
    if (error && error.includes(INVALID_TOKEN)) {
      toast.error(t('error_messages.session_expired'));
      dispatch(resetUserSlice());

      const params = new URLSearchParams(searchParams);
      const currentUrl = `${pathname}?${params.toString()}`;

      const callbackParams = new URLSearchParams();
      const callbackUrl = encodeURI(currentUrl);
      callbackParams.set('callbackUrl', callbackUrl);

      replace(`/login?${callbackParams.toString()}`);
      refresh();
    }
  }, [dispatch, error, pathname, refresh, replace, searchParams, t]);

  useEffect(() => {
    // Get updated values from searchParams
    const types = searchParams.getAll('types');
    const capacities = searchParams.getAll('capacities');
    const maxPrice = searchParams.get('max_price');

    const updatedTypes = filters.types.map((filter) => {
      return types.includes(filter.id.toString())
        ? filter.id.toString()
        : false;
    });
    const updatedCapacities = filters.capacities.map((filter) => {
      return capacities.includes(filter.id.toString())
        ? filter.id.toString()
        : false;
    });

    maxPrice && setValue('filter.price', Number(maxPrice));
    setValue('filter.types', updatedTypes || []);
    setValue('filter.capacities', updatedCapacities || []);
  }, [filters, searchParams, setValue]);

  const onSubmit: SubmitHandler<SearchFormData> = async (data) => {
    const { query, filter } = data;
    const { types, capacities, price } = filter;

    const params = new URLSearchParams(searchParams);

    if (query) {
      params.set('query', query);
    } else {
      params.delete('query');
    }
    params.set('max_price', price.toString());
    params.set('page', '1');
    params.set('limit', '9');
    params.delete('types');
    params.delete('capacities');

    const typeParams = queryString.stringify({
      types: types?.filter((v) => v && v !== 'false')
    });

    const capacityParams = queryString.stringify({
      capacities: capacities?.filter((v) => v && v !== 'false')
    });

    const url = `${CATEGORY_PAGE}?${params.toString()}${typeParams && `&${typeParams}`}${capacityParams && `&${capacityParams}`}`;
    replace(url);
  };

  const formData = watch();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex h-full w-full lg:max-w-[492px]"
    >
      <FormItem
        inputProps={{
          name: 'query',
          placeholder: t('header.search_field_placeholder'),
          iconLeft: <SearchIcon />,
          iconRight: (
            <FilterMenu
              t={t}
              register={register}
              price={formData.filter?.price}
              filters={filters}
              onClearFilters={() => reset()}
            >
              <Button variant="text" className="hidden px-0 lg:flex">
                <FilterIcon />
                <span className="sr-only">Filter</span>
              </Button>
            </FilterMenu>
          ),
          register,
          className: '!h-full pr-6 bg-white',
          rounded: 'full',
          bordered: true,
          containerClassname: 'h-full w-full'
        }}
        className="relative flex h-12 w-full items-center justify-center space-y-0 lg:h-11"
      />

      <FilterMenu
        t={t}
        register={register}
        price={formData.filter?.price}
        filters={filters}
        onClearFilters={() => reset()}
      >
        <Button
          variant="outline"
          className="ml-5 flex h-12 w-12 rounded-lg md:ml-10 lg:hidden"
          icon={<FilterIcon />}
          type="button"
        >
          <span className="sr-only">Filter</span>
        </Button>
      </FilterMenu>
    </form>
  );
};

export default SearchForm;
