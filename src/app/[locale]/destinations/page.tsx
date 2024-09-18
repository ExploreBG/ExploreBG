import React from 'react';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
// import { Link } from '@/navigation';

import { DEFAULT_PAGE_NUMBER, DEFAULT_CARDS_PER_PAGE } from '@/utils/constants';
import { agent } from '@/api/agent';
import { IDestinationCard } from '@/interfaces/interfaces';

import Layout from '@/components/Layout/Layout';
import DestinationCard from '@/components/DestinationCard/DestinationCard';
import PaginationControls from '@/components/PaginationControls/PaginationControls';

interface AllDestinationsProps {
    params: { locale: string };
    searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({
    params: { locale }
}: Omit<AllDestinationsProps, 'children'>) {
    const t = await getTranslations({ locale, namespace: 'destinations' });

    return {
        title: t('metadata.tab-name'),
    };
}

const AllDestinations: React.FC<AllDestinationsProps> = async ({
    params: { locale }, searchParams
}) => {
    unstable_setRequestLocale(locale);
    const t = await getTranslations('destinations');

    const page = searchParams['pageNumber'] ?? DEFAULT_PAGE_NUMBER;
    const query = `?pageNumber=${page}&pageSize=${DEFAULT_CARDS_PER_PAGE}&sortBy=id&sortDir=DESC`;

    const destinations = await agent.apiDestinations.getAllDestinations(query);

    return (
        <Layout>
            <main className="catalog-wrapper">
                <h1>{t('title')}</h1>

                {/* <Link href='/destinations/create' className="catalog-wrapper__create-btn">
                    {t('create-btn')}
                </Link> */}

                <section className="catalog-wrapper__cards">
                    {destinations.content.map((card: IDestinationCard) => (
                        <article key={card.id} className="card">
                            <DestinationCard card={card} />
                        </article>
                    ))}
                </section>

                <PaginationControls totalElements={destinations.totalElements} />
            </main>
        </Layout>
    );
};

export default AllDestinations;