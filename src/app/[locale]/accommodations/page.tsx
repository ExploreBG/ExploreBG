import React from 'react';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
// import { Link } from '@/navigation';

import { DEFAULT_PAGE_NUMBER, DEFAULT_CARDS_PER_PAGE } from '@/utils/constants';
import { agent } from '@/api/agent';
import { IAccommodationCard } from '@/interfaces/interfaces';

import Layout from '@/components/Layout/Layout';
import AccommodationCard from '@/components/AccommodationCard/AccommodationCard';
import PaginationControls from '@/components/PaginationControls/PaginationControls';

interface AllAccommodationsProps {
    params: { locale: string };
    searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({
    params: { locale }
}: Omit<AllAccommodationsProps, 'children'>) {
    const t = await getTranslations({ locale, namespace: 'accommodations' });

    return {
        title: t('metadata.tab-name'),
    };
}

const AllAccommodations: React.FC<AllAccommodationsProps> = async ({
    params: { locale }, searchParams
}) => {
    unstable_setRequestLocale(locale);
    const t = await getTranslations('accommodations');

    const page = searchParams['pageNumber'] ?? DEFAULT_PAGE_NUMBER;
    const query = `?pageNumber=${page}&pageSize=${DEFAULT_CARDS_PER_PAGE}&sortBy=id&sortDir=DESC`;

    const accommodations = await agent.apiAccommodations.getAllAccommodations(query);

    return (
        <Layout>
            <main className="catalog-wrapper">
                <h1>{t('title')}</h1>

                {/* <Link href='/accommodations/create' className="catalog-wrapper__create-btn">
                    {t('create-btn')}
                </Link> */}

                <section className="catalog-wrapper__cards">
                    {accommodations.content.map((card: IAccommodationCard) => (
                        <article key={card.id} className="card">
                            <AccommodationCard card={card} />
                        </article>
                    ))}
                </section>

                <PaginationControls totalElements={accommodations.totalElements} />
            </main>
        </Layout>
    );
};

export default AllAccommodations;