import React from 'react';
import { useTranslations } from 'next-intl';
import { FaRegCopyright } from 'react-icons/fa6';

import CLogo from '@/components/common/CLogo/CLogo';
import CBackBtn from '@/components/common/CBackBtn/CBackBtn';

interface NotFoundProps { }

const NotFound: React.FC<NotFoundProps> = () => {
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