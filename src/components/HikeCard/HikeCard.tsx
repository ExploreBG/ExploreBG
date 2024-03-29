import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';

import { IHikeCard } from '@/interfaces/interfaces';

interface HikeCardProps {
    card: IHikeCard
}

const HikeCard: React.FC<HikeCardProps> = ({ card }) => {
    const [year, monthNumber, day] = card.hikeDate.split('-');
    const date = new Date();
    date.setMonth(Number(monthNumber) - 1);
    const month = date.toDateString().split(' ')[1];
    const formattedHikeDate = `${day} ${month} ${year}`;

    const t = useTranslations('cards');

    return (
        <>
            <figure>
                <Image
                    src={card.imageUrl || '/images/hike-default.jpg'}
                    width={200} height={200}
                    loading="lazy" alt="Hike image"
                    title={card.location} priority={false}
                />
            </figure>

            <h3>{card.location}</h3>
            <time dateTime={card.hikeDate}>{formattedHikeDate}</time>
            <p>{card.hikeInfo.slice(0, 145)} .....</p>
            {/* @ts-ignore */}
            <Link href={`/hikes/${card.id}`}>{t('card-btn')}</Link>
        </>
    );
};

export default HikeCard;