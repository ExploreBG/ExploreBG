'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

import { ITrail } from '@/interfaces/interfaces';

import './TrailDetailsMapSection.scss';
import TrailDetailsUploadGpx from '../TrailDetailsUploadGpx/TrailDetailsUploadGpx';

const Map = dynamic(() => import('@/components/Map/Map'), {
    loading: () => <p>A map is loading...</p>, ssr: false
});

interface TrailDetailsMapSectionProps {
    trail: ITrail;
    userId?: number;
    token?: string;
}

const TrailDetailsMapSection: React.FC<TrailDetailsMapSectionProps> = ({ trail, userId, token }) => {
    const [track, setTrack] = useState<string | null>(trail.gpxUrl);

    return (
        <section className="map details-page-section">
            {(token && trail.createdBy?.id == userId) && (
                <TrailDetailsUploadGpx
                    trailId={trail.id}
                    token={token}
                    track={track}
                    setGpx={setTrack}
                />
            )}

            {track && <Map gpxUrl={track} />}
        </section>
    );
};

export default TrailDetailsMapSection;