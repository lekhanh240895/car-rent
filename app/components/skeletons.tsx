import clsx from 'clsx';

const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

type Props = {
  vertical?: boolean;
};

export function CardSkeleton({ vertical }: Props) {
  return (
    <div
      className={clsx(
        `${shimmer} pointer-events-none relative flex min-h-72 flex-shrink-0 flex-col rounded-[10px] bg-white p-4 text-sm dark:border dark:border-white dark:bg-black md:min-h-96 md:w-auto xl:p-6`,
        vertical ? 'w-full' : 'w-60'
      )}
    >
      <div className="flex justify-between">
        <div className="space-y-2">
          <div className="h-6 w-32 bg-gray-200"></div>
          <div className="h-5 w-10 bg-gray-200"></div>
        </div>
        <div className="h-6 w-6 rounded-full bg-gray-200"></div>
      </div>

      <div
        className={clsx(
          'mt-4 flex flex-1 justify-between',
          vertical ? 'flex-row md:flex-col' : 'flex-col gap-11'
        )}
      >
        <div
          className={clsx(
            'grid flex-1 place-items-center',
            vertical ? 'px-5' : ' px-[30px] md:px-9'
          )}
        >
          <div className="h-16 w-full bg-gray-200"></div>
        </div>

        <div
          className={clsx(
            'flex justify-center gap-4 text-subTextColor md:flex-row',
            vertical ? 'flex-col items-start md:items-center' : ''
          )}
        >
          <div className="flex h-6 w-12 items-center justify-center gap-1 bg-gray-200 text-xs md:text-sm"></div>
          <div className="flex h-6 w-12 items-center justify-center gap-1 bg-gray-200 text-xs md:text-sm"></div>
          <div className="flex h-6 w-12 items-center justify-center gap-1 bg-gray-200 text-xs md:text-sm"></div>
        </div>
      </div>

      <div className="mt-7 flex items-center gap-4 md:mt-6 md:gap-6">
        <div className="h-9 flex-1 bg-gray-200 md:h-11"></div>

        <div className="h-9 w-[100px] bg-gray-200 md:h-11 md:w-28"></div>
      </div>
    </div>
  );
}

export function PopularsSkeleton() {
  return (
    <div className="-mx-6 flex gap-8 overflow-auto p-1 pl-6 scrollbar-hide md:-mx-16 md:pl-16 2xl:mx-0 2xl:ml-0 2xl:grid 2xl:grid-cols-4 2xl:pl-1">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
}

export function RecommendsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
      <CardSkeleton vertical />
      <CardSkeleton vertical />
      <CardSkeleton vertical />
      <CardSkeleton vertical />
      <CardSkeleton vertical />
      <CardSkeleton vertical />
      <CardSkeleton vertical />
      <CardSkeleton vertical />
    </div>
  );
}

export function CategorySkeleton() {
  return (
    <div className="mb-12 grid grid-cols-1 gap-8 md:mb-16 md:grid-cols-2 lg:grid-cols-3">
      <CardSkeleton vertical />
      <CardSkeleton vertical />
      <CardSkeleton vertical />
      <CardSkeleton vertical />
      <CardSkeleton vertical />
      <CardSkeleton vertical />
      <CardSkeleton vertical />
      <CardSkeleton vertical />
      <CardSkeleton vertical />
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}
