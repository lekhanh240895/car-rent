import clsx from 'clsx';
import { LabelHTMLAttributes } from 'react';

type LabelOptions = {};

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & LabelOptions;

function Label(props: LabelProps) {
  const { children, className, ...rest } = props;

  const labelClasses = clsx('label', className);
  return (
    <label {...rest} className={labelClasses}>
      {children}
    </label>
  );
}

export default Label;
