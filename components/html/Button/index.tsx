import classnames from 'classnames/bind';

import Icon from '../Icon';

import styles from './Button.module.scss';

const cx = classnames.bind(styles);

const Button = ({label}) => {
  return <button>{label}</button>
}
const UI = ({ clickHandler, icon, label }) => {
  const btnClasses = cx({
    btn__ui: true,
    btn__ui__menu: icon === 'bars',
    btn__ui__close: icon === 'times'
  });


  return <button className={btnClasses} onClick={clickHandler}><Icon icon={icon} /> {label}</button>
}
Button.UI = UI;

export default Button;