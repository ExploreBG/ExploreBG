import React from 'react';
import type { Viewport } from 'next';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ProvideTheme from './theme-provider';

import '@/global-styles/main.scss';
import { mainFont, headingFont } from '@/global-styles/fonts';
import ScrollToTopBtn from '@/components/ScrollToTopBtn/ScrollToTopBtn';

interface RootLayoutProps {
    children: React.ReactNode;
    params: { locale: string };
}

export async function generateMetadata({
    params: { locale }
}: Omit<RootLayoutProps, 'children'>) {
    const t = await getTranslations({ locale, namespace: 'home' });

    return {
        applicationName: 'Explore BG',
        title: 'Explore BG',
        description: t('metadata.desc'),

        metadataBase: new URL(process.env.EXPLORE_BG_URL || `http://localhost:${process.env.PORT}`),
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
            url: process.env.EXPLORE_BG_URL || `http://localhost:${process.env.PORT}`,
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

export default function RootLayout({
    children,
    params
}: RootLayoutProps) {
    const locale = params?.locale;

    const messages = useMessages();

    return (
        <html lang={locale} className={`${mainFont.variable} ${headingFont.variable}`}>
            <body>
                <div className="container">
                    <ProvideTheme>
                        <NextIntlClientProvider locale={locale} messages={messages}>
                            {children}
                            <ScrollToTopBtn />
                        </NextIntlClientProvider>
                        <ToastContainer
                            position='top-right'
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss draggable pauseOnHover
                        />
                    </ProvideTheme>
                </div>
            </body>
        </html>
    );
}
