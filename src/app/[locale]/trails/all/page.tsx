import React from 'react';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Link } from '@/navigation';

import { agent } from '@/api/agent';
import { ITrailCard } from '@/interfaces/interfaces';

import Layout from '@/components/Layout/Layout';
import TrailCard from '@/components/TrailCard/TrailCard';
import PaginationControls from '@/components/PaginationControls/PaginationControls';

interface AllTrailsProps {
    params: { locale: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({
    params: { locale }
}: Omit<AllTrailsProps, 'children'>) {
    const t = await getTranslations({ locale, namespace: 'trails' });

    return {
        title: t('metadata.tab-name'),
    };
}

const AllTrails: React.FC<AllTrailsProps> = async ({ params: { locale }, searchParams }) => {
    unstable_setRequestLocale(locale);
    const t = await getTranslations('trails');

    const page = searchParams['pageNumber'] ?? '1';
    const cardsPerPage = searchParams['pageSize'] ?? '6';
    const query = `?pageNumber=${page}&pageSize=${cardsPerPage}&sortBy=id&sortDir=DESC`;

    const trails = await agent.apiTrails.getAllTrails(query);

    return (
        <Layout>
            <main className="catalog-wrapper">
                <h1>{t('title')}</h1>

                <Link href='/trails/all' className="catalog-wrapper__create-btn">{t('create-btn')}</Link>

                <section className="catalog-wrapper__cards">
                    {trails.content.map((card: ITrailCard) => (
                        <article key={card.id} className="card">
                            <TrailCard card={card} />
                        </article>
                    ))}
                </section>

                <PaginationControls
                    totalElements={trails.totalElements}
                    cardsPerPage={Number(cardsPerPage)}
                    pathname={'/trails/all'}
                    sortBy={'id'}
                    sortDir={'DESC'}
                />
            </main>
        </Layout>
    );
};

export default AllTrails;