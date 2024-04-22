'use client';

import React, { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronLeftIcon } from '@heroicons/react/16/solid';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { i18nConfig } from '@/i18nConfig';
import { useCurrentLocale } from 'next-i18n-router/client';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { logout } from '../redux/features/userSlice';
import { getCookie } from 'cookies-next';
import { useAppDispatch } from '@/app/hooks/hooks';
import ApiManager from '../lib/ApiManager/ApiManager';
import Button from './Button';
import { useTheme } from 'next-themes';

export interface MenuItem {
  title: string;
  locale?: string;
  to?: string;

  children?: {
    title?: string;
    data: MenuItem[];
  };
}

type Props = {
  children: React.ReactNode;
  items: MenuItem[];
};

const CustomMenu = ({ items, children }: Props) => {
  const router = useRouter();
  const currentLocale = useCurrentLocale(i18nConfig);
  const currentPathname = usePathname();
  const { t, i18n } = useTranslation();
  const locale = i18n.language;
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const { resolvedTheme, setTheme } = useTheme();

  const [history, setHistory] = useState<
    {
      data: MenuItem[];
      title?: string;
    }[]
  >([
    {
      data: items
    }
  ]);
  const current = history[history.length - 1];

  const handleOpenMenu = (item: MenuItem) => {
    if (item.children) {
      // Use item.children.data if it exists, or an empty array as a fallback
      const childrenData = item.children.data || [];

      setHistory((prevState) => [
        ...prevState,
        {
          data: childrenData,
          title: item.children?.title // You may want to set the title as well
        }
      ]);
    }
  };

  const handleBack = () => {
    setHistory((prev) => prev.slice(0, history.length - 1));
  };

  const handleChangeLocale = (newLocale: string) => {
    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = '; expires=' + date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;
    const params = new URLSearchParams(searchParams);

    // redirect to the new locale path
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push('/' + newLocale + currentPathname + `?${params.toString()}`);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`) +
          `?${params.toString()}`
      );
    }

    router.refresh();
  };

  const handleItemClick = async (event: React.MouseEvent, item: MenuItem) => {
    if (item.children) {
      event.preventDefault();
      handleOpenMenu(item);
    } else if (item.locale) {
      handleChangeLocale(item.locale);
    } else if (item.title === t('header.logout_title')) {
      const refresh_token = getCookie('refresh_token') as string;

      try {
        await ApiManager.logOut(locale, { refresh_token });

        dispatch(logout());
        router.push('/');
        router.refresh();
      } catch (e: any) {
        const error: CustomError = e.body?.error;
        if (error) {
          const { message, error_id } = error;
          const errorMessage = `${message} (${error_id})`;

          toast.error(errorMessage);
        } else {
          toast.error(t('error_messages.unknown_error'));
        }
      }
    } else if (item.title === t('change_theme')) {
      setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
    }
  };

  const renderMenuItems = () => {
    return current.data.map((item, index) => (
      <Menu.Item key={index}>
        {({ active }) => (
          <div className="px-1 py-1">
            <div
              className={`${
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
              } group flex w-full cursor-pointer items-center rounded-md text-sm`}
              onClick={(event) => handleItemClick(event, item)}
            >
              <Menu.Button
                as={Button}
                variant="text"
                to={item.to}
                className={`flex h-[unset] w-full items-center justify-start px-2 py-2`}
              >
                {item.title}
              </Menu.Button>
            </div>
          </div>
        )}
      </Menu.Item>
    ));
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="flex items-center">
        <Menu.Button as={Fragment}>{children}</Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 top-full z-50 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          {history.length > 1 && (
            <div className="flex items-center justify-start gap-5 p-2">
              <ChevronLeftIcon
                className={`h-7 w-7 cursor-pointer text-textColor transition`}
                onClick={handleBack}
              />

              <h1>{current.title}</h1>
            </div>
          )}
          {renderMenuItems()}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default CustomMenu;
