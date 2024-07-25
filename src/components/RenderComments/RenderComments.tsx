import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Link } from '@/navigation';
import { FaEdit } from 'react-icons/fa';

import { IComment } from '@/interfaces/interfaces';

interface RenderCommentsProps {
    comments: IComment[]
    userId?: number
}

const RenderComments: React.FC<RenderCommentsProps> = ({ comments, userId }) => {
    const commentsEndRef = useRef<HTMLDivElement | null>(null);
    const [prevCommentsCount, setPrevCommentsCount] = useState<number>(comments.length);

    const scrollToBottom = () => {
        commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (comments.length > prevCommentsCount) {
            scrollToBottom();
        }
        setPrevCommentsCount(comments.length);
    }, [comments, prevCommentsCount]);

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

                        <p>
                            {c.message}
                            {userId == c.owner.id && <FaEdit className="trail-edit-icon" />}
                        </p>
                        <div ref={commentsEndRef} />
                    </div>
                ))}
        </div>
    );
};

export default RenderComments;