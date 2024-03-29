import React from 'react';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Link } from '@/navigation';

import { dummyHikeData } from '@/utils/utils';

import './hikes.scss';
import Layout from '@/components/Layout/Layout';
import HikeCard from '@/components/HikeCard/HikeCard';

interface HikesProps {
    params: { locale: string }
}

export async function generateMetadata({
    params: { locale }
}: Omit<HikesProps, 'children'>) {
    const t = await getTranslations({ locale, namespace: 'hikes' });

    return {
        title: t('metadata.tab-name'),
    };
}

const Hikes: React.FC<HikesProps> = ({ params: { locale } }) => {
    unstable_setRequestLocale(locale);
    const t = useTranslations('hikes');

    return (
        <Layout>
            <main className="catalog-wrapper hikes-wrapper">
                {dummyHikeData.length > 0 && <h1>{t('title')}</h1>}

                {dummyHikeData.length == 0 && (
                    <p className="hikes-wrapper__empty-page">{t('empty-page')}</p>
                )}

                <Link href={'/hikes/create'} className="catalog-wrapper__create-btn">{t('create-btn')}</Link>

                {dummyHikeData.length > 0 && (
                    <section className="catalog-wrapper__cards">
                        {dummyHikeData.map((card) => (
                            <article key={card.id} className="card">
                                <HikeCard card={card} />
                            </article>
                        ))}
                    </section>
                )}
            </main>
        </Layout>
    );
};

export default Hikes;