import React from 'react';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Link } from '@/navigation';

import { agent } from '@/api/agent';
import { IHikeCard } from '@/interfaces/interfaces';

import './hikes.scss';
import Layout from '@/components/Layout/Layout';
import HikeCard from '@/components/HikeCard/HikeCard';
import PaginationControls from '@/components/PaginationControls/PaginationControls';

interface HikesProps {
    params: { locale: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({
    params: { locale }
}: Omit<HikesProps, 'children'>) {
    const t = await getTranslations({ locale, namespace: 'hikes' });

    return {
        title: t('metadata.tab-name'),
    };
}

const Hikes: React.FC<HikesProps> = async ({ params: { locale }, searchParams }) => {
    unstable_setRequestLocale(locale);
    const t = await getTranslations('hikes');

    const page = searchParams['pageNumber'] ?? '1';
    const cardsPerPage = searchParams['pageSize'] ?? '6';
    const query = `?pageNumber=${page}&pageSize=${cardsPerPage}&sortBy=hikeDate&sortDir=ASC`;

    const hikes = await agent.apiHikes.getAllHikes(query);

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

                <PaginationControls
                    totalElements={hikes.totalElements}
                    cardsPerPage={Number(cardsPerPage)}
                    pathname={'/hikes/all'}
                    sortBy={'hikeDate'}
                    sortDir={'ASC'}
                />
            </main>
        </Layout>
    );
};

export default Hikes;