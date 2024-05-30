import React from 'react';
import { useTranslations } from 'next-intl';

import { IAccommodationCard } from '@/interfaces/interfaces';
import { agent } from '@/api/agent';

import AccommodationCard from '../AccommodationCard/AccommodationCard';
import IntersectionObserverComponent from '../IntersectionObserverComponent';
import CPhotoInfo from '../common/CPhotoInfo/CPhotoInfo';

interface HomeAccommodationsSectionProps { }

const HomeAccommodationsSection: React.FC<HomeAccommodationsSectionProps> = async () => {
    const t = useTranslations('home');

    const accommodations = await agent.apiAccommodations.get4RandomAccommodations();

    return (
        <>
            <section className={'home__section-wrapper home__section-cards accommodations'}>
                <IntersectionObserverComponent />

                {accommodations.map((accommodation: IAccommodationCard) => (
                    <article key={accommodations.id} className="card hidden">
                        <AccommodationCard card={accommodation} />
                    </article>
                ))}

                <CPhotoInfo imgInfo={t('section-accommodations.backgr-img-info')} />
            </section>
        </>
    );
};

export default HomeAccommodationsSection;