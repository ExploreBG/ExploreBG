'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

import { IHikeCard } from '@/interfaces/interfaces';

import IntersectionObserverComponent from '../IntersectionObserverComponent';
import HikeCard from '../HikeCard/HikeCard';

interface UserCreatedHikesProps {
    hikes: IHikeCard[]
}

export const UserCreatedHikes: React.FC<UserCreatedHikesProps> = ({ hikes }) => {
    const t = useTranslations('my-profile');
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const itemsPerPage = 3;

    let endIndex = currentIndex + itemsPerPage;

    const onPrevClick = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - itemsPerPage);
        }
    }

    const onNextClick = () => {
        if (endIndex < hikes.length) {
            setCurrentIndex(currentIndex + itemsPerPage);
        }
    }

    const hikesForDisplay = hikes.slice(currentIndex, endIndex);

    return (
        <section className="user-profile-section">
            <IntersectionObserverComponent />

            <hr />

            <h2>{t('created-hikes')}</h2>

            {hikes.length > itemsPerPage && (
                <>
                    <button
                        onClick={onPrevClick}
                        disabled={currentIndex == 0}
                        className={`user-profile-section${currentIndex != 0 ? '__active-btn' : ''}`}
                    >
                        {'<'}
                    </button>
                    <button
                        onClick={onNextClick}
                        disabled={endIndex >= hikes.length}
                        className={`user-profile-section${endIndex < hikes.length ? '__active-btn' : ''}`}
                    >
                        {'>'}
                    </button>
                </>
            )}

            <div className="user-profile-section__created-hikes">
                {hikesForDisplay.map((hike: IHikeCard) => (
                    <article key={hike.id} className="card hidden">
                        <HikeCard card={hike} />
                    </article>
                ))}
            </div>
        </section>
    );
};

export default UserCreatedHikes;