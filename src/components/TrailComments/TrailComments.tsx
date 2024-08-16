'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';

import { IComment, ITrail } from '@/interfaces/interfaces';
import { agent } from '@/api/agent';

import RenderComments from '../RenderComments/RenderComments';
import TrailCommentsForm from '../TrailCommentsForm/TrailCommentsForm';
import CConfirmationModal from '../common/CConfirmationModal/CConfirmationModal';

interface TrailCommentsProps {
    trail: ITrail
    userId?: number
    trailId: string
    token?: string
}

const TrailComments: React.FC<TrailCommentsProps> = ({
    trail, userId, trailId, token
}) => {
    const t = useTranslations('trail-details');
    const [comments, setComments] = useState<IComment[]>(trail.comments != undefined ? trail.comments : []);
    const [commentForDelete, setCommentForDelete] = useState<number | null>(null);

    const handleNewComment = (newComment: IComment) => {
        const commentIndex = comments.findIndex(c => c.id === newComment.id);

        if (commentIndex !== -1) {
            const updatedComments = [...comments];
            updatedComments[commentIndex] = newComment;

            setComments(updatedComments);
        } else {
            setComments([...comments, newComment]);
        }
    };

    const onConfirmClick = async () => {
        try {
            const res = await agent.apiTrails.removeTrailComment(commentForDelete!, Number(trailId), token!);

            if (res.data.deleted) {
                const updatedComments = comments.filter(c => c.id !== commentForDelete);

                setComments(updatedComments);
                setCommentForDelete(null);
                toast.success(t('del-comment-success'));
            } else if (res.message) {
                toast.error(res.message);
            }
        } catch (err) {
            console.error(err);
        }
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
                    setCommentForDelete={setCommentForDelete}
                />
            )}

            <TrailCommentsForm
                userId={userId}
                trailId={trailId}
                token={token}
                handleNewComment={handleNewComment}
            />

            {commentForDelete && (
                <CConfirmationModal
                    deletionObj={t('del-comment-message')}
                    confirm={onConfirmClick}
                    cancel={() => setCommentForDelete(null)}
                />
            )}
        </section>
    );
};

export default TrailComments;