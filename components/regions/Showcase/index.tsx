import styles from './showcase.module.scss';

import Image from 'next/image';
import Heading from '../../html/Heading';
import Paragraph from '../../html/Paragraph';
import P5Wrapper from '../../custom/P5Wrapper';

const Showcase = ({ image, sketch, caption }) => {
  return <div className={styles.showcase}>
    {sketch ? 
      <P5Wrapper sketch={sketch} />
    : 
      <Image 
      src={image.src}
      alt={image.altText}
      width={image.mediaDetails.width}
      height={image.mediaDetails.height}
      style={{width: '100%',
        height: 'auto',
      }}
      />
    }
    {caption && <Paragraph type="caption">{caption}</Paragraph>}
  </div>;
}
const Images = ({ images }) => {
  return <div className={styles.showcase__images}>
    {images.map((image, index) => (
        <Image 
        key={index}
        src={image.src}
        alt={image.altText}
        width={image.mediaDetails.width}
        height={image.mediaDetails.height}
        style={{width: '100%',
          height: 'auto',
        }}
        />
   ))}
    
  </div>;
}

Showcase.Images = Images;

export default Showcase;