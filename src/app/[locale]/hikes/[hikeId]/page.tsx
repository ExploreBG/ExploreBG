import React from 'react';
import Image from 'next/image';
// import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { IoLocationOutline } from 'react-icons/io5';
import { BsCalendar2Date } from 'react-icons/bs';
import { GrMapLocation } from 'react-icons/gr';
import { GiPathDistance, GiMountainRoad } from 'react-icons/gi';

import { Link } from '@/navigation';
import { dummyHike } from '@/utils/utils';

import './hikeDetails.scss';
import Layout from '@/components/Layout/Layout';

interface HikeDetailsProps {
    params: { locale: string }
}

export async function generateMetadata({
    params: { locale }
}: Omit<HikeDetailsProps, 'children'>) {
    const t = await getTranslations({ locale, namespace: 'hike-details' });

    return {
        title: t('metadata.tab-name'),
    };
}

const HikeDetails: React.FC<HikeDetailsProps> = ({ params: { locale } }) => {
    unstable_setRequestLocale(locale);
    // const t = useTranslations('hike-details');

    return (
        <Layout>
            <main className="hike-details">
                <h1>Some title</h1>

                <section className="hike-details__owner-info">
                    <h3><IoLocationOutline /> {dummyHike.location}</h3>

                    <article className="hike-details__owner-info__date-owner">
                        <p>
                            <BsCalendar2Date />&nbsp;&nbsp;
                            <time dateTime={dummyHike.hikeDate}>{dummyHike.hikeDate}</time>
                        </p>

                        {/* @ts-ignore */}
                        <Link href={`/user/${dummyHike.owner.id}`}>
                            <Image
                                src={'/images/user-profile-pic.png'}
                                width={40} height={40} loading="eager"
                                alt="User picture" title={dummyHike.owner.username}
                                priority={true}
                            />
                        </Link>
                    </article>

                    <p className="hike-details__owner-info__info">{dummyHike.hikeInfo}</p>
                </section>

                <section className="hike-details__trail-info">
                    <div className="hike-details__trail-info__pair">
                        <details open>
                            <summary>From: <strong>Prava polyna</strong></summary>
                            <GrMapLocation />&nbsp; 018293794663487685
                        </details>
                        <details open>
                            <summary>To: <strong>Kriva polyna</strong></summary>
                            <GrMapLocation />&nbsp; 018293794663487685
                        </details>
                    </div>

                    <div className="hike-details__trail-info__pair">
                        <p><GiPathDistance />&nbsp; 35km</p>
                        <p><GiMountainRoad />&nbsp; elevation: 900m</p>
                    </div>

                    <div className="hike-details__trail-info__pair">
                        <p>season:&nbsp; Summer</p>
                        <ul>suitable for:
                            <li><p>hiking</p></li>
                            <li><p>mountain biking</p></li>
                        </ul>
                    </div>

                    <p className="hike-details__trail-info__info">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel ea dignissimos eligendi, est quas mollitia. Reprehenderit facere necessitatibus perspiciatis veritatis itaque praesentium voluptates eligendi ratione molestias delectus optio nemo quibusdam distinctio quia, dolorum minima dolorem eveniet cumque minus. Veritatis ex quo quod error accusamus adipisci dolorem magni. Amet repudiandae totam repellendus, iure aspernatur molestiae ea architecto aliquam quam facere perferendis minima voluptatum eveniet at necessitatibus ad suscipit. Quia, nemo sunt recusandae ex fugit, velit sint tempora ratione ipsa voluptatibus aliquid asperiores quo ullam est! Accusantium quaerat alias quidem nobis repudiandae voluptatibus rem tempore explicabo ipsa magni! Aspernatur sunt culpa vero tempora perspiciatis sequi consectetur, officia doloremque fugiat saepe earum officiis distinctio deserunt quos sint, explicabo iste similique repellendus error perferendis dicta laboriosam, praesentium non molestias. Velit quidem incidunt facere voluptas!</p>
                </section>

                <section className="hike-details__comments">
                    <article>comments: </article>
                </section>
            </main>
        </Layout>
    );
};

export default HikeDetails;