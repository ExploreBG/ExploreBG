'use client';

import React, { useState } from 'react';

import { IUserSession, IFormEnums, IHut, IPlace, ITrail } from '@/interfaces/interfaces';
import { ApproveTrailContextProvider } from '@/contexts/ApproveTrailContext';

import CreateTrailForm from '../CreateTrailForm/CreateTrailForm';
import ApproveTrailImages from '../ApproveTrailImages/ApproveTrailImages';
import ApproveTrailGpx from '../ApproveTrailGpx/ApproveTrailGpx';

interface ApproveTrailDetailsImagesAndGpxProps {
    userSession: IUserSession | null;
    formEnums: IFormEnums;
    availableAccommodations: IHut[];
    availableDestinations: IPlace[];
    dataForReview?: ITrail;
    errMessage?: string;
}

const ApproveTrailDetailsImagesAndGpx: React.FC<ApproveTrailDetailsImagesAndGpxProps> = ({
    userSession, formEnums, availableAccommodations, availableDestinations, dataForReview, errMessage
}) => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);

    const slides = [
        <CreateTrailForm
            key="create-trail-form"
            userSession={userSession}
            formEnums={formEnums}
            availableAccommodations={availableAccommodations}
            availableDestinations={availableDestinations}
            dataForReview={dataForReview}
            errMessage={errMessage}
        />,
        ...(dataForReview && dataForReview?.images.length > 0 ? [
            <ApproveTrailImages
                key="approve-trail-images"
                userSession={userSession}
            />
        ] : []),
        ...(dataForReview && dataForReview.gpxFile ? [
            <ApproveTrailGpx
                key="approve-trail-gpx"
                userSession={userSession}
            />
        ] : [])
    ];

    const handlePrev = () => {
        setCurrentSlide((prev) => (prev == 0 ? slides.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentSlide((prev) => (prev == slides.length - 1 ? 0 : prev + 1));
    };

    return (
        <>
            {dataForReview && (dataForReview?.images.length > 0 || dataForReview?.gpxFile) && (
                <div style={{ margin: '1.5rem' }}>
                    <button onClick={handlePrev} style={{ marginRight: '1.25rem' }}>◀️</button>
                    <button onClick={handleNext}>▶️</button>
                </div>
            )}

            <ApproveTrailContextProvider>
                {slides[currentSlide]}
            </ApproveTrailContextProvider>
        </>
    );
};

export default ApproveTrailDetailsImagesAndGpx;