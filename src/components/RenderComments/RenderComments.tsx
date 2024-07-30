'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { FaEdit } from 'react-icons/fa';
import { ImBin } from "react-icons/im";
import { toast } from 'react-toastify';

import { IComment } from '@/interfaces/interfaces';
import { agent } from '@/api/agent';
import { commentMaxLength } from '@/utils/validations';

import CSubmitButton from '../common/CSubmitButton/CSubmitButton';

interface RenderCommentsProps {
    comments: IComment[]
    userId?: number
    token?: string
    handleNewComment?: (comment: IComment) => void
    setCommentForDelete?: (id: number) => void
}

const RenderComments: React.FC<RenderCommentsProps> = ({
    comments, userId, token, handleNewComment, setCommentForDelete
}) => {
    const t = useTranslations('trail-details');
    const commentsEndRef = useRef<HTMLDivElement | null>(null);
    const [prevCommentsCount, setPrevCommentsCount] = useState<number>(comments.length);
    const [isVisible, setIsVisible] = useState<number | null>(null);
    const [inputValue, setInputValue] = useState<string>('');

    const scrollToBottom = () => {
        commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (comments.length > prevCommentsCount) {
            scrollToBottom();
        }
        setPrevCommentsCount(comments.length);
    }, [comments, prevCommentsCount]);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>, commentId: number) => {
        e.preventDefault();
        const input = e.currentTarget.comment.value;

        const comment = { message: input }

        try {
            const res = await agent.apiTrails.updateTrailComment(commentId, token!, comment);

            if (res.data && handleNewComment) {
                handleNewComment(res.data);

                setInputValue('');
                setIsVisible(null);
            } else if (res.message) {
                toast.error(res.message);
            } else if (res.errors) {
                toast.error(t(res.errors[0], { maxLength: commentMaxLength }));
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="comments__wrapper">
            {comments
                .sort((a: { id: number }, b: { id: number }) => a.id - b.id)
                .map((c: IComment) => (
                    <div key={c.id}>
                        <Link href={{
                            pathname: '/users/[userId]/profile',
                            params: { userId: c.owner.id }
                        }}>
                            <span><em>{c.owner.username}</em></span>
                            <Image
                                src={c.owner.imageUrl || '/images/user-profile-pic.png'}
                                width={30} height={30} alt="User picture" loading="lazy"
                                title={c.owner.username} priority={false}
                            />
                        </Link>

                        <p style={{ opacity: (isVisible == c.id ? '0' : '1') }}>
                            {c.message}

                            {userId == c.owner.id && (
                                <FaEdit
                                    className="trail-edit-icon"
                                    onClick={() => setIsVisible(c.id)}
                                    style={{ cursor: (isVisible == c.id ? 'none' : 'pointer') }}
                                />
                            )}
                        </p>

                        <form
                            onSubmit={(e) => onSubmit(e, c.id)}
                            // className="comments__form"
                            style={{ display: (isVisible == c.id ? 'flex' : 'none') }}
                        >
                            <input
                                type="text"
                                name="comment"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder={t('add-comment')}
                            />

                            <CSubmitButton buttonName={t('send-btn')} />
                            <button type='button' onClick={() => setIsVisible(null)}>{t('cancel-btn')}</button>
                            {setCommentForDelete && <ImBin onClick={() => setCommentForDelete(c.id)} />}
                        </form>

                        <div ref={commentsEndRef} />
                    </div>
                ))}
        </div>
    );
};

export default RenderComments;