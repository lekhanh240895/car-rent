import Button from './Button';
import CustomMenu, { MenuItem } from './Menu';
import Avatar from './Avatar';
import { Suspense } from 'react';
import { BellIcon, HeartIcon, SettingIcon } from './icons';
import { REGISTER_PAGE } from '../lib/constants';
import { TFunction } from 'i18next';

type Props = {
  t: TFunction<['translation', ...string[]], undefined>;
  user: User;
};
function HeaderRight({ t, user }: Props) {
  const avatarMenu: MenuItem[] = [
    {
      title: t('orders_history'),
      to: '/orders'
    },

    {
      title: t('header.logout_title')
    }
  ];

  const settingsMenu: MenuItem[] = [
    { title: 'English', locale: 'en' },
    { title: 'Tiếng Việt', locale: 'vi' },
    {
      title: t('change_theme')
    }
  ];

  return (
    <>
      {!user ? (
        <div className="flex h-full flex-wrap items-center gap-3 md:gap-5">
          <Button
            to="/login/"
            variant="text"
            className="p-0 text-sm font-bold text-primary md:text-base"
          >
            {t('header.login_title')}
          </Button>
          <span>/</span>
          <Button
            to={REGISTER_PAGE}
            variant="text"
            className="p-0 text-sm font-bold text-primary md:text-base"
          >
            {t('header.register_title')}
          </Button>

          <Suspense>
            <CustomMenu items={settingsMenu}>
              <Button
                variant="outline"
                icon={<SettingIcon className="h-4 w-4 md:h-6 md:w-6" />}
                className="h-7 w-7 md:h-11 md:w-11"
              >
                <span className="sr-only">Settings</span>
              </Button>
            </CustomMenu>
          </Suspense>
        </div>
      ) : (
        <div className="flex items-center gap-3 md:gap-5">
          <div className="flex md:gap-4 lg:gap-5">
            <Button
              className="hidden md:flex"
              variant="outline"
              icon={<HeartIcon />}
            >
              <span className="sr-only">Favorites</span>
            </Button>
            <Button
              className="hidden md:flex"
              variant="outline"
              icon={<BellIcon />}
            >
              <span className="sr-only">Notifications</span>
            </Button>

            <Suspense>
              <CustomMenu items={settingsMenu}>
                <Button
                  variant="outline"
                  icon={<SettingIcon className="h-4 w-4 md:h-6 md:w-6" />}
                  className="h-7 w-7 md:h-11 md:w-11"
                >
                  <span className="sr-only">Settings</span>
                </Button>
              </CustomMenu>
            </Suspense>
          </div>

          <Suspense>
            <CustomMenu items={avatarMenu}>
              <Avatar />
            </CustomMenu>
          </Suspense>
        </div>
      )}
    </>
  );
}

export default HeaderRight;
