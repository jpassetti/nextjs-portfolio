import classnames from 'classnames/bind';
import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Icon from '../Icon';

import styles from './button.module.scss';

const cx = classnames.bind(styles);

interface ButtonProps {
  label?: string;
}

interface UIProps {
  clickHandler?: () => void;
  icon?: IconProp;
  label?: string;
}

const Button: React.FC<ButtonProps> & { UI: React.FC<UIProps> } = ({ label }) => {
  return <button>{label}</button>;
};

const UI: React.FC<UIProps> = ({ clickHandler, icon, label }) => {
  const btnClasses = cx({
    btn__ui: true,
    btn__ui__menu: icon === 'bars',
    btn__ui__close: icon === 'times',
  });

  return (
    <button className={btnClasses} onClick={clickHandler}>
      {icon && <Icon icon={icon} />} {label}
    </button>
  );
};

Button.UI = UI;

export default Button;
