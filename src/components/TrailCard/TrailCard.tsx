import React from 'react';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/navigation';

import { ITrailCard } from '@/interfaces/interfaces';
import { getSession } from '@/utils/userSession';

import CAddToOrRemoveFromFavorite from '../common/CAddToOrRemoveFromFavorite/CAddToOrRemoveFromFavorite';

interface TrailCardProps {
    card: ITrailCard
}

const TrailCard: React.FC<TrailCardProps> = async ({ card }) => {
    const t = await getTranslations('cards');

    const session = await getSession();
    const token = session?.token;

    return (
        <>
            <figure>
                {token && (
                    <CAddToOrRemoveFromFavorite
                        liked={card.likedByUser}
                        entityId={card.id}
                        userToken={token}
                    />
                )}

                <Image
                    src={card.imageUrl || '/images/hike-default.jpg'}
                    width={200} height={200}
                    loading="lazy" alt={`Trail image - ${card.trailName}`}
                    title={card.trailName} priority={false}
                />
            </figure>

            <h4>{card.trailName}</h4>
            <p>{card.trailInfo.slice(0, 145)} {card.trailInfo.length > 145 && '.....'}</p>
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