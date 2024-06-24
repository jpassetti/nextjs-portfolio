import React from 'react';
import classNames from 'classnames/bind';
import styles from './row.module.scss';

const cx = classNames.bind(styles);

interface RowProps {
  alignItems?: string;
  borderBottom?: string;
  children: React.ReactNode;
  className?: string;
  justifyContent?: string;
  marginBottom?: number;
  marginTop?: number;
  tableHeader?: boolean;
}

const Row: React.FC<RowProps> = ({
  alignItems,
  borderBottom,
  children,
  className = '',
  justifyContent,
  marginBottom,
  marginTop,
  tableHeader,
}) => {
  let rowClasses = cx({
    row: true,
    [`justify-content-${justifyContent}`]: justifyContent,
    [`align-items-${alignItems}`]: alignItems,
    tableHeader: tableHeader,
    [`margin-bottom-${marginBottom}`]: typeof marginBottom === 'number' ? `margin-bottom-${marginBottom}` : undefined,
    [`margin-top-${marginTop}`]: typeof marginTop === 'number' ? `margin-top-${marginTop}` : undefined,
    [`border-bottom-${borderBottom}`]: borderBottom,
  });

  return <div className={`${rowClasses} ${className}`}>{children}</div>;
}

export default Row;
