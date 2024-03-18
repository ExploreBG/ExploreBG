'use client';

import React, { ReactNode, useState, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';

interface ProvideThemeProps {
    children: ReactNode
}

const ProvideTheme: React.FC<ProvideThemeProps> = ({ children }) => {
    const [mounted, setMounted] = useState<boolean>(false);
    
    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <ThemeProvider defaultTheme='light'>
            {children}
        </ThemeProvider>
    );
};

export default ProvideTheme;