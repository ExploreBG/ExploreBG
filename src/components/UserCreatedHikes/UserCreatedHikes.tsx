'use client';

import React, { useState } from 'react';

import { IHikeCard } from '@/interfaces/interfaces';

import HikeCard from '../HikeCard/HikeCard';

interface UserCreatedHikesProps {
    hikes: IHikeCard[]
}

const UserCreatedHikes: React.FC<UserCreatedHikesProps> = ({ hikes }) => {
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
        <>
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
        </>
    );
};

export default UserCreatedHikes;