'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsMoonStarsFill } from 'react-icons/bs';
import { GiSun } from 'react-icons/gi';

import './header.scss';
import CHeaderLinksAndButtons from '../common/CHeaderLinksAndButtons/CHeaderLinksAndButtons';

interface HeaderProps { }

const Header: React.FC<HeaderProps> = () => {
    const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
    const [isHeaderVisible, setIsHeaderVisible] = useState<boolean>(true);
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
    const [isHoveredThemeIcon, setIsHoveredThemeIcon] = useState<boolean>(false);
    const [isBGlang, setIsBGlang] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            const isVisible = prevScrollPos > currentScrollPos || currentScrollPos < 10;

            setPrevScrollPos(currentScrollPos);
            setIsHeaderVisible(isVisible);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos]);

    return (
        <header className="header" style={{ display: isHeaderVisible ? 'flex' : 'none' }}>
            <Link href={'/'}>
                <figure className="header__logo">
                    <figcaption>Explore BG</figcaption>
                    <Image
                        src="/logo.png"
                        width={40} height={40} loading="eager"
                        alt="logo" title="Logo" priority={true}
                    />
                </figure>
            </Link>

            <article className="header__nav">
                <CHeaderLinksAndButtons />

                <aside className="header__nav__theme-lang">
                    <span
                        onMouseEnter={() => setIsHoveredThemeIcon(true)}
                        onMouseLeave={() => setIsHoveredThemeIcon(false)}
                        onClick={() => setIsDarkTheme(state => !state)}
                        className="header__nav__theme-lang__theme"
                    >       
                        {!isDarkTheme && <BsMoonStarsFill className={isHoveredThemeIcon ? 'header__nav__theme-lang__theme__moon' : ''} />}
                        {isDarkTheme && <GiSun className={isHoveredThemeIcon ? 'header__nav__theme-lang__theme__sun' : ''} />}
                    </span>

                    <span
                        onClick={() => setIsBGlang(state => !state)}
                        className="header__nav__theme-lang__lang"
                    >
                        {isBGlang ? 'EN' : 'BG'}
                    </span>
                </aside>
            </article>
        </header>
    );
};

export default Header;