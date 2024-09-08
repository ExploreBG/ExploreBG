import React, { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';

import { TPhoto } from '@/interfaces/interfaces';

import CCommonModal from '../common/CCommonModal/CCommonModal';

interface ZoomPhotoProps {
    photos: TPhoto[];
    zoomPhoto: { imageUrl: string, index: number };
    setZoomPhoto: Dispatch<SetStateAction<{ imageUrl: string, index: number } | null>>;
}

const ZoomPhoto: React.FC<ZoomPhotoProps> = ({ photos, zoomPhoto, setZoomPhoto }) => {

    const handlePrev = (index: number) => {
        index > 0
            ? setZoomPhoto({ imageUrl: photos[index - 1].imageUrl, index: index - 1 })
            : setZoomPhoto({ imageUrl: photos[photos.length - 1].imageUrl, index: photos.length - 1 });
    };

    const handleNext = (index: number) => {
        index < photos.length - 1
            ? setZoomPhoto({ imageUrl: photos[index + 1].imageUrl, index: index + 1 })
            : setZoomPhoto({ imageUrl: photos[0].imageUrl, index: 0 });
    };

    return (
        <CCommonModal>
            <figure className="photos-wrapper__photos__zoom-img">
                <span onClick={() => setZoomPhoto(null)}>X</span>
                <Image
                    src={zoomPhoto.imageUrl}
                    width={500} height={500}
                    alt="Trail photo"
                    className="photos-wrapper__photos__zoom-img__img"
                    priority={true}
                />
            </figure>

            <div className="photos-wrapper__photos__arrows">
                <IoIosArrowDropleft onClick={() => handlePrev(zoomPhoto.index)} />
                <IoIosArrowDropright onClick={() => handleNext(zoomPhoto.index)} />
            </div>
        </CCommonModal>
    );
};

export default ZoomPhoto;