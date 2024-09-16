import React from 'react';
import Link from 'next/link';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { agent } from '@/api/agent';
import { getSession } from '@/utils/userSession';

import './trailDetails.scss';
import NotFound from '../../not-found';
import CCommonModal from '@/components/common/CCommonModal/CCommonModal';
import CBackBtn from '@/components/common/CBackBtn/CBackBtn';
import Layout from '@/components/Layout/Layout';
import TrailDetailsSection from '@/components/TrailDetailsSection/TrailDetailsSection';
import TrailDetailsPhotosSection from '@/components/TrailDetailsPhotosSection/TrailDetailsPhotosSection';
import TrailDetailsMapSection from '@/components/TrailDetailsMapSection/TrailDetailsMapSection';
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
        ? await agent.apiTrails.getTrailById(trailId, token)
        : await agent.apiTrails.getTrailById(trailId);

    const trail = res.data;
    const isOwner = token ? trail?.createdBy?.id == userId : false;

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
                        <h1>{t('title', { trailName: `${trail.startPoint} - ${trail.endPoint}` })}</h1>

                        <details open className="trail-details__warning">
                            <summary>{t('important-notice')}:</summary>
                            {t('important-notice-text')}
                        </details>

                        <nav className="trail-details__nav" aria-label="details-page-navigation">
                            <ul>
                                {trail.images.length > 0 && <li><Link href="#photos">photos</Link></li>}
                                {trail.gpxUrl && <li><Link href="#map">map</Link></li>}
                                <li><Link href="#comments">comments</Link></li>
                            </ul>
                        </nav>
                        <TrailDetailsSection
                            trail={trail}
                            token={token}
                            isOwner={isOwner}
                        />

                        <span id="photos" />
                        {(trail.images.length > 0 || isOwner) && (
                            <TrailDetailsPhotosSection
                                trail={trail}
                                token={token}
                                isOwner={isOwner}
                            />
                        )}

                        <span id="map" />
                        {(trail.gpxUrl || isOwner) && (
                            <TrailDetailsMapSection
                                trail={trail}
                                token={token}
                                isOwner={isOwner}
                            />
                        )}

                        <span id="comments" />
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