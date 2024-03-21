import React from 'react';
import type { Viewport } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

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

export async function generateMetadata({
    params: { locale }
}: Omit<RootLayoutProps, 'children'>) {
    const t = await getTranslations({ locale, namespace: 'home' });

    return {
        applicationName: 'Explore BG',
        title: 'Explore BG',
        description: t('metadata.desc'),

        metadataBase: new URL(process.env.APP_URL || `http://localhost:${process.env.PORT}`),
        alternates: {
            canonical: `/${locale}`,
            languages: {
                'en': '/en',
                'bg': '/bg',
            },
        },
        openGraph: {
            title: 'Explore BG',
            description: t('metadata.desc'),
            url: process.env.APP_URL || `http://localhost:${process.env.PORT}`,
            siteName: 'Explore BG',
            images: [
                {
                    url: 'http://localhost:3000/images/screenshot.png', // Must be an absolute URL
                    width: 1915,
                    height: 916,
                    alt: 'Explore BG - main page'
                },
            ],
            locale: `${locale}`,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Explore BG',
            description: t('metadata.desc'),
            images: ['http://localhost:3000/images/screenshot.png'],    // Must be an absolute URL
        },
        robots: {
            index: true,
            follow: true,
            nocache: true,
            googleBot: {
                index: true,
                follow: true,
                noimageindex: false,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        icons: {
            icon: '/favicon.ico',
            shortcut: '/favicon.ico',
            apple: '/waterBrushIcon/apple-touch-icon.png',
        },
    };
}

export function generateViewport(): Viewport {
    return {
        themeColor: '#F5F5F5',
    };
}

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
