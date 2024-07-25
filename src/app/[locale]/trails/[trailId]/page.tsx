import React from 'react';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { agent } from '@/api/agent';
import { getSession } from '@/utils/userSession';

import './trailDetails.scss';
import Layout from '@/components/Layout/Layout';
import TrailDetailsSection from '@/components/TrailDetailsSection/TrailDetailsSection';
import TrailComments from '@/components/TrailComments/TrailComments';

interface TrailDetailsProps {
    params: { locale: string, trailId: string }
}

export async function generateMetadata({
    params: { locale }
}: Omit<TrailDetailsProps, 'children'>) {
    const t = await getTranslations({ locale, namespace: 'trail-details' });

    return {
        title: t('metadata.tab-name'),
    };
}

const TrailDetails: React.FC<TrailDetailsProps> = async ({ params: { locale, trailId } }) => {
    unstable_setRequestLocale(locale);
    const t = await getTranslations('trail-details');

    const trail = await agent.apiTrails.getTrailById(trailId);
    const session = await getSession();
    // @ts-expect-error
    const token = session?.userData.token;
    // @ts-expect-error
    const userId = session?.userData.userId;

    return (
        <Layout>
            <main className="trail-details">
                <h1>{t('title')}</h1>

                <TrailDetailsSection trail={trail} userId={userId} token={token} />

                <TrailComments
                    initialComments={trail.comments}
                    userId={userId}
                    trailId={trailId}
                    token={token}
                />
            </main>
        </Layout>
    );
};

export default TrailDetails;