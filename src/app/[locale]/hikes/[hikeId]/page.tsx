import React from 'react';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { IoLocationOutline } from 'react-icons/io5';
import { BsCalendar2Date } from 'react-icons/bs';

import { agent } from '@/api/agent';
import { formatDate } from '@/utils/utils';

import './hikeDetails.scss';
import Layout from '@/components/Layout/Layout';
import CMemberImage from '@/components/common/CMemberImage/CMemberImage';
import TrailDetailsSection from '@/components/TrailDetailsSection/TrailDetailsSection';
import HikeCommentsSection from '@/components/HikeCommentsSection/HikeCommentsSection';

interface HikeDetailsProps {
    params: { locale: string, hikeId: string }
}

export async function generateMetadata({
    params: { locale }
}: Omit<HikeDetailsProps, 'children'>) {
    const t = await getTranslations({ locale, namespace: 'hike-details' });

    return {
        title: t('metadata.tab-name'),
    };
}

const HikeDetails: React.FC<HikeDetailsProps> = async ({ params: { locale, hikeId } }) => {
    unstable_setRequestLocale(locale);
    // const t = await getTranslations('hike-details');

    const hike = await agent.apiHikes.getHikeById(hikeId);
    const formattedHikeDate = formatDate(hike.hikeDate);

    return (
        <Layout>
            <main className="hike-details">
                <h1>Hike details</h1>

                <section className="hike-details__info details-page-section">
                    <h3><IoLocationOutline /> {hike.hikeName}</h3>

                    <article className="hike-details__info__date-owner">
                        <p>
                            <BsCalendar2Date />&nbsp;&nbsp;
                            <time dateTime={hike.hikeDate}>{formattedHikeDate}</time>
                        </p>

                        {hike.owner && (
                            <CMemberImage
                                ownerId={hike.owner.id}
                                imageUrl={hike.owner.imageUrl}
                                username={hike.owner.username}
                            />
                        )}
                    </article>

                    <p className="hike-details__info__text">{hike.hikeInfo}</p>
                </section>

                {hike.hikingTrail && (
                    <TrailDetailsSection trail={hike.hikingTrail} />
                )}

                {(hike.comments.length > 0 || hike.hikingTrail?.comments.length > 0) && (
                    <HikeCommentsSection hike={hike} trail={hike.hikingTrail} />
                )}
            </main>
        </Layout>
    );
};

export default HikeDetails;