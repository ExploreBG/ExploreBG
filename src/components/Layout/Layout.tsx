import React from 'react';

import HeaderWrapper from '../HeaderWrapper/HeaderWrapper';
import Footer from '../footer/Footer';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <HeaderWrapper />

            {children}

            <Footer />
        </>
    );
};

export default Layout;