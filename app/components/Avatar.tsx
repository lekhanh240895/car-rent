import ImageWithBasePath from '@/app/components/ImageWithBasePath';
import Button from './Button';
import { forwardRef } from 'react';

type Ref = HTMLButtonElement;

const Avatar = forwardRef<Ref>((props, ref) => {
  return (
    <Button
      className="relative h-7 w-7 flex-shrink-0 overflow-hidden p-0 md:h-11 md:w-11"
      variant="text"
      rounded="full"
      ref={ref}
      {...props}
    >
      <ImageWithBasePath
        src={'/avatar-placeholder.jpeg'}
        alt="Avatar"
        fill
        sizes="(max-width: 768px) 100vw, 100vw"
        className="object-cover object-center"
      />
    </Button>
  );
});

Avatar.displayName = 'Button';
export default Avatar;
