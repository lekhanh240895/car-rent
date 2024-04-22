import clsx from 'clsx';

function Circle({ className }: { className: string }) {
  const classNames = clsx(
    `absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-[20px] border-[#FFFFFF0F]`,
    className && className
  );
  return <div className={classNames}></div>;
}

export default Circle;
