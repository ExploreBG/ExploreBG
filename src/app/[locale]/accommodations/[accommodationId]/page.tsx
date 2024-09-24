import React from 'react';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { MdPhone } from 'react-icons/md';
import { FaBed } from 'react-icons/fa';
import { ImPriceTags, ImAccessibility } from 'react-icons/im';
import { GiKnifeFork } from 'react-icons/gi';

import { agent } from '@/api/agent';
import { IAccommodation } from '@/interfaces/interfaces';

import './accommodationDetails.scss';
import Layout from '@/components/Layout/Layout';
import RenderComments from '@/components/RenderComments/RenderComments';

interface AccommodationDetailsProps {
    params: { locale: string, accommodationId: string }
}

export async function generateMetadata({
    params: { locale }
}: Omit<AccommodationDetailsProps, 'children'>) {
    const t = await getTranslations({ locale, namespace: 'accommodation-details' });

    return {
        title: t('metadata.tab-name'),
    };
}

const AccommodationDetails: React.FC<AccommodationDetailsProps> = async ({ params: { accommodationId } }) => {
    // const t = await getTranslations('accommodation-details');

    const accommodation: IAccommodation = await agent.apiAccommodations.getAccommodationById(accommodationId);

    return (
        <Layout>
            <main className="accommodation-details">
                <h1>Accommodation details</h1>

                {!accommodation && (
                    <p>Resource not found!</p>
                )}

                {accommodation && (
                    <>
                        <section className="accommodation-details__info details-page-section">
                            <h3>{accommodation.accommodationName}</h3>
                            <p>{accommodation.type}</p>
                            <a href={accommodation.site} target="_blank"
                                className="accommodation-details__info__site"
                            >
                                {accommodation.site}
                            </a>

                            <div className="accommodation-details__info__pair">
                                {accommodation.phoneNumber
                                    ? <a href={`tel:${accommodation.phoneNumber}`}>
                                        <MdPhone />&nbsp; {accommodation.phoneNumber}
                                    </a>
                                    : <p><MdPhone />&nbsp; not available</p>
                                }

                                {accommodation.owner && (
                                    <>
                                        <Link href={{
                                            pathname: '/users/[userId]',
                                            params: { userId: accommodation.owner.id }
                                        }}>
                                            <Image
                                                src={accommodation.owner.imageUrl || '/images/user-profile-pic.png'}
                                                width={40} height={40} loading="eager"
                                                alt="User picture" title={accommodation.owner.username}
                                                priority={true}
                                            />
                                        </Link>
                                    </>
                                )}
                            </div>

                            <div className="accommodation-details__info__pair">
                                <p>
                                    <FaBed />&nbsp; Bed capacity: {accommodation.bedCapacity ?? 'not available'}
                                </p>

                                <p>
                                    <ImPriceTags />&nbsp; Price per bed: {accommodation.pricePerBed ?? 'not available'}
                                </p>
                            </div>

                            <div className="accommodation-details__info__pair">
                                <p>
                                    <GiKnifeFork />&nbsp; Food: {accommodation.foodAvailable ? 'Yes' : 'No'}
                                </p>

                                <p>
                                    <ImAccessibility />&nbsp; Accessibility: {accommodation.access ?? 'not available'}
                                </p>
                            </div>

                            <p>Next to: {accommodation.nextTo ?? 'not available'}</p>

                            <p className="accommodation-details__info__text">{accommodation.accommodationInfo}</p>
                        </section>

                        <figure className="accommodation-details__img">
                            <Image
                                src={accommodation.imageUrl}
                                width={300} height={300} loading="eager" alt={`${accommodation.accommodationName}'s photo`}
                                title={accommodation.accommodationName} priority={true}
                            />
                        </figure>

                        {accommodation.comments?.length > 0 && (
                            <section className="comments details-page-section">
                                <h3>comments:</h3>

                                <RenderComments comments={accommodation.comments} />
                            </section>
                        )}
                    </>
                )}
            </main>
        </Layout>
    );
};

export default AccommodationDetails;