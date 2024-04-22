'use client';

import { Tab } from '@headlessui/react';
import Image from 'next/image';
import ArrowRow from './ArrowRow';
import clsx from 'clsx';

type Props = {
  item: CarDetail;
};
export function ImageSlider({ item }: Props) {
  const { images, name } = item;
  return (
    <div className="flex flex-col">
      <Tab.Group>
        <Tab.Panels className="mb-6 flex-1">
          {images.map((image, index) => (
            <Tab.Panel
              key={index}
              className="relative flex h-full min-h-[232px] w-full flex-1 flex-col rounded-lg bg-primary pt-4 text-white ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 md:min-h-[360px] md:pt-6"
            >
              <div className="relative z-20 w-60 space-y-3 px-4 sm:w-2/3 md:space-y-4 md:px-6 lg:w-full xl:w-3/4">
                <h1 className="text-base font-semibold text-shadow-lg md:text-xl lg:text-[32px] lg:leading-[48px]">
                  {image.title}
                </h1>

                <p className="mb-1 text-xs text-shadow-lg md:mb-4 md:text-base">
                  {image.description}
                </p>
              </div>

              <div
                className={clsx(
                  'z-10 w-full flex-1 flex-shrink-0',
                  index === 0 ? 'relative' : 'absolute inset-0'
                )}
              >
                <Image
                  fill
                  sizes="(max-width: 768px) 100vw, 100vw"
                  src={image.image_link}
                  alt={name}
                  priority
                  className={clsx(
                    'rounded-lg object-center',
                    index === 0 ? 'object-contain' : 'object-cover'
                  )}
                />
              </div>

              <div className="z-1 pointer-events-none absolute -left-6 right-0 top-0 h-full gap-0 overflow-hidden">
                <ArrowRow arrowClassName="h-full w-auto" className="h-1/3" />
                <ArrowRow
                  arrowClassName="h-full w-auto"
                  className="ml-12 h-1/3"
                />
                <ArrowRow arrowClassName="h-full w-auto" className="h-1/3" />
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>

        <Tab.List className="grid grid-cols-3 gap-5 text-white md:gap-6">
          {images.map((image, index) => (
            <Tab
              key={index}
              className={({ selected }) =>
                clsx(
                  'h-16 focus:outline-none sm:h-28 md:h-36 xl:h-[165px]',
                  selected &&
                    'rounded-[10px] border-[1.5px] border-primary  p-1 md:rounded-lg md:p-2 lg:border-[2px]'
                )
              }
            >
              <div className="relative min-h-full w-full rounded-[10px] bg-primary md:rounded-lg ">
                <Image
                  fill
                  sizes="(max-width: 768px) 100vw, 100vw"
                  src={image.image_link}
                  alt={name}
                  className={clsx(
                    'z-20 transform rounded-[10px] object-center md:rounded-lg',
                    index === 0 ? 'object-contain' : 'object-cover'
                  )}
                />

                <div className="absolute -left-6 bottom-0 right-0 top-0 z-10 h-full gap-0 overflow-hidden">
                  <ArrowRow arrowClassName="h-full w-auto" className="h-1/3" />
                  <ArrowRow
                    arrowClassName="h-full w-auto"
                    className="ml-4 h-1/3"
                  />
                  <ArrowRow arrowClassName="h-full w-auto" className="h-1/3" />
                </div>
              </div>
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
    </div>
  );
}
