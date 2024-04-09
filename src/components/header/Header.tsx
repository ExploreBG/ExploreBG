'use client';

import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

import './header.scss';
import CLogo from '../common/CLogo/CLogo';
import CHeaderLinksAndButtons from '../common/CHeaderLinksAndButtons/CHeaderLinksAndButtons';
import SwitchTheme from '../SwitchTheme';
import LocaleSwitcher from '../LocaleSwitcher/LocaleSwitcher';

interface HeaderProps {
    t: any
}

const Header: React.FC<HeaderProps> = ({ t }) => {
    const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
    const [isHeaderVisible, setIsHeaderVisible] = useState<boolean>(true);
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

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
            <CLogo />

            <article className="header__nav">
                <FaSearch onClick={() => setIsSearchOpen(!isSearchOpen)} />
                {isSearchOpen && (
                    <section className="header__nav__search">
                        <p>Search</p>
                    </section>
                )}

                <CHeaderLinksAndButtons t={t} />

                <aside className="header__nav__theme-lang">
                    <SwitchTheme />

                    <LocaleSwitcher />
                </aside>
            </article>
        </header>
    );
};

export default Header;