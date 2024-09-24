import React from 'react';
import { useTranslations } from 'next-intl';

import { IAccommodationCard } from '@/interfaces/interfaces';
import { agent } from '@/api/agent';
import { Link } from '@/i18n/routing';

import AccommodationCard from '../AccommodationCard/AccommodationCard';
import IntersectionObserverComponent from '../IntersectionObserverComponent';
import CPhotoInfo from '../common/CPhotoInfo/CPhotoInfo';

interface HomeAccommodationsSectionProps { }

const HomeAccommodationsSection: React.FC<HomeAccommodationsSectionProps> = async () => {
    const t = useTranslations('home');

    const accommodations = await agent.apiAccommodations.get4RandomAccommodations();

    return accommodations && (
        <>
            <h2 className="home__section-title">{t('section-accommodations.title')}</h2>

            <section className={'home__section-wrapper home__section-cards accommodations'}>
                <IntersectionObserverComponent />

                {accommodations.map((accommodation: IAccommodationCard) => (
                    <article key={accommodations.id} className="card hidden">
                        <AccommodationCard card={accommodation} />
                    </article>
                ))}

                <CPhotoInfo imgInfo={t('section-accommodations.backgr-img-info')} />
            </section>

            <aside className="home__section-links">
                <Link href={'/accommodations'} prefetch={false}>
                    {t('section-accommodations.btn-view-all')}
                </Link>
            </aside>

            <section className="home__section-buffer"></section>
        </>
    );
};

export default HomeAccommodationsSection;