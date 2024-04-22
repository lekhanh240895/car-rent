'use client';

import { useTranslation } from 'react-i18next';
import Button from './Button';
import { getCookie, setCookie } from 'cookies-next';
import { CAR_DETAIL_PAGE } from '../lib/constants';

type Props = {
  id: number;
};

function RentalButton({ id }: Props) {
  const { t } = useTranslation();

  const handleRecentCars = () => {
    const recentCars: number[] = JSON.parse(getCookie('recentCars') || '[]');

    const newRecentCars = [...recentCars.filter((i) => i !== id), id];
    setCookie('recentCars', JSON.stringify(newRecentCars));
  };

  return (
    <Button
      to={`${CAR_DETAIL_PAGE}/${id}`}
      variant="primary"
      className="h-9 min-w-[100px] flex-shrink-0 text-xs md:h-11 md:min-w-[116px] md:text-base"
      onClick={handleRecentCars}
    >
      {t('rent_button_title')}
    </Button>
  );
}

export default RentalButton;
