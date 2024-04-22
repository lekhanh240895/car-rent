import Link from 'next/link';
import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { LoadingIcon } from './icons/icons';

type ButtonOptions = {
  lefticon?: React.ReactNode;
  righticon?: React.ReactNode;
  to?: string;
  rounded?: 'sm' | 'lg' | 'full' | 'md';
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
  icon?: React.ReactNode;
  variant?: 'primary' | 'outline' | 'text';
  size?: 'sm' | 'lg' | 'md';
};

type Ref = HTMLButtonElement;

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> &
  ButtonOptions;

const Button = forwardRef<Ref, ButtonProps>((props, ref) => {
  const {
    children,
    lefticon,
    righticon,
    to,
    variant = '',
    size = 'md',
    rounded = 'md',
    disabled = false,
    loading = false,
    icon,
    className,
    type,
    ...rest
  } = props;

  let Component: React.ElementType;
  const componentProps: ButtonProps = {
    type,
    ...rest
  };

  if (to) {
    Component = Link;
    componentProps.href = to;
  } else {
    Component = 'button';
    componentProps.disabled = disabled;
    componentProps.type = type || 'button';
  }

  const getVariant = (variant: string) => {
    switch (variant) {
      case 'primary':
        return 'bg-primary text-white hover:bg-primary/95 focus:ring-4 focus:ring-blue-200';
      case 'outline':
        return 'bg-white border border-borderColor hover:bg-gray-100 focus:ring-4 focus:ring-borderColor dark:text-black';
      case 'text':
        return 'focus:ring-4 focus:ring-borderColor px-0';
      default:
        return '';
    }
  };

  const getSize = (size: string) => {
    switch (size) {
      case 'lg':
        return 'h-14';
      default:
        return '';
    }
  };

  const getRounded = (rounded: string) => {
    switch (rounded) {
      case 'lg':
        return 'rounded-[10px]';
      case 'full':
        return 'rounded-full';
      case 'sm':
        return 'rounded-sm';
      default:
        return 'rounded';
    }
  };

  const buttonClasses = clsx(
    'btn',
    [
      disabled && 'cursor-not-allowed opacity-80',
      icon &&
        'p-0 w-11 h-11 rounded-full flex-shrink-0 focus:ring-4 focus:ring-borderColor',
      getVariant(variant),
      getSize(size),
      getRounded(rounded)
    ],
    className
  );

  const iconSize = {
    md: 'w-4 h-4',
    sm: 'w-3 h-3',
    lg: 'w-5 h-5'
  };

  const iconColor: {
    [key: string]: any;
  } = {
    primary: 'text-white',
    outline: 'text-primary'
  };

  const iconClasses = clsx([
    variant && iconColor[variant],
    size && iconSize[size]
  ]);

  const finalProps = {
    ...componentProps,
    className: buttonClasses,
    ref
  };

  return (
    <Component {...finalProps} disabled={disabled}>
      {loading && (
        <LoadingIcon className={clsx('inline animate-spin', iconClasses)} />
      )}

      {lefticon && <span className={iconClasses}>{lefticon}</span>}
      {icon}
      {children}
      {righticon && <span className={iconClasses}>{righticon}</span>}
    </Component>
  );
});

Button.displayName = 'Button';
export default Button;
