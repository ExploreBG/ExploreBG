'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

import { ITrail, ITrackInfo } from '@/interfaces/interfaces';
import { formatFullDate, convertMetersToKmM } from '@/utils/utils';

import './TrailDetailsMapSection.scss';
import TrailDetailsUploadGpx from '../TrailDetailsUploadGpx/TrailDetailsUploadGpx';

const Map = dynamic(() => import('@/components/Map/Map'), {
    loading: () => <p>A map is loading...</p>, ssr: false
});

interface TrailDetailsMapSectionProps {
    trail: ITrail;
    token?: string;
    isOwner: boolean;
}

const TrailDetailsMapSection: React.FC<TrailDetailsMapSectionProps> = ({ trail, token, isOwner }) => {
    const [track, setTrack] = useState<string | null>(trail.gpxUrl);
    const [trackInfo, setTrackInfo] = useState<ITrackInfo | null>(null);

    const startTime = trackInfo && formatFullDate(trackInfo.startTime);
    const endTime = trackInfo && formatFullDate(trackInfo.endTime);
    const start = startTime?.trim().slice(0, 14) === '1 January 1970' ? 'n/a' : startTime;
    const end = endTime?.trim().slice(0, 14) === '1 January 1970' ? 'n/a' : endTime;

    return (
        <section className="map details-page-section">
            {isOwner && (
                <TrailDetailsUploadGpx
                    trailId={trail.id}
                    token={token!}
                    track={track}
                    setGpx={setTrack}
                />
            )}

            {track && (
                <>
                    <Map gpxUrl={track} setTrackInfo={setTrackInfo} />

                    {trackInfo && (
                        <aside className="map__track-info">
                            <span>name: &nbsp;
                                <strong>{trackInfo.name}</strong>
                            </span>
                            <span>distance: &nbsp;
                                <strong>{convertMetersToKmM(Number(trackInfo.distance))}</strong>
                            </span>
                            <span>start time: &nbsp;
                                <strong>{start}</strong>
                            </span>
                            <span>end time: &nbsp;
                                <strong>{end}</strong>
                            </span>
                            <span>moving time: &nbsp;
                                <strong>{Number(trackInfo.movingTime) > 0 ? trackInfo.movingTime : 'n/a'}</strong>
                            </span>
                            <span>total time: &nbsp;
                                <strong>{Number(trackInfo.totalTime) > 0 ? trackInfo.totalTime : 'n/a'}</strong>
                            </span>
                            <span>average moving pace per km: &nbsp;
                                <strong>{Number(trackInfo.movingPace) > 0 ? trackInfo.movingPace : 'n/a'}</strong>
                            </span>
                            <span>average moving speed in km per hour: &nbsp;
                                <strong>{trackInfo.movingSpeed}</strong>
                            </span>
                            <span>average total speed in km per hour: &nbsp;
                                <strong>{trackInfo.totalSpeed}</strong>
                            </span>
                            <span>elevation min: &nbsp;
                                <strong>{Math.floor(Number(trackInfo.elevationMin))} m</strong>
                            </span>
                            <span>elevation max: &nbsp;
                                <strong>{Math.floor(Number(trackInfo.elevationMax))} m</strong>
                            </span>
                            <span>elevation gain: &nbsp;
                                <strong>{Math.floor(Number(trackInfo.elevationGain))} m</strong>
                            </span>
                            <span>elevation loss: &nbsp;
                                <strong>{Math.floor(Number(trackInfo.elevationLoss))} m</strong>
                            </span>
                            <span>max speed in km per hour: &nbsp;
                                <strong>{Number(trackInfo.speedMax) > 0 ? trackInfo.speedMax : 'n/a'}</strong>
                            </span>
                            <span>average heart rate: &nbsp;
                                <strong>{trackInfo.averageHr ? trackInfo.averageHr : 'n/a'}</strong>
                            </span>
                            <span>average cadence: &nbsp;
                                <strong>{trackInfo.averageCadence ? trackInfo.averageCadence : 'n/a'}</strong>
                            </span>
                            <span>average temperature: &nbsp;
                                <strong>{trackInfo.averageTemp ? trackInfo.averageTemp : 'n/a'}</strong>
                            </span>

                            <p>
                                <em><span style={{ color: 'red' }}>*</span> n/a - not available</em>
                            </p>
                        </aside>
                    )}
                </>
            )}
        </section>
    );
};

export default TrailDetailsMapSection;