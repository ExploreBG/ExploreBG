'use client';

import React, { Dispatch, SetStateAction, useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { FaEdit } from 'react-icons/fa';
import { ImBin } from "react-icons/im";
import { toast } from 'react-toastify';

import { IComment } from '@/interfaces/interfaces';
import { agent } from '@/api/agent';
import { commentMaxLength } from '@/utils/validations';
import { formatEntityLastUpdate } from '@/utils/utils';

import CSubmitButton from '../common/CSubmitButton/CSubmitButton';

interface RenderCommentsProps {
    comments: IComment[]
    userId?: number
    token?: string
    handleNewComment?: Dispatch<IComment>
    setCommentForDelete?: Dispatch<SetStateAction<number | null>>
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
                toast.success(t('success-update-comment'));
            } else if (res.message) {
                toast.error(res.message);
            } else if (res.errors) {
                toast.error(t(res.errors[0], { maxLength: commentMaxLength }));
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleEditClick = (comment: IComment) => {
        setIsVisible(comment.id);
        setInputValue(comment.message);
    }

    return (
        <div className="comments__wrapper">
            {comments
                .sort((a: { id: number }, b: { id: number }) => a.id - b.id)
                .map((c: IComment) => (
                    <div key={c.id} className="comments__wrapper__comment">
                        <Link href={{
                            pathname: '/users/[userId]',
                            params: { userId: c.owner.id }
                        }}>
                            <span><em>{c.owner.username}</em></span>
                            <Image
                                src={c.owner.imageUrl || '/images/user-profile-pic.png'}
                                width={30} height={30} alt="User picture" loading="lazy"
                                title={c.owner.username} priority={false}
                            />
                        </Link>

                        <div className="comments__wrapper__comment__message">
                            <p style={{ opacity: (isVisible == c.id ? '0' : '1') }}>

                                {c.message}

                                <time dateTime={c.lastUpdateDate}>
                                    {formatEntityLastUpdate(c.lastUpdateDate)}
                                </time>
                            </p>
                            {userId == c.owner.id && (
                                <FaEdit
                                    className="trail-edit-icon"
                                    onClick={() => handleEditClick(c)}
                                    style={{
                                        opacity: (isVisible == c.id ? '0' : '1'),
                                        cursor: (isVisible == c.id ? 'none' : 'pointer')
                                    }}
                                />
                            )}

                            <form
                                onSubmit={(e) => onSubmit(e, c.id)}
                                className="comments__wrapper__comment__message__edit-form"
                                style={{ display: (isVisible == c.id ? 'flex' : 'none'), alignItems: 'center' }}
                            >
                                <input
                                    type="text"
                                    name="comment"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                />

                                <CSubmitButton buttonName={t('send-btn')} />
                                <button type='button' onClick={() => setIsVisible(null)}>{t('cancel-btn')}</button>
                                {setCommentForDelete && <ImBin onClick={() => setCommentForDelete(c.id)} />}
                            </form>
                        </div>

                        <div ref={commentsEndRef} />
                    </div>
                ))}
        </div>
    );
};

export default RenderComments;