import React from 'react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { agent } from '@/api/agent';
import { ITrail } from '@/interfaces/interfaces';
import { getSession } from '@/utils/userSession';

import './trailDetails.scss';
import NotFound from '../../not-found';
import Layout from '@/components/Layout/Layout';
import DeleteItem from '@/components/DeleteItem/DeleteItem';
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

const TrailDetails: React.FC<TrailDetailsProps> = async ({ params: { trailId } }) => {
    const t = await getTranslations('trail-details');

    const session = await getSession();
    const token = session?.token;
    const userId = session?.userId;

    let trail: ITrail;
    try {
        const res = token
            ? await agent.apiTrails.getTrailById(trailId, token)
            : await agent.apiTrails.getTrailById(trailId);

        trail = res?.data;
    } catch (err) {
        console.error('Error fetching trail: ', err);
        return <NotFound />;
    }

    const isOwner = token ? trail?.createdBy?.id == userId : false;

    if (!trail) {
        return <NotFound />;
    }

    return trail && (
        <Layout>
            <main className="trail-details">
                <h1>{t('title', { trailName: `${trail.startPoint} - ${trail.endPoint}` })}</h1>

                {!isOwner && (
                    <details open className="trail-details__warning">
                        <summary>{t('important-notice')}:</summary>
                        {t('important-notice-text')}
                    </details>
                )}

                <nav className="trail-details__nav" aria-label="trail-details-page-navigation">
                    {isOwner && (
                        <DeleteItem
                            deletionObj={t('delete-trail')}
                            itemType='trail'
                            itemId={trail.id}
                            token={token!}
                        />
                    )}

                    <ul>
                        {trail.images.length > 0 && <li><Link href="#photos">photos</Link></li>}
                        {trail.gpxFile?.gpxUrl && <li><Link href="#map">map</Link></li>}
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
                {(trail.gpxFile?.gpxUrl || isOwner) && (
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
    );
};

export default TrailDetails;