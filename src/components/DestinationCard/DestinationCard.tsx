import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';

import { IDestinationCard } from '@/interfaces/interfaces';

interface DestinationCardProps {
    card: IDestinationCard
}

const DestinationCard: React.FC<DestinationCardProps> = ({ card }) => {
    const t = useTranslations('cards');

    return (
        <>
            <figure>
                <Image
                    src={card.imageUrl || '/images/destination-default.jpg'}
                    width={200} height={200}
                    loading="lazy" alt={card.destinationName}
                    title={card.destinationName} priority={false}
                />
            </figure>

            <h4>{card.destinationName}</h4>
            {card.nextTo && <p>close to: {card.nextTo}</p>}
            <Link href={{
                pathname: '/destinations/[destinationId]',
                params: { destinationId: card.id }
            }}>
                {t('card-btn')}
            </Link>
        </>
    );
};

export default DestinationCard;