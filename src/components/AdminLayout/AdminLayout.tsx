import React from 'react';

import Header from '../header/Header';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    return (
        <>
            <Header />

            {children}
        </>
    );
};

export default AdminLayout;