'use client';

import React, { useState, useEffect } from 'react';

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