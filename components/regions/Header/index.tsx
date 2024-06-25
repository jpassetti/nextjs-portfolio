"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { usePathname, useSearchParams } from 'next/navigation'

// next components
import Link from 'next/link';
import Image from 'next/image';

// custom
import Button from '../../html/Button';
import Col from '../../layout/Col';
import Container from '../../layout/Container';
import Nav from '../Nav';
import Overlay from '../../layout/Overlay';
import Row from '../../layout/Row';

// styles
import styles from './header.module.scss';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const url = `${pathname}`
        //console.log(url)
        // You can now use the current URL
        // ...
      }, [pathname])
    

    return (
        <header className={styles.header}>
            {menuOpen && (
                <Overlay>
                    <Button.UI icon="times" clickHandler={() => {
                        setMenuOpen(false);
                    }} />

                    <Nav.Mobile clickHandler={() => {
                        setMenuOpen(false);
                    }} />
                </Overlay>
            )}
            <Link href="/">
                <Image
                src="/branding/jeff-passetti-wordmark.svg"
                alt="Jeff Passetti"
                width={655.7}
                height={131.7}
                className={styles.wordmark}
                />
            </Link>
            <Nav.Desktop />
            <Button.UI icon="bars" clickHandler={() => {
                setMenuOpen(true);
            }} />
        </header>
    );
}
export default Header;