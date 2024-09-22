import React from 'react';
import { useTranslations } from 'next-intl';

import { IHikeCard } from '@/interfaces/interfaces';
import { agent } from '@/api/agent';
import { Link } from '@/navigation';

import HikeCard from '../HikeCard/HikeCard';
import IntersectionObserverComponent from '../IntersectionObserverComponent';

interface HomeHikesSectionProps { }

const HomeHikesSection: React.FC<HomeHikesSectionProps> = async () => {
    const t = useTranslations('home');

    const hikes = await agent.apiHikes.get4RandomHikes();

    return hikes && (
        <>
            <h2 className="home__section-title">{t('section-hikes.title')}</h2>

            <section className={'home__section-wrapper home__section-cards hikes'}>
                <IntersectionObserverComponent />

                {hikes.map((hike: IHikeCard) => (
                    <article key={hike.id} className="card hidden">
                        <HikeCard card={hike} />
                    </article>
                ))}
            </section>

            <aside className="home__section-links">
                <Link href={'/hikes'} prefetch={false}>
                    {t('section-hikes.btn-view-all')}
                </Link>
                {/* <Link href={'/hikes/create'} prefetch={false}>
                        {t('section-hikes.btn-create')}
                </Link> */}
            </aside>

            <section className="home__section-buffer"></section>
        </>
    );
};

export default HomeHikesSection;