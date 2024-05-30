import React from 'react';
import Image from 'next/image';
import { Link } from '@/navigation';

import { IComment } from '@/interfaces/interfaces';

interface RenderCommentsProps {
    comments: IComment[]
}

const RenderComments: React.FC<RenderCommentsProps> = ({ comments }) => {
    return (
        comments
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

                    <p>{c.message}</p>
                </div>
            ))
    );
};

export default RenderComments;