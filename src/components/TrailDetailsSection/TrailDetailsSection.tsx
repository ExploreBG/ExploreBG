'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { GrOverview } from 'react-icons/gr';
import { BsThermometerSun, BsHouseFill } from 'react-icons/bs';
import { GiPathDistance, GiMountainRoad, GiBeech, GiFallingLeaf, GiHiking } from 'react-icons/gi';
import { FaSnowflake } from 'react-icons/fa6';
import { FaHandHoldingWater } from 'react-icons/fa';

import { ITrail, IHut, IDestination } from '@/interfaces/interfaces';

import './trailDetailsSection.scss';
import CMemberImage from '../common/CMemberImage/CMemberImage';
import TrailDetailsStartPointField from '../TrailDetailsStartPointField/TrailDetailsStartPointField';
import ExpandTextToggle from '../ExpandTextToggle/ExpandTextToggle';

interface TrailDetailsSectionProps {
    trail: ITrail
    userId: number
}

const seasonIcons = {
    'spring': <GiBeech className="spring" />,
    'summer': <BsThermometerSun className="summer" />,
    'autumn': <GiFallingLeaf className="autumn" />,
    'winter': <FaSnowflake className="winter" />,
};

const TrailDetailsSection: React.FC<TrailDetailsSectionProps> = ({ trail, userId }) => {
    const t = useTranslations('trail-details');
    const t2 = useTranslations('trail-create');
    const season = trail.seasonVisited?.toLowerCase();
    const maxDifficultyLevel = 6;
    const trailInfoTextLength = 155;

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
                    isTrailOwner={userId === trail.createdBy?.id}
                />
                <details open>
                    <summary>{t('to')}: <strong>{trail.endPoint}</strong></summary>
                    {/* <GrMapLocation />&nbsp; 018293794663487685 */}
                </details>
            </div>

            <div className="trail__pair">
                <p>
                    <GiPathDistance />&nbsp; {t('distance')}: &nbsp;
                    {trail.totalDistance ? `${trail.totalDistance} km` : `${t('not-available')}`}
                </p>

                <p>
                    <GiMountainRoad />&nbsp; {t('elevation')}: &nbsp;
                    {trail.elevationGained ? `${trail.elevationGained} m` : `${t('not-available')}`}
                </p>
            </div>

            <div className="trail__pair">
                {trail.seasonVisited
                    ? <p>
                        {/* @ts-ignore */}
                        {seasonIcons[season]}&nbsp; {t('visited-in')}:&nbsp; {t2(trail.seasonVisited)}
                    </p>
                    : <p>{t('not-available')}</p>
                }
                <ul>{t('suitable-for')}:
                    {trail.activity?.length > 0
                        ? trail.activity.map((a: string, index: number) => (
                            <li key={index}>{t2(a)}</li>
                        ))
                        : <p>{t('not-available')}</p>
                    }
                </ul>
            </div>

            <div className="trail__pair trail__pair__last">
                <p>
                    <FaHandHoldingWater />&nbsp;
                    {t('water-sources')}: &nbsp;{t2(trail.waterAvailable)}
                </p>
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

            <div
                className="trail__info"
                style={{ cursor: trail.trailInfo.length > trailInfoTextLength ? 'pointer' : 'unset' }}
            >
                <ExpandTextToggle text={trail.trailInfo} length={trailInfoTextLength} />
            </div>

            <aside className="trail__huts">
                <h4><BsHouseFill />&nbsp; {t('lodges-in-the-area')}:</h4>

                {trail.availableHuts?.length > 0
                    ? trail.availableHuts.map((h: IHut) => (
                        <Link key={h.id} href={{
                            pathname: '/accommodations/[accommodationId]',
                            params: { accommodationId: h.id }
                        }}>
                            / {h.accommodationName} /
                        </Link>
                    ))
                    : <p>{t('not-available')}</p>
                }

                <h4><GrOverview />&nbsp; {t('curious-places')}:</h4>

                {trail.destinations?.length > 0
                    ? trail.destinations.map((d: IDestination) => (
                        <Link key={d.id} href={{
                            pathname: '/destinations/[destinationId]',
                            params: { destinationId: d.id }
                        }}>
                            / {d.destinationName} /
                        </Link>
                    ))
                    : <p>{t('not-available')}</p>
                }
            </aside>
        </section>
    );
};

export default TrailDetailsSection;