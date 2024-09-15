'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { agent } from '@/api/agent';

import './CAddToOrRemoveFromFavorite.scss';

interface CAddToOrRemoveFromFavoriteProps {
    liked: boolean;
    entityId: number;
    userToken: string;
}

const CAddToOrRemoveFromFavorite: React.FC<CAddToOrRemoveFromFavoriteProps> = ({
    liked, entityId, userToken
}) => {
    const t = useTranslations('common');
    const [isLiked, setIsLiked] = useState<boolean>(liked);

    const handleLikeClick = async () => {
        const body = { like: !isLiked };

        try {
            const res = await agent.apiTrails.addToOrRemoveFromFavorite(entityId, userToken, body);

            if (res.data) {
                setIsLiked(!isLiked);

                toast.success(t(isLiked ? 'successfully-dislike' : 'successfully-like'));
            } else if (res.message) {
                toast.error(res.message);
            } else if (res.errors) {
                toast.error(res.errors[0]);
            }
        } catch (err) {
            console.error(`Failed to ${isLiked ? 'dislike' : 'like'} this entity: `, err);
        }
    };

    return (
        <span onClick={handleLikeClick} className="favorite-icon">
            {isLiked
                ? <FaHeart className={isLiked ? 'liked' : ''} />
                : <FaRegHeart />
            }
        </span>
    );
};

export default CAddToOrRemoveFromFavorite;