import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';

import { IAccommodationCard } from '@/interfaces/interfaces';

interface AccommodationCardProps {
    card: IAccommodationCard
}

const AccommodationCard: React.FC<AccommodationCardProps> = ({ card }) => {
    const t = useTranslations('cards');

    return (
        <>
            <figure>
                <Image
                    src={card.imageUrl || '/images/accommodation-default.jpg'}
                    width={200} height={200}
                    loading="lazy" alt="Accommodation image"
                    title={card.accommodationName} priority={false}
                />
            </figure>

            <h4>{card.accommodationName}</h4>
            <Link href={{
                pathname: '/accommodations/[accommodationId]',
                params: { accommodationId: card.id }
            }}>
                {t('card-btn')}
            </Link>
        </>
    );
};

export default AccommodationCard;