import classnames from 'classnames/bind';
import Link from 'next/link';
import { getPages } from '../../../lib/pages';
import styles from './Nav.module.scss';

const cx = classnames.bind(styles);

interface Page {
  slug: string;
  title: string;
}

interface MobileProps {
  clickHandler: () => void;
}

const Nav: React.FC & { Desktop: React.FC; Mobile: React.FC<MobileProps> } = () => {
  return (
    <nav>
      <ul>
        {getPages().map((page: Page, index: number) => (
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

const Desktop: React.FC = () => {
  const navDesktopClasses = cx({
    nav: true,
    nav__desktop: true
  });

  return (
    <nav className={navDesktopClasses}>
      <ul>
        {getPages().map((page: Page, index: number) => (
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

const Mobile: React.FC<MobileProps> = ({ clickHandler }) => {
  const navMobileClasses = cx({
    nav: true,
    nav__mobile: true
  });

  return (
    <nav className={navMobileClasses}>
      <ul>
        {getPages().map((page: Page, index: number) => (
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
Nav.Mobile = Mobile;

export default Nav;
