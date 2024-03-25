import React from 'react';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { FaRegCopyright } from 'react-icons/fa6';

import CLogo from '@/components/common/CLogo/CLogo';
import CBackBtn from '@/components/common/CBackBtn/CBackBtn';

interface NotFoundProps {
    params: { locale: string }
}

const NotFound: React.FC<NotFoundProps> = ({ params }) => {
    const locale = params?.locale;
    unstable_setRequestLocale(locale);

    const t = useTranslations('not-found');

    return (
        <main className="not-found">
            <header><CLogo /></header>

            <section>
                <h1>{t('title')}</h1>
                <p>{t('text')}</p>
                
                <CBackBtn btn={t('btn')} />
            </section>

            <footer><FaRegCopyright /> {new Date().getFullYear()} Explore BG</footer>
        </main>
    );
};

export default NotFound;