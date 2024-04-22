import { BigArrowIcon } from './icons';
import clsx from 'clsx';

interface ArrowRowProps {
  className?: string;
  arrowClassName?: string;
}

const ArrowRow: React.FC<ArrowRowProps> = ({ className, arrowClassName }) => (
  <div
    className={clsx(`flex w-full flex-nowrap gap-4`, className && className)}
  >
    <BigArrowIcon className={clsx('flex-shrink-0', arrowClassName)} />
    <BigArrowIcon className={clsx('flex-shrink-0', arrowClassName)} />
    <BigArrowIcon className={clsx('flex-shrink-0', arrowClassName)} />
    <BigArrowIcon className={clsx('flex-shrink-0', arrowClassName)} />
    <BigArrowIcon className={clsx('flex-shrink-0', arrowClassName)} />
    <BigArrowIcon className={clsx('flex-shrink-0', arrowClassName)} />
    <BigArrowIcon className={clsx('flex-shrink-0', arrowClassName)} />
    <BigArrowIcon className={clsx('flex-shrink-0', arrowClassName)} />
    <BigArrowIcon className={clsx('flex-shrink-0', arrowClassName)} />
    <BigArrowIcon className={clsx('flex-shrink-0', arrowClassName)} />
    <BigArrowIcon className={clsx('flex-shrink-0', arrowClassName)} />
  </div>
);

export default ArrowRow;
