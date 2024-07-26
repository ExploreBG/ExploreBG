'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

import { IComment } from '@/interfaces/interfaces';

import RenderComments from '../RenderComments/RenderComments';
import TrailCommentsForm from '../TrailCommentsForm/TrailCommentsForm';

interface TrailCommentsProps {
    initialComments: IComment[]
    userId: number
    trailId: string
    token: string
}

const TrailComments: React.FC<TrailCommentsProps> = ({ initialComments, userId, trailId, token }) => {
    const t = useTranslations('trail-details');
    const [comments, setComments] = useState<IComment[]>(initialComments);

    const handleNewComment = (newComment: IComment) => {
        setComments([...comments, newComment]);
    };

    return (
        <section className="comments details-page-section">
            <h3>{t('comments')}:</h3>

            {comments.length > 0 && (
                <RenderComments
                    comments={comments}
                    userId={userId}
                    token={token}
                    handleNewComment={handleNewComment}
                />
            )}

            {userId && (
                <TrailCommentsForm
                    userId={userId}
                    trailId={trailId}
                    token={token}
                    handleNewComment={handleNewComment}
                />
            )}
        </section>
    );
};

export default TrailComments;