'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { BsThermometerSun } from 'react-icons/bs';
import { GiBeech, GiFallingLeaf, GiHiking } from 'react-icons/gi';
import { FaSnowflake } from 'react-icons/fa6';

import { ITrail, IFormEnums, IHut, IPlace } from '@/interfaces/interfaces';
import { agent } from '@/api/agent';

import './trailDetailsSection.scss';
import CMemberImage from '../common/CMemberImage/CMemberImage';
import TrailDetailsStartPointField from '../TrailDetailsStartPointField/TrailDetailsStartPointField';
import TrailDetailsEndPointField from '../TrailDetailsEndPointField/TrailDetailsEndPointField';
import TrailDetailsTotalDistanceField from '../TrailDetailsTotalDistanceField/TrailDetailsTotalDistanceField';
import TrailDetailsElevationField from '../TrailDetailsElevationField/TrailDetailsElevationField';
import TrailDetailsActivityField from '../TrailDetailsActivityField/TrailDetailsActivityField';
import TrailDetailsWaterAvailableField from '../TrailDetailsWaterAvailableField/TrailDetailsWaterAvailableField';
import TrailDetailsInfoField from '../TrailDetailsInfoField/TrailDetailsInfoField';
import TrailDetailsAvailableHutsField from '../TrailDetailsAvailableHutsField/TrailDetailsAvailableHutsField';
import TrailDetailsDestinationsField from '../TrailDetailsDestinationsField/TrailDetailsDestinationsField';

interface TrailDetailsSectionProps {
    trail: ITrail
    userId?: number
    token?: string
}

const seasonIcons = {
    'spring': <GiBeech className="spring" />,
    'summer': <BsThermometerSun className="summer" />,
    'autumn': <GiFallingLeaf className="autumn" />,
    'winter': <FaSnowflake className="winter" />,
};

const TrailDetailsSection: React.FC<TrailDetailsSectionProps> = ({ trail, userId, token }) => {
    const t = useTranslations('trail-details');
    const t2 = useTranslations('trail-create');
    const [enums, setEnums] = useState<IFormEnums>({});
    const [accommodations, setAccommodations] = useState<IHut[]>([]);
    const [destinations, setDestinations] = useState<IPlace[]>([]);

    useEffect(() => {
        const getFormEnums = async () => {
            const formEnums = await agent.apiTrails.getFormEnums();
            setEnums(formEnums);

            if (token) {
                const availableAccommodations = await agent.apiTrails.getAvailableAccommodations(token);
                const availableDestinations = await agent.apiTrails.getAvailableDestinations(token);
                setAccommodations(availableAccommodations);
                setDestinations(availableDestinations);
            }
        }
        getFormEnums();
    }, []);

    const season = trail.seasonVisited?.toLowerCase();
    const maxDifficultyLevel = enums.trailDifficulty?.length;

    const repeatIcon = (end: number) => {
        let icons = [];
        for (let i = 1; i <= end; i++) {
            icons.push(
                <span key={i}><GiHiking /></span>
            );
        }

        return icons;
    };

    return (
        <section className="trail details-page-section">
            {trail.createdBy && (
                <div className="trail__created-by">
                    <p>{t('created-by')}: &nbsp;<b>{trail.createdBy.username}</b></p>
                    <CMemberImage
                        ownerId={trail.createdBy.id}
                        imageUrl={trail.createdBy.imageUrl}
                        username={trail.createdBy.username}
                    />
                </div>
            )}

            <div className="trail__pair">
                <TrailDetailsStartPointField
                    initialStartPoint={trail.startPoint}
                    trailId={trail.id}
                    isTrailOwner={userId ? userId === trail.createdBy?.id : false}
                />
                <TrailDetailsEndPointField
                    initialEndPoint={trail.endPoint}
                    trailId={trail.id}
                    isTrailOwner={userId ? userId === trail.createdBy?.id : false}
                />
            </div>

            <div className="trail__pair">
                <TrailDetailsTotalDistanceField
                    initialTotalDistance={trail.totalDistance}
                    trailId={trail.id}
                    isTrailOwner={userId ? userId === trail.createdBy?.id : false}
                />
                <TrailDetailsElevationField
                    initialElevation={trail.elevationGained}
                    trailId={trail.id}
                    isTrailOwner={userId ? userId === trail.createdBy?.id : false}
                />
            </div>

            <div className="trail__pair">
                {trail.seasonVisited
                    ? <p>
                        {/* @ts-ignore */}
                        {seasonIcons[season]}&nbsp; {t('visited-in')}:&nbsp; {t2(trail.seasonVisited)}
                    </p>
                    : <p>{t('not-available')}</p>
                }
                <TrailDetailsActivityField
                    initialActivity={trail.activity}
                    trailId={trail.id}
                    isTrailOwner={userId ? userId === trail.createdBy?.id : false}
                    formEnums={enums}
                />
            </div>

            <div className="trail__pair trail__pair__last">
                <TrailDetailsWaterAvailableField
                    initialWaterAvailable={trail.waterAvailable}
                    trailId={trail.id}
                    isTrailOwner={userId ? userId === trail.createdBy?.id : false}
                    formEnums={enums}
                />
                <div className="trail__pair__difficulty">
                    {t('difficulty')}:&nbsp;&nbsp;
                    <div>
                        {repeatIcon(trail.trailDifficulty)}
                    </div>
                    <div className="trail__pair__difficulty__empty">
                        {repeatIcon(maxDifficultyLevel - trail.trailDifficulty)}
                    </div>
                </div>
            </div>

            <TrailDetailsInfoField
                initialInfo={trail.trailInfo}
                trailId={trail.id}
                isTrailOwner={userId ? userId === trail.createdBy?.id : false}
            />

            <aside className="trail__links">
                <TrailDetailsAvailableHutsField
                    initialAvailableHuts={trail.availableHuts}
                    trailId={trail.id}
                    isTrailOwner={userId ? userId === trail.createdBy?.id : false}
                    availableAccommodations={accommodations}
                    token={token}
                />
                <TrailDetailsDestinationsField
                    initialDestinations={trail.destinations}
                    trailId={trail.id}
                    isTrailOwner={userId ? userId === trail.createdBy?.id : false}
                    availableDestinations={destinations}
                    token={token}
                />
            </aside>
        </section>
    );
};

export default TrailDetailsSection;