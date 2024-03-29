import React from 'react';

import { IHikeCard } from '@/interfaces/interfaces';
import { agent } from '@/api/agent';

import HikeCard from '../HikeCard/HikeCard';
import IntersectionObserverComponent from '../IntersectionObserverComponent';

interface HomeHikesSectionProps { }

const HomeHikesSection: React.FC<HomeHikesSectionProps> = async () => {
    const hikes = await agent.apiHikes.get4RandomHikes();

    return (
        <>
            <section className={'home__section-wrapper home__section-cards hikes'}>
                <IntersectionObserverComponent />

                {hikes.map((hike: IHikeCard) => (
                    <article key={hike.id} className="card hidden">
                        <HikeCard card={hike} />
                    </article>
                ))}
            </section>
        </>
    );
};

export default HomeHikesSection;