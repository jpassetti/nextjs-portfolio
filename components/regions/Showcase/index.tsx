"use client";

import React, { useRef } from 'react';
import dynamic from 'next/dynamic'
import Image from 'next/image';

import Heading from '../../html/Heading';
import Paragraph from '../../html/Paragraph';
import P5Wrapper from '../../custom/P5Wrapper';
import styles from './showcase.module.scss';



const DynamicComponentWithNoSSR = dynamic(
  () => import('../../../sketches/TriangleSketch'),
  { ssr: false }
);

interface MediaDetails {
  width: number;
  height: number;
}

interface ImageProps {
  src: string;
  altText: string;
  mediaDetails: MediaDetails;
}

interface ShowcaseProps {
  image?: ImageProps;
  sketch?: any;
  caption?: string;
}

interface ImagesProps {
  images: ImageProps[];
}

const Showcase: React.FC<ShowcaseProps> & { Images: React.FC<ImagesProps> } = ({ image, sketch, caption }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.showcase}>
      {sketch ? (
        <DynamicComponentWithNoSSR containerRef={containerRef} />
      ) : (
        image && (
          <Image
            src={image.src}
            alt={image.altText}
            width={image.mediaDetails.width}
            height={image.mediaDetails.height}
            style={{ width: '100%', height: 'auto' }}
          />
        )
      )}
      {caption && <Paragraph type="caption">{caption}</Paragraph>}
    </div>
  );
};

const Images: React.FC<ImagesProps> = ({ images }) => {
  return (
    <div className={styles.showcase__images}>
      {images.map((image, index) => (
        <Image
          key={index}
          src={image.src}
          alt={image.altText}
          width={image.mediaDetails.width}
          height={image.mediaDetails.height}
          style={{ width: '100%', height: 'auto' }}
        />
      ))}
    </div>
  );
};

Showcase.Images = Images;

export default Showcase;
