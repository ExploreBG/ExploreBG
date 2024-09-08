'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

import { ITrail, TPhoto } from '@/interfaces/interfaces';
import { TrailPhotosContextProvider } from '@/contexts/TrailPhotosContext';

import './TrailDetailsPhotosSection.scss';
import CLoadingSpinner from '../common/CLoadingSpinner/CLoadingSpinner';
import TrailDetailsPhotosButtons from '../TrailDetailsPhotosButtons/TrailDetailsPhotosButtons';

const TrailDetailsPhotos = dynamic(() => import('@/components/TrailDetailsPhotos/TrailDetailsPhotos'), {
    loading: () => <CLoadingSpinner />,
    ssr: false
});

interface TrailDetailsPhotosSectionProps {
    trail: ITrail;
    token?: string;
    isOwner: boolean;
}

const TrailDetailsPhotosSection: React.FC<TrailDetailsPhotosSectionProps> = ({ trail, token, isOwner }) => {
    const [photos, setPhotos] = useState<TPhoto[]>(trail.images);

    return (
        <TrailPhotosContextProvider>
            <section className="photos-wrapper details-page-section">
                {isOwner && (
                    <TrailDetailsPhotosButtons
                        photos={photos}
                        setPhotos={setPhotos}
                        trailId={trail.id}
                        token={token}
                    />
                )}

                <TrailDetailsPhotos
                    photos={photos}
                    setPhotos={setPhotos}
                    trailId={trail.id}
                    isOwner={isOwner}
                    token={token}
                />
            </section>
        </TrailPhotosContextProvider>
    );
};

export default TrailDetailsPhotosSection;