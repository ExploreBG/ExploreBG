'use client';

import React from 'react';
import { Link } from '@/navigation';
import { GrMapLocation } from 'react-icons/gr';
import { BsThermometerSun, BsHouseFill } from 'react-icons/bs';
import { GiPathDistance, GiMountainRoad, GiBeech, GiFallingLeaf, GiHiking } from 'react-icons/gi';
import { FaSnowflake } from 'react-icons/fa6';
import { FaHandHoldingWater } from 'react-icons/fa';

import { ITrail, IHut } from '@/interfaces/interfaces';

import './trailDetailsSection.scss';
import ExpandTextToggle from '../ExpandTextToggle/ExpandTextToggle';

interface TrailDetailsSectionProps {
    trail: ITrail
}

const seasonIcons = {
    'spring': <GiBeech className="spring" />,
    'summer': <BsThermometerSun className="summer" />,
    'autumn': <GiFallingLeaf className="autumn" />,
    'winter': <FaSnowflake className="winter" />,
};

const TrailDetailsSection: React.FC<TrailDetailsSectionProps> = ({ trail }) => {
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
            <div className="trail__pair">
                <details open>
                    <summary>From: <strong>{trail.startPoint}</strong></summary>
                    <GrMapLocation />&nbsp; 018293794663487685
                </details>
                <details open>
                    <summary>To: <strong>{trail.endPoint}</strong></summary>
                    <GrMapLocation />&nbsp; 018293794663487685
                </details>
            </div>

            <div className="trail__pair">
                {trail.totalDistance
                    ? <p><GiPathDistance />&nbsp; distance: {trail.totalDistance} km</p>
                    : <p>not available</p>
                }
                {trail.elevationGained
                    ? <p><GiMountainRoad />&nbsp; elevation: {trail.elevationGained} m</p>
                    : <p>not available</p>
                }
            </div>

            <div className="trail__pair">
                {trail.seasonVisited
                    ? <p>
                        {/* @ts-ignore */}
                        {seasonIcons[season]}&nbsp; visited in:&nbsp; {trail.seasonVisited}
                    </p>
                    : <p>not available</p>
                }
                <ul>suitable for:
                    {trail.activity?.length > 0
                        ? trail.activity.map((a: string, index: number) => (
                            <li key={index}>{a}</li>
                        ))
                        : <p>not available</p>
                    }
                </ul>
            </div>

            <div className="trail__pair trail__pair__last">
                <p>
                    <FaHandHoldingWater />&nbsp;
                    water sources: {trail.waterAvailable ? 'Yes' : 'No'}
                </p>
                <div className="trail__pair__difficulty">
                    difficulty:&nbsp;
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
                <h4><BsHouseFill />&nbsp; Lodges in the area:</h4>

                {trail.availableHuts?.length > 0
                    ? trail.availableHuts.map((h: IHut) => (
                        <Link key={h.id} href={{
                            pathname: '/accommodations/[id]',
                            params: { id: h.id }
                        }}>
                            / {h.accommodationName} /
                        </Link>
                    ))
                    : <p>not available</p>
                }
            </aside>
        </section>
    );
};

export default TrailDetailsSection;