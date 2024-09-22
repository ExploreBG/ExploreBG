import React from 'react';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import './FAQ.scss';
import Layout from '@/components/Layout/Layout';
import QA from '@/components/QA/QA';

interface FAQProps {
    params: { locale: string }
}

export async function generateMetadata({
    params: { locale }
}: Omit<FAQProps, 'children'>) {
    const t = await getTranslations({ locale, namespace: 'faq' });

    return {
        title: t('metadata.tab-name'),
    };
}

const FAQ: React.FC<FAQProps> = () => {
    //   SSG ?
    // unstable_setRequestLocale(locale);

    const t = useTranslations('faq');

    const questionsData = [
        {
            id: 1,
            question: t('1.question'),
            answer: t('1.answer')
        },
        {
            id: 2,
            question: t('2.question'),
            answer: t('2.answer')
        }
    ];

    return (
        <Layout>
            <main className="faq">
                <section className="faq__qa">
                    <section className="faq__qa__top">
                        <h3>{t('titles.h3-first')}</h3>
                        <h3>{t('titles.h3-second')}</h3>
                    </section>

                    <h1>{t('titles.h1')}</h1>

                    <QA questionsData={questionsData} />
                </section>
            </main>
        </Layout>
    );
};

export default FAQ;