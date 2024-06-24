import classNames from 'classnames/bind';
import React from 'react';
import styles from './col.module.scss';

const cx = classNames.bind(styles);

interface ColProps {
  children: React.ReactNode;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  position?: 'sticky' | 'relative' | 'absolute' | 'fixed' | 'static';
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
}

const Col: React.FC<ColProps> = ({
  children,
  xs,
  sm,
  md,
  lg,
  xl,
  position,
  marginTop,
  marginRight,
  marginBottom = 2,
  marginLeft,
  paddingTop,
  paddingRight = 1,
  paddingBottom,
  paddingLeft = 1,
}) => {
  const colClasses = cx({
    col: true,
    [`col__xs__${xs}`]: xs,
    [`col__sm__${sm}`]: sm,
    [`col__md__${md}`]: md,
    [`col__lg__${lg}`]: lg,
    [`col__xl__${xl}`]: xl,
    sticky: position === 'sticky',
    [`margin-top-${marginTop}`]: typeof marginTop === 'number' ? `margin-top-${marginTop}` : undefined,
    [`margin-right-${marginRight}`]: typeof marginRight === 'number' ? `margin-right-${marginRight}` : undefined,
    [`margin-bottom-${marginBottom}`]: typeof marginBottom === 'number' ? `margin-bottom-${marginBottom}` : undefined,
    [`margin-left-${marginLeft}`]: typeof marginLeft === 'number' ? `margin-left-${marginLeft}` : undefined,
    [`padding-top-${paddingTop}`]: typeof paddingTop === 'number' ? `padding-top-${paddingTop}` : undefined,
    [`padding-right-${paddingRight}`]: typeof paddingRight === 'number' ? `padding-right-${paddingRight}` : undefined,
    [`padding-bottom-${paddingBottom}`]: typeof paddingBottom === 'number' ? `padding-bottom-${paddingBottom}` : undefined,
    [`padding-left-${paddingLeft}`]: typeof paddingLeft === 'number' ? `padding-left-${paddingLeft}` : undefined,
  });

  return <div className={colClasses}>{children}</div>;
};

export default Col;
