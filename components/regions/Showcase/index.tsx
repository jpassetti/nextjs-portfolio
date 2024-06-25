"use client";

import React from 'react';
import p5 from 'p5';
import Image from 'next/image';
import P5Wrapper from '../../custom/P5Wrapper';
import Paragraph from '../../html/Paragraph';
import styles from './showcase.module.scss';

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
  caption?: string;
}

interface ImagesProps {
  images: ImageProps[];
}

const Showcase: React.FC<ShowcaseProps> & { Images: React.FC<ImagesProps>; Sketch: React.FC<{ sketch: (p: p5) => void }> } = ({ image, caption }) => {

  return (
    <div className={styles.showcase}>
      {image && <Image
            src={image.src}
            alt={image.altText}
            width={image.mediaDetails.width}
            height={image.mediaDetails.height}
            style={{ width: '100%', height: 'auto' }}
          />
      }
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

const Sketch: React.FC<{ sketch: (p: p5) => void }> = ({ sketch }) => {
  return <P5Wrapper sketch={sketch} width={1600} height={900} />;
};

Showcase.Sketch = Sketch;

export default Showcase;
