import React from 'react';
import Image from 'next/image';
import { Link } from '@/navigation';

import './CMemberImage.scss';

interface CMemberImageProps {
    ownerId: number
    imageUrl: string | null
    username: string
}

const CMemberImage: React.FC<CMemberImageProps> = ({ ownerId, imageUrl, username }) => {
    return (
        <>
            <Link
                className="member-link"
                href={{
                    pathname: '/users/[userId]/profile',
                    params: { userId: ownerId }
                }}
            >
                <Image
                    src={imageUrl || '/images/user-profile-pic.png'}
                    width={40} height={40} loading="eager"
                    alt="User picture" title={username}
                    priority={true}
                />
            </Link>
        </>
    );
};

export default CMemberImage;