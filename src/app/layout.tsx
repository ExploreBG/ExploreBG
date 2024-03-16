import React from 'react';
import type { Metadata } from 'next';

import ProvideTheme from './theme-provider';

import '../global-styles/main.scss';
import { mainFont, headingFont } from '../global-styles/fonts';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';

export const metadata: Metadata = {
    title: 'Explore BG',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
    includeHeaderAndFooter = true
}: Readonly<{
    children: React.ReactNode;
    includeHeaderAndFooter?: boolean;
}>) {
    return (
        <html lang="en" className={`${mainFont.variable} ${headingFont.variable}`}>
            <body>
                <div className="container">
                    <ProvideTheme>
                        {includeHeaderAndFooter && <Header />}

                        {children}

                        {includeHeaderAndFooter && <Footer />}
                    </ProvideTheme>
                </div>
            </body>
        </html>
    );
}
