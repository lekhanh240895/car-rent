'use client';

import { TFunction } from 'i18next';
import { FormEventHandler, useEffect, useRef } from 'react';

type Props = {
  price: number;
  max: number;
  register?: any;
  name: string;
  step?: number;
  min?: number;
  t: TFunction<'translation', undefined>;
  onInput?: FormEventHandler<HTMLInputElement>;
};
function PriceRange({
  price,
  max,
  register,
  name,
  step = 1,
  min = 0,
  t,
  onInput
}: Props) {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const percent = (price / max) * 100 + '%';
    if (progressRef.current) {
      progressRef.current.style.width = percent;
    }
  }, [max, price, progressRef]);

  return (
    <>
      <div className="relative mb-2 h-3 rounded-full bg-subTextColor">
        <div
          ref={progressRef}
          className={`absolute left-0 top-0 h-full rounded-full bg-primary`}
        />

        <input
          type="range"
          className="absolute h-3 w-full appearance-none rounded-full bg-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
          min={min}
          max={max}
          step={step}
          {...register(name)}
          onInput={onInput}
        />
      </div>

      <span suppressHydrationWarning>
        {t('filter.max_title')}: ${price ? price : max}
      </span>
    </>
  );
}

export default PriceRange;
