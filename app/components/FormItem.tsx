import Label, { LabelProps } from './Label';
import Input, { InputProps } from './Input';
import { FieldError, Merge } from 'react-hook-form';
import clsx from 'clsx';

type Props = {
  children?: React.ReactNode;
  name?: string;
  label?: string | React.ReactNode;
  error?: Merge<FieldError, (FieldError | undefined)[]>;
  inputProps?: InputProps;
  labelProps?: LabelProps;
  className?: string;
};

function FormItem({
  children,
  name,
  label,
  error,
  labelProps,
  inputProps,
  className,
  ...rest
}: Props) {
  const inputClass = inputProps?.className;
  return (
    <div
      className={clsx('space-y-2', error?.message && 'text-red-500', className)}
      {...rest}
    >
      {label && (
        <Label htmlFor={name} {...labelProps}>
          {label}
        </Label>
      )}

      {inputProps && (
        <Input
          name={name}
          {...inputProps}
          className={clsx(
            error?.message &&
              'border border-red-500 shadow-red-500 focus:border-red-500 focus:ring-red-500',
            inputClass,
            'dark:bg-black dark:text-white'
          )}
        />
      )}

      {children}

      {error && <p className="text-red-500"> {error?.message}</p>}
    </div>
  );
}

export default FormItem;
