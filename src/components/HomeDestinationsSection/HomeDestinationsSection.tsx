import React from 'react';
import { useTranslations } from 'next-intl';

import { IDestinationCard } from '@/interfaces/interfaces';
import { agent } from '@/api/agent';

import DestinationCard from '../DestinationCard/DestinationCard';
import IntersectionObserverComponent from '../IntersectionObserverComponent';
import CPhotoInfo from '../common/CPhotoInfo/CPhotoInfo';

interface HomeDestinationsSectionProps { }

const HomeDestinationsSection: React.FC<HomeDestinationsSectionProps> = async () => {
    const t = useTranslations('home');

    const destinations = await agent.apiDestinations.get4RandomDestinations();

    return (
        <>
            <section className={'home__section-wrapper home__section-cards destinations'}>
                <IntersectionObserverComponent />

                {destinations.map((destination: IDestinationCard) => (
                    <article key={destination.id} className="card hidden">
                        <DestinationCard card={destination} />
                    </article>
                ))}

                <CPhotoInfo imgInfo={t('section-destinations.backgr-img-info')} />
            </section>
        </>
    );
};

export default HomeDestinationsSection;