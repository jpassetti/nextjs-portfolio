import { Fragment } from 'react';

import classnames from 'classnames/bind';

import Heading from '../../html/Heading';
import Image from 'next/image';
import Link from 'next/link';

import styles from './grid.module.scss';
import Paragraph from '@/components/html/Paragraph';

const cx = classnames.bind(styles);

const Grid = ({children}) => {

  const gridClasses = cx({
    grid: true
  });

  return (
    <section className={gridClasses}>
      {children}
    </section>
  );
}
const Cell = ({ description, image, path, title, type, span }) => {

  const cellClasses = cx({
    grid__cell: true,
    intro : type === 'intro',
    [`span__col__${span.col}`] : span.col,
    [`span__row__${span.row}`] : span.row
  });

  return (
    <article className={cellClasses}>
      {image && (
        <Link href={path}>
        <Image
          src={image.src}
          alt={image.alt}
          width={image.mediaDetails.width}
          height={image.mediaDetails.height}
          className={styles.grid__cell__image}
        />
        </Link>
      )}
      <div className={styles.grid__cell__text}>
      {
        title && type === "intro" ? (
          <Fragment>
            <Heading level={2}>{title}</Heading>
            <Paragraph>{description}</Paragraph>
            </Fragment>
        ) : (
          <Heading level={3}>
            <Link href={path}>{title}</Link></Heading>
        )
      }
     </div>
    </article>
  );
}

Grid.Cell = Cell;
export default Grid;