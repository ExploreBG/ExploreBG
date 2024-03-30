import React from 'react';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Link } from '@/navigation';

import { agent } from '@/api/agent';
import { IHikeCard } from '@/interfaces/interfaces';

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

const Hikes: React.FC<HikesProps> = async ({ params: { locale } }) => {
    unstable_setRequestLocale(locale);
    const t = await getTranslations('hikes');

    const hikes = await agent.apiHikes.getAllHikes();

    return (
        <Layout>
            <main className="catalog-wrapper hikes-wrapper">
                {hikes.content.length > 0 && <h1>{t('title')}</h1>}

                {hikes.content.length == 0 && (
                    <p className="hikes-wrapper__empty-page">{t('empty-page')}</p>
                )}

                <Link href={'/hikes/create'} className="catalog-wrapper__create-btn">{t('create-btn')}</Link>

                {hikes.content.length > 0 && (
                    <section className="catalog-wrapper__cards">
                        {hikes.content.map((card: IHikeCard) => (
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