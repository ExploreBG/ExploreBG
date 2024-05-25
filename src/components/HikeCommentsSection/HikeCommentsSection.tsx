'use client';

import React, { useState } from 'react';
import { FaHandPointLeft, FaHandPointRight } from 'react-icons/fa';

import { IHike, ITrail } from '@/interfaces/interfaces';

import RenderComments from '../RenderComments/RenderComments';

interface HikeCommentsSectionProps {
    hike: IHike
    trail: ITrail
}

const HikeCommentsSection: React.FC<HikeCommentsSectionProps> = ({ hike, trail }) => {
    const [isHike, setIsHike] = useState<boolean>(hike.comments.length > 0 ? true : false);

    return (
        <section className="comments details-page-section">
            <h3>comments:</h3>

            {hike.comments.length > 0 && trail?.comments?.length > 0 && (
                <nav onClick={() => setIsHike(!isHike)} aria-label="comments-navigation">
                    <h4>Hike</h4>
                    <span>{isHike ? <FaHandPointLeft /> : <FaHandPointRight />}</span>
                    <h4>Trail</h4>
                </nav>
            )}

            {isHike && <RenderComments comments={hike.comments} />}

            {!isHike && <RenderComments comments={trail.comments} />}
        </section>
    );
};

export default HikeCommentsSection;