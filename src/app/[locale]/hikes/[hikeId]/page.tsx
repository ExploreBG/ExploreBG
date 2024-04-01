import React from 'react';
import Image from 'next/image';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Link } from '@/navigation';
import { IoLocationOutline } from 'react-icons/io5';
import { BsCalendar2Date, BsHouseFill } from 'react-icons/bs';
import { GrMapLocation } from 'react-icons/gr';
import { GiPathDistance, GiMountainRoad, GiHiking } from 'react-icons/gi';
import { FaHandHoldingWater } from 'react-icons/fa';

import { agent } from '@/api/agent';
import { IHut } from '@/interfaces/interfaces';
import { formatDate } from '@/utils/utils';

import './hikeDetails.scss';
import Layout from '@/components/Layout/Layout';
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

                <section className="hike-details__owner-info">
                    <h3><IoLocationOutline /> {hike.location}</h3>

                    <article className="hike-details__owner-info__date-owner">
                        <p>
                            <BsCalendar2Date />&nbsp;&nbsp;
                            <time dateTime={hike.hikeDate}>{formattedHikeDate}</time>
                        </p>

                        {hike.owner && (
                            <>
                                <Link href={{
                                    pathname: '/users/[id]',
                                    params: { id: hike.owner.id }
                                }}>
                                    <Image
                                        src={hike.owner.imageUrl || '/images/user-profile-pic.png'}
                                        width={40} height={40} loading="eager"
                                        alt="User picture" title={hike.owner.username}
                                        priority={true}
                                    />
                                </Link>
                            </>
                        )}
                    </article>

                    <p className="hike-details__owner-info__info">{hike.hikeInfo}</p>
                </section>

                {hike.hikingTrail && (
                    <section className="hike-details__trail-info">
                        <div className="hike-details__trail-info__pair">
                            <details open>
                                <summary>From: <strong>{hike.hikingTrail.startPoint}</strong></summary>
                                <GrMapLocation />&nbsp; 018293794663487685
                            </details>
                            <details open>
                                <summary>To: <strong>{hike.hikingTrail.endPoint}</strong></summary>
                                <GrMapLocation />&nbsp; 018293794663487685
                            </details>
                        </div>

                        <div className="hike-details__trail-info__pair">
                            <p><GiPathDistance />&nbsp; distance: {hike.hikingTrail.totalDistance} km</p>
                            <p><GiMountainRoad />&nbsp; elevation: {hike.hikingTrail.elevationGained} m</p>
                        </div>

                        <div className="hike-details__trail-info__pair">
                            <p>visited in:&nbsp; {hike.hikingTrail.seasonVisited}</p>
                            <ul>suitable for:
                                <li><p>{hike.hikingTrail.activity}</p></li>
                                <li><p> ??? </p></li>
                            </ul>
                        </div>

                        <div className="hike-details__trail-info__pair">
                            <p>
                                <FaHandHoldingWater />&nbsp;
                                water sources: {hike.hikingTrail.waterAvailable ? 'Yes' : 'No'}
                            </p>
                            <p><GiHiking />&nbsp; difficulty: {hike.hikingTrail.trailDifficulty}</p>
                        </div>

                        <p className="hike-details__trail-info__info">{hike.hikingTrail.trailInfo}</p>

                        <aside className="hike-details__trail-info__huts">
                            <h4><BsHouseFill />&nbsp; Lodges in the area:</h4>

                            {hike.hikingTrail.availableHuts.map((h: IHut) => (
                                <Link key={h.id} href={{
                                    pathname: '/accommodations/[id]',
                                    params: { id: h.id }
                                }}>
                                    / {h.accommodationName} /
                                </Link>
                            ))}
                        </aside>
                    </section>
                )}

                {(hike.comments.length > 0 || hike.hikingTrail?.comments.length > 0) && (
                    <HikeCommentsSection hike={hike} trail={hike.hikingTrail} />
                )}
            </main>
        </Layout>
    );
};

export default HikeDetails;