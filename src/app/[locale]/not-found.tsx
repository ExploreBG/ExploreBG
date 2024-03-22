import React from 'react';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { FaRegCopyright } from 'react-icons/fa6';

import { Link } from '@/navigation';
import CLogo from '@/components/common/CLogo/CLogo';

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
                <Link href={'/'}>{t('btn')}</Link>
            </section>

            <footer><FaRegCopyright /> {new Date().getFullYear()} Explore BG</footer>
        </main>
    );
};

export default NotFound;