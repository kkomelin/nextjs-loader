import Image, { ImageProps } from 'next/image';
import React from 'react';
import { getInt } from '../utils/helpers';
import { uploadcareLoader } from '../utils/loader';

const shouldOverrideBlurDataUrl = (props: ImageProps): boolean => {
  return props.placeholder === 'blur' && !props.blurDataURL;
};

const generateBlurDataUrl = (
  src: string,
  width: ImageProps['width']
): string => {
  const imageWidth = getInt(width);
  const blurImageWidth = imageWidth ? Math.ceil(imageWidth * 0.01) : 10;
  return uploadcareLoader({
    src: src,
    width: blurImageWidth,
    quality: 1
  });
};

export function UploadcareImage(props: ImageProps): JSX.Element {
  let blurDataURL: string | undefined;
  if (typeof props.src === 'string' && shouldOverrideBlurDataUrl(props)) {
    blurDataURL = generateBlurDataUrl(props.src, props.width);
  }
  return (
    <Image
      loader={uploadcareLoader}
      blurDataURL={blurDataURL ?? props.blurDataURL}
      {...props}
    />
  );
}
