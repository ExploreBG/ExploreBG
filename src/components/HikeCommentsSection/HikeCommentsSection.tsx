'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Link } from '@/navigation';
import { FaHandPointLeft, FaHandPointRight } from 'react-icons/fa';

import { IHike, ITrail, IComment } from '@/interfaces/interfaces';

import './hikeCommentsSection.scss';

interface HikeCommentsSectionProps {
    hike: IHike
    trail: ITrail
}

const renderComments = (data: IComment[]) => {
    return (
        data
            .sort((a: { id: number }, b: { id: number }) => a.id - b.id)
            .map((c: IComment) => (
                <div key={c.id}>
                    <Link href={{
                        pathname: '/users/[id]',
                        params: { id: c.owner.id }
                    }}>
                        <Image
                            src={c.owner.imageUrl || '/images/user-profile-pic.png'}
                            width={30} height={30} alt="User picture" loading="lazy"
                            title={c.owner.username} priority={false}
                        />
                    </Link>

                    <p>{c.message}</p>
                </div>
            ))
    );
};

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

            {isHike && renderComments(hike.comments)}

            {!isHike && renderComments(trail.comments)}
        </section>
    );
};

export default HikeCommentsSection;