import React from 'react';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { agent } from '@/api/agent';
import { renderComments } from '@/utils/util';

import './trailDetails.scss';
import Layout from '@/components/Layout/Layout';
import TrailDetailsSection from '@/components/TrailDetailsSection/TrailDetailsSection';

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
    // const t = await getTranslations('trail-details');

    const trail = await agent.apiTrails.getTrailById(trailId);

    return (
        <Layout>
            <main className="trail-details">
                <h1>Trail details</h1>

                <TrailDetailsSection trail={trail} />

                <section className="comments details-page-section">
                    <h3>comments:</h3>

                    {trail.comments.length > 0 && renderComments(trail.comments)}
                </section>
            </main>
        </Layout>
    );
};

export default TrailDetails;