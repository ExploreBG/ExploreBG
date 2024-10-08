import React from 'react';
import { getTranslations } from 'next-intl/server';
// import { Link } from '@/i18n/routing';

import { DEFAULT_PAGE_NUMBER, DEFAULT_CARDS_PER_PAGE, HIKES_SORT_BY, SORT_DIR_ASC } from '@/utils/constants';
import { agent } from '@/api/agent';
import { IHikeCard } from '@/interfaces/interfaces';

import './hikes.scss';
import NotFound from '../not-found';
import Layout from '@/components/Layout/Layout';
import HikeCard from '@/components/HikeCard/HikeCard';
import PaginationControls from '@/components/PaginationControls/PaginationControls';

interface HikesProps {
    params: { locale: string };
    searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({
    params: { locale }
}: Omit<HikesProps, 'children'>) {
    const t = await getTranslations({ locale, namespace: 'hikes' });

    return {
        title: t('metadata.tab-name'),
    };
}

const Hikes: React.FC<HikesProps> = async ({ searchParams }) => {
    const t = await getTranslations('hikes');

    const page = searchParams['pageNumber'] ?? DEFAULT_PAGE_NUMBER;
    const query = `?pageNumber=${page}&pageSize=${DEFAULT_CARDS_PER_PAGE}&sortBy=${HIKES_SORT_BY}&sortDir=${SORT_DIR_ASC}`;

    const hikes = await agent.apiHikes.getAllHikes(query);

    if (hikes.message) {
        return <NotFound />;
    }

    return (
        <Layout>
            <main className="catalog-wrapper hikes-wrapper">
                {!hikes && <p style={{ marginBottom: '5rem' }}>Resources not found!</p>}

                {hikes?.content?.length > 0 && <h1>{t('title')}</h1>}

                {hikes?.content?.length == 0 && (
                    <p className="hikes-wrapper__empty-page">{t('empty-page')}</p>
                )}

                {/* <Link href={'/hikes/create'} className="catalog-wrapper__create-btn">
                    {t('create-btn')}
                </Link> */}

                {hikes?.content?.length > 0 && (
                    <section className="catalog-wrapper__cards">
                        {hikes?.content?.map((card: IHikeCard) => (
                            <article key={card.id} className="card">
                                <HikeCard card={card} />
                            </article>
                        ))}
                    </section>
                )}

                <PaginationControls
                    totalElements={hikes?.totalElements}
                    sortByProp={HIKES_SORT_BY}
                    sortDirProp={SORT_DIR_ASC}
                />
            </main>
        </Layout>
    );
};

export default Hikes;