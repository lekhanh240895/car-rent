import clsx from 'clsx';

import { UseFormRegister } from 'react-hook-form';

type InputOptions = {
  required?: boolean;
  rounded?: 'sm' | 'md' | 'lg' | 'full';
  bordered?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  name?: string;
  register?: UseFormRegister<any>;
  inputSize?: 'sm' | 'md' | 'lg';
  className?: string;
  containerClassname?: string;
};

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  InputOptions;

function Input(props: InputProps) {
  const {
    register,
    inputSize = 'md',
    name,
    id,
    iconLeft,
    iconRight,
    className,
    required,
    rounded = 'lg',
    bordered = false,
    containerClassname,
    ...rest
  } = props;

  const getRounded = (rounded: string) => {
    switch (rounded) {
      case 'full':
        return 'rounded-full';
      case 'sm':
        return 'rounded-sm';
      case 'md':
        return 'rounded';
      case 'lg':
        return 'rounded-[10px]';
      default:
        return;
    }
  };

  const getSize = (inputSize: string) => {
    switch (inputSize) {
      case 'sm':
        return 'h-10';
      case 'md':
        return 'h-12';
      case 'lg':
        return 'h-14';
      default:
        return;
    }
  };

  const inputClasses = clsx(
    'input',
    bordered && 'input-border',
    iconLeft && 'pl-14 md:pl-16',
    iconRight && 'pr-14 md:pr-16',
    getRounded(rounded),
    getSize(inputSize),
    className
  );

  return (
    <div className={clsx('relative', containerClassname)}>
      {register && name ? (
        <input
          {...register(name, {
            required
          })}
          className={inputClasses}
          {...rest}
          id={id ? id : name}
          name={name}
        />
      ) : (
        <input
          className={inputClasses}
          required
          {...rest}
          id={id ? id : name}
          name={name}
        />
      )}

      {iconLeft && (
        <span className={clsx('input-icon', 'left-6 md:left-5')}>
          {iconLeft}
        </span>
      )}
      {iconRight && (
        <span className={clsx('input-icon', 'right-6 md:right-5')}>
          {iconRight}
        </span>
      )}
    </div>
  );
}

export default Input;
