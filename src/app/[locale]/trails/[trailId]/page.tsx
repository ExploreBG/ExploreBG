import React from 'react';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { agent } from '@/api/agent';
import { getSession } from '@/utils/userSession';

import './trailDetails.scss';
import NotFound from '../../not-found';
import CCommonModal from '@/components/common/CCommonModal/CCommonModal';
import CBackBtn from '@/components/common/CBackBtn/CBackBtn';
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

    const session = await getSession();
    const token = session?.token;
    const userId = session?.userId;

    const res = token
        ? await agent.apiTrails.getTrailByIdFromAuthUser(trailId, token)
        : await agent.apiTrails.getTrailById(trailId);

    const trail = res.data;

    if (res.message) {
        console.log(res.message);
    }

    return (
        <>
            {!trail && (
                <NotFound />
            )}

            {(trail && trail.trailStatus == 'review') && (
                <CCommonModal>
                    <p>{t('in-review')}</p>
                    <CBackBtn />
                </CCommonModal>
            )}

            {trail && (
                <Layout>
                    <main className="trail-details">
                        <h1>{t('title')}</h1>

                        <TrailDetailsSection
                            trail={trail}
                            userId={userId}
                            token={token}
                        />

                        <TrailComments
                            trail={trail}
                            userId={userId}
                            trailId={trailId}
                            token={token}
                        />
                    </main>
                </Layout>
            )}
        </>
    );
};

export default TrailDetails;