import Image, { ImageProps } from 'next/image';

interface ImageWithBasePathProps extends Omit<ImageProps, 'src'> {
  src: string;
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH;

const ImageWithBasePath = (props: ImageWithBasePathProps) => {
  const { src, alt, width, ...rest } = props;
  const url = src?.startsWith('/') ? `${basePath || ''}${src}` : src;
  return <Image alt={alt} src={url} {...rest} />;
};

export default ImageWithBasePath;
