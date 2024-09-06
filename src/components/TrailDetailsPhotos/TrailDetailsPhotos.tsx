import React, { Dispatch, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';

import CCommonModal from '../common/CCommonModal/CCommonModal';

interface TrailDetailsPhotosProps {
    photos: { id: number, imageUrl: string }[];
    isOwner: boolean;
    changeMainClick: boolean;
    isDeletePhotosClick: boolean;
    handleCheckboxClick: Dispatch<number>;
    photosForDelete: number[];
}

const TrailDetailsPhotos: React.FC<TrailDetailsPhotosProps> = ({
    photos, isOwner, changeMainClick, isDeletePhotosClick, handleCheckboxClick, photosForDelete
}) => {
    const t = useTranslations('trail-details');
    const [zoomPhoto, setZoomPhoto] = useState<{ imageUrl: string, index: number } | null>(null);

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
        <>
            {photos.map((p, index) => (
                <div
                    key={p.id}
                    className="photos-wrapper__photos__img"
                >
                    {index == 0 && isOwner && (
                        <span className="photos-wrapper__photos__img__span-main">{t('main')}</span>
                    )}
                    {index != 0 && isOwner && changeMainClick && (
                        <span className="photos-wrapper__photos__img__span-set-main">{t('set-main')}</span>
                    )}
                    {isDeletePhotosClick && (
                        <input
                            type="checkbox"
                            onChange={() => handleCheckboxClick(p.id)}
                            checked={photosForDelete.includes(p.id)}
                            className="photos-wrapper__photos__img__checkbox"
                        />
                    )}
                    <figure>
                        <Image
                            src={p.imageUrl}
                            onClick={() => setZoomPhoto({ imageUrl: p.imageUrl, index })}
                            width={150} height={150}
                            alt="Trail photo"
                            className={(index == 0 && isOwner) ? 'photos-wrapper__photos__img__main' : ''}
                        />
                    </figure>
                </div>
            ))}

            {zoomPhoto && (
                <CCommonModal>
                    <figure className="photos-wrapper__photos__zoom-img">
                        <span onClick={() => setZoomPhoto(null)}>X</span>
                        <Image
                            src={zoomPhoto.imageUrl}
                            width={500} height={500}
                            alt="Trail photo"
                            className="photos-wrapper__photos__zoom-img__img"
                        />
                    </figure>

                    <div className="photos-wrapper__photos__arrows">
                        <IoIosArrowDropleft onClick={() => handlePrev(zoomPhoto.index)} />
                        <IoIosArrowDropright onClick={() => handleNext(zoomPhoto.index)} />
                    </div>
                </CCommonModal>
            )}
        </>
    );
};

export default TrailDetailsPhotos;