import React from 'react';
import { useTranslations } from 'next-intl';

import { ITrailCard } from '@/interfaces/interfaces';
import { getSession } from '@/utils/userSession';
import { agent } from '@/api/agent';
import { Link } from '@/navigation';

import TrailCard from '../TrailCard/TrailCard';
import IntersectionObserverComponent from '../IntersectionObserverComponent';

interface HomeTrailsSectionProps { }

const HomeTrailsSection: React.FC<HomeTrailsSectionProps> = async () => {
    const t = useTranslations('home');

    const session = await getSession();
    const token = session?.token;

    const res = token
        ? await agent.apiTrails.get4RandomTrails(token)
        : await agent.apiTrails.get4RandomTrails();

    return res.data && (
        <>
            <h2 className="home__section-title">{t('section-trails.title')}</h2>

            <section className={'home__section-wrapper home__section-cards trails'}>
                <IntersectionObserverComponent />

                {res.data.map((trail: ITrailCard) => (
                    <article key={trail.id} className="card hidden">
                        <TrailCard card={trail} />
                    </article>
                ))}
            </section>

            <aside className="home__section-links">
                <Link href={'/trails'} prefetch={false}>
                    {t('section-trails.btn-view-all')}
                </Link>
                <Link href={'/trails/create'} prefetch={false}>
                    {t('section-trails.btn-create')}
                </Link>
            </aside>

            <section className="home__section-buffer"></section>
        </>
    );
};

export default HomeTrailsSection;