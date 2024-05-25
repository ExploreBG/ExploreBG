import React from 'react';
import Image from 'next/image';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { GrMapLocation } from 'react-icons/gr';
import { FaPersonWalkingDashedLineArrowRight } from 'react-icons/fa6';

import { agent } from '@/api/agent';
import { IDestination } from '@/interfaces/interfaces';
import { renderComments } from '@/utils/util';

import './destinationDetails.scss';
import Layout from '@/components/Layout/Layout';

interface DestinationDetailsProps {
    params: { locale: string, destinationId: string }
}

export async function generateMetadata({
    params: { locale }
}: Omit<DestinationDetailsProps, 'children'>) {
    const t = await getTranslations({ locale, namespace: 'destination-details' });

    return {
        title: t('metadata.tab-name'),
    };
}

const DestinationDetails: React.FC<DestinationDetailsProps> = async ({ params: { locale, destinationId } }) => {
    unstable_setRequestLocale(locale);
    // const t = await getTranslations('destination-details');

    const destination: IDestination = await agent.apiDestinations.getDestinationById(destinationId);

    return (
        <Layout>
            <main className="destination-details">
                <h1>Destination details</h1>

                <section className="destination-details__info details-page-section">
                    <h3>{destination.destinationName}</h3>
                    <p className="destination-details__info__type">{destination.type}</p>
                    <p className="destination-details__info__location"><GrMapLocation /> {destination.location}</p>

                    <p><FaPersonWalkingDashedLineArrowRight /> Close to: {destination.nextTo ?? 'not available'}</p>

                    <p className="destination-details__info__text">{destination.destinationInfo}</p>
                </section>

                <figure className="destination-details__img">
                    <Image
                        src={destination.imageUrl}
                        width={300} height={300} loading="eager" alt={`${destination.destinationName} - photo`}
                        title={destination.destinationName} priority={true}
                    />
                </figure>

                {destination.comments.length > 0 && (
                    <section className="comments details-page-section">
                        <h3>comments:</h3>

                        {renderComments(destination.comments)}
                    </section>
                )}
            </main>
        </Layout>
    );
};

export default DestinationDetails;