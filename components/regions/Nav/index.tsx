import classnames from 'classnames/bind';

import Link from 'next/link';

import { getPages } from '../../../lib/pages';

import styles from './Nav.module.scss';

const cx = classnames.bind(styles);

const Nav = () => {
    return (
        <nav>
             <ul>
           {getPages().map((page, index) => (
              <li key={index}>
                  <Link href={page.slug}>
                     {page.title}
                  </Link>
              </li>
          ))}
      </ul>
        </nav>
    );
}
const Desktop = () => {
    const navDesktopClasses = cx({
        nav: true,
        nav__desktop: true
    });

    return (
      <nav className={navDesktopClasses}>
      <ul>
           {getPages().map((page, index) => (
              <li key={index}>
                  <Link href={page.slug}>
                     {page.title}
                  </Link>
              </li>
          ))}
      </ul>
    </nav>
    );
}
Nav.Desktop = Desktop;

const Mobile = ({ clickHandler }) => {
    const navMobileClasses = cx({
        nav: true,
        nav__mobile: true
    });

    return (
      <nav className={navMobileClasses}>
      <ul>
           {getPages().map((page, index) => (
              <li key={index}>
                  <Link href={page.slug}>
                     {page.title}
                  </Link>
              </li>
          ))}
      </ul>
    </nav>
    );
}
Nav.Mobile = Mobile;
export default Nav;