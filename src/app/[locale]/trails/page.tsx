import React from 'react';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Link } from '@/navigation';

import { DEFAULT_PAGE_NUMBER, DEFAULT_CARDS_PER_PAGE, DEFAULT_SORT_BY, SORT_DIR_DESC } from '@/utils/constants';
import { getSession } from '@/utils/userSession';
import { agent } from '@/api/agent';

import Layout from '@/components/Layout/Layout';
import AllTrailsClient from '@/components/AllTrailsClient/AllTrailsClient';

interface AllTrailsProps {
    params: { locale: string };
}

export async function generateMetadata({
    params: { locale }
}: Omit<AllTrailsProps, 'children'>) {
    const t = await getTranslations({ locale, namespace: 'trails' });

    return {
        title: t('metadata.tab-name'),
    };
}

const AllTrails: React.FC<AllTrailsProps> = async ({ params: { locale } }) => {
    unstable_setRequestLocale(locale);
    const t = await getTranslations('trails');

    const query = `?pageNumber=${DEFAULT_PAGE_NUMBER}&pageSize=${DEFAULT_CARDS_PER_PAGE}&sortBy=${DEFAULT_SORT_BY}&sortDir=${SORT_DIR_DESC}`;

    const session = await getSession();
    const token = session?.token;

    const res = token
        ? await agent.apiTrails.getAllTrails(query, token)
        : await agent.apiTrails.getAllTrails(query);

    const trails = res.data;

    return (
        <Layout>
            <main className="catalog-wrapper">
                <h1>{t('title')}</h1>

                <Link href='/trails/create' className="catalog-wrapper__create-btn">
                    {t('create-btn')}
                </Link>

                {trails && (
                    <AllTrailsClient
                        trails={trails.content}
                        totalElements={trails.totalElements}
                        token={token}
                    />
                )}
            </main>
        </Layout>
    );
};

export default AllTrails;