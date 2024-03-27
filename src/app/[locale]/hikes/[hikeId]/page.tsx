import React from 'react';
import Image from 'next/image';
// import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { IoLocationOutline } from 'react-icons/io5';
import { BsCalendar2Date } from 'react-icons/bs';

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
                    <p>Trail info</p>
                </section>

                <section className="hike-details__comments">
                    <article>comments: </article>
                </section>
            </main>
        </Layout>
    );
};

export default HikeDetails;