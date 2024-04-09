import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';

import { ITrailCard } from '@/interfaces/interfaces';

interface TrailCardProps {
    card: ITrailCard
}

const TrailCard: React.FC<TrailCardProps> = ({ card }) => {
    const t = useTranslations('cards');

    return (
        <>
            <figure>
                <Image
                    src={card.imageUrl || '/images/hike-default.jpg'}
                    width={200} height={200}
                    loading="lazy" alt="Trail image"
                    title={card.trailName} priority={false}
                />
            </figure>

            <h4>{card.trailName}</h4>
            <p>{card.trailInfo.slice(0, 145)} .....</p>
            <Link href={{
                pathname: '/trails/[trailId]',
                params: { trailId: card.id }
            }}>
                {t('card-btn')}
            </Link>
        </>
    );
};

export default TrailCard;