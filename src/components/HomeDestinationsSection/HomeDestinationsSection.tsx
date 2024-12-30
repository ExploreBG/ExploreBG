import React from 'react';
import { useTranslations } from 'next-intl';

import { IDestinationCard } from '@/interfaces/interfaces';
import { getSession } from '@/utils/userSession';
import { agent } from '@/api/agent';
import { Link } from '@/i18n/routing';

import DestinationCard from '../DestinationCard/DestinationCard';
import IntersectionObserverComponent from '../IntersectionObserverComponent';
import CPhotoInfo from '../common/CPhotoInfo/CPhotoInfo';

interface HomeDestinationsSectionProps { }

const HomeDestinationsSection: React.FC<HomeDestinationsSectionProps> = async () => {
    const t = useTranslations('home');

    const session = await getSession();
    const token = session?.token;

    const res = token
        ? await agent.apiDestinations.get4RandomDestinations(token)
        : await agent.apiDestinations.get4RandomDestinations();

    return res.data && (
        <>
            <h2 className="home__section-title">{t('section-destinations.title')}</h2>

            <section className={'home__section-wrapper home__section-cards destinations'}>
                <IntersectionObserverComponent />

                {res.data.map((destination: IDestinationCard) => (
                    <article key={destination.id} className="card hidden">
                        <DestinationCard card={destination} />
                    </article>
                ))}

                <CPhotoInfo imgInfo={t('section-destinations.backgr-img-info')} />
            </section>

            <aside className="home__section-links">
                <Link href={'/destinations'} prefetch={false}>
                    {t('section-destinations.btn-view-all')}
                </Link>
            </aside>

            <section className="home__section-buffer"></section>
        </>
    );
};

export default HomeDestinationsSection;