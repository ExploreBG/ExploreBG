import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { BsMoonStarsFill } from 'react-icons/bs';
import { GiSun } from 'react-icons/gi';

interface SwitchThemeProps { }

const SwitchTheme: React.FC<SwitchThemeProps> = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState<boolean>(false);
    const [isHoveredThemeIcon, setIsHoveredThemeIcon] = useState<boolean>(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return null;
    }

    return (
        <span
            onMouseEnter={() => setIsHoveredThemeIcon(true)}
            onMouseLeave={() => setIsHoveredThemeIcon(false)}
            onClick={() => setTheme(theme == 'light' ? 'dark' : 'light')}
            className="header__nav__theme-lang__theme"
        >
            {theme == 'light' && <BsMoonStarsFill className={isHoveredThemeIcon ? 'header__nav__theme-lang__theme__moon' : ''} />}
            {theme == 'dark' && <GiSun className={isHoveredThemeIcon ? 'header__nav__theme-lang__theme__sun' : ''} />}
        </span>
    );
};

export default SwitchTheme;