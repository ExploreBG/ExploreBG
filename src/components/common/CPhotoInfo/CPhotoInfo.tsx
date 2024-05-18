'use client';

import React, { useState } from 'react';
import { GiPhotoCamera } from 'react-icons/gi';

interface CPhotoInfoProps {
    imgInfo: string
}

export const CPhotoInfo: React.FC<CPhotoInfoProps> = ({ imgInfo }) => {
    const [isShowImgInfo, setIsShowImgInfo] = useState<boolean>(false);

    return (
        <figure onClick={() => setIsShowImgInfo(!isShowImgInfo)} className="img-info-icon">
            <figcaption
                className={`info ${isShowImgInfo ? 'active' : ''}`}
            >
                {imgInfo}
            </figcaption>
            <GiPhotoCamera />
        </figure>
    );
};

export default CPhotoInfo;
