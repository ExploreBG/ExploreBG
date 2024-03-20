import React from 'react';
import type { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';

import ProvideTheme from './theme-provider';
import { locales } from '@/config';

import '@/global-styles/main.scss';
import { mainFont, headingFont } from '@/global-styles/fonts';
import HeaderWrapper from '@/components/HeaderWrapper/HeaderWrapper';
import Footer from '@/components/footer/Footer';

interface RootLayoutProps {
    children: React.ReactNode;
    params: { locale: string };
    includeHeaderAndFooter?: boolean;
}

export const metadata: Metadata = {
    title: 'Explore BG',
    description: 'Generated by create next app',
};

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export default function RootLayout({
    children,
    params,
    includeHeaderAndFooter = true
}: RootLayoutProps) {
    const locale = params?.locale;
    
    // Enable static rendering
    unstable_setRequestLocale(locale);

    return (
        <html lang={locale} className={`${mainFont.variable} ${headingFont.variable}`}>
            <body>
                <div className="container">
                    <ProvideTheme>
                        {includeHeaderAndFooter && <HeaderWrapper />}

                        {children}

                        {includeHeaderAndFooter && <Footer />}
                    </ProvideTheme>
                </div>
            </body>
        </html>
    );
}
