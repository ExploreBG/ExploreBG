import React from 'react';

import { ITrailCard } from '@/interfaces/interfaces';
import { agent } from '@/api/agent';

import TrailCard from '../TrailCard/TrailCard';
import IntersectionObserverComponent from '../IntersectionObserverComponent';

interface HomeTrailsSectionProps { }

const HomeTrailsSection: React.FC<HomeTrailsSectionProps> = async () => {
    const res = await agent.apiTrails.get4RandomTrails();

    return (
        <>
            <section className={'home__section-wrapper home__section-cards trails'}>
                <IntersectionObserverComponent />

                {res.data.map((trail: ITrailCard) => (
                    <article key={trail.id} className="card hidden">
                        <TrailCard card={trail} />
                    </article>
                ))}
            </section>
        </>
    );
};

export default HomeTrailsSection;