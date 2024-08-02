'use client';

import React, { useState, useRef } from 'react';
import { GiPhotoCamera } from 'react-icons/gi';

import useCloseOnEscapeTabAndClickOutside from '@/hooks/useCloseOnEscapeTabAndClickOutside';

import './CPhotoInfo.scss';

interface CPhotoInfoProps {
    imgInfo: string
}

const CPhotoInfo: React.FC<CPhotoInfoProps> = ({ imgInfo }) => {
    const [isShowImgInfo, setIsShowImgInfo] = useState<boolean>(false);
    const photoInfoRef = useRef(null);

    useCloseOnEscapeTabAndClickOutside(photoInfoRef, () => setIsShowImgInfo(false));

    return (
        <figure
            ref={photoInfoRef}
            onClick={() => setIsShowImgInfo(!isShowImgInfo)}
            className="img-info-icon"
        >
            <figcaption
                className={`info ${isShowImgInfo ? 'active' : ''}`}
            >
                <span>{imgInfo}</span>
            </figcaption>
            <GiPhotoCamera />
        </figure>
    );
};

export default CPhotoInfo;
