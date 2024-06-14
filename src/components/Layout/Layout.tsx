import React from 'react';

import Header from '../header/Header';
import Footer from '../footer/Footer';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Header />

            {children}

            <Footer />
        </>
    );
};

export default Layout;