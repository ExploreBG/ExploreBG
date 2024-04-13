import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';

import { IHikeCard } from '@/interfaces/interfaces';
import { formatDate } from '@/utils/utils';

interface HikeCardProps {
    card: IHikeCard
}

const HikeCard: React.FC<HikeCardProps> = ({ card }) => {
    const formattedHikeDate = formatDate(card.hikeDate);

    const t = useTranslations('cards');

    return (
        <>
            <figure>
                <Image
                    src={card.imageUrl || '/images/hike-default.jpg'}
                    width={200} height={200}
                    loading="lazy" alt="Hike image"
                    title={card.hikeName} priority={false}
                />
            </figure>

            <h4>{card.hikeName}</h4>
            <time dateTime={card.hikeDate}>{formattedHikeDate}</time>
            <p>{card.hikeInfo.slice(0, 145)} {card.hikeInfo.length > 145 && '.....'}</p>
            <Link href={{
                pathname: '/hikes/[hikeId]',
                params: { hikeId: card.id }
            }}>
                {t('card-btn')}
            </Link>
        </>
    );
};

export default HikeCard;