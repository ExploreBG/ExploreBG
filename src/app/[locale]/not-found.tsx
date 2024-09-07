import React from 'react';
import { useTranslations } from 'next-intl';

import './not-found.scss';
import CLogo from '@/components/common/CLogo/CLogo';
import CBackBtn from '@/components/common/CBackBtn/CBackBtn';
import CSmallFooter from '@/components/common/CSmallFooter/CSmallFooter';

interface NotFoundProps { }

const NotFound: React.FC<NotFoundProps> = () => {
    const t = useTranslations('not-found');

    return (
        <main className="not-found">
            <header><CLogo /></header>

            <section>
                <h1>{t('title')}</h1>
                <p>{t('text')}</p>

                <CBackBtn />
            </section>

            <CSmallFooter />
        </main>
    );
};

export default NotFound;