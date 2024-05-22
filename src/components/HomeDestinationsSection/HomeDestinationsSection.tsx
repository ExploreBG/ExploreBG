import React from 'react';

import { IDestination } from '@/interfaces/interfaces';
import { agent } from '@/api/agent';

import DestinationCard from '../DestinationCard/DestinationCard';
import IntersectionObserverComponent from '../IntersectionObserverComponent';

interface HomeDestinationsSectionProps { }

const HomeDestinationsSection: React.FC<HomeDestinationsSectionProps> = async () => {
    const destinations = await agent.apiDestinations.get4RandomDestinations();

    return (
        <>
            <section className={'home__section-wrapper home__section-cards destinations'}>
                <IntersectionObserverComponent />

                {destinations.map((destination: IDestination) => (
                    <article key={destination.id} className="card hidden">
                        <DestinationCard card={destination} />
                    </article>
                ))}
            </section>
        </>
    );
};

export default HomeDestinationsSection;