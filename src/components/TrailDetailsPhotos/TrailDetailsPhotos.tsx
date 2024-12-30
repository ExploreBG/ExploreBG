import React, { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';

import { TPhoto } from '@/interfaces/interfaces';
import { useTrailPhotosCtx } from '@/contexts/TrailPhotosContext';
import { agent } from '@/api/agent';
import { MAX_PHOTO_COUNT_FOR_UPLOAD } from '@/utils/constants';

import CLoadingSpinner from '../common/CLoadingSpinner/CLoadingSpinner';
import ZoomPhoto from '../ZoomPhoto/ZoomPhoto';

interface TrailDetailsPhotosProps {
    photos: TPhoto[];
    setPhotos: Dispatch<SetStateAction<TPhoto[]>>;
    trailId: number;
    isOwner: boolean;
    token?: string;
}

const TrailDetailsPhotos: React.FC<TrailDetailsPhotosProps> = ({
    photos, setPhotos, trailId, isOwner, token
}) => {
    const t = useTranslations('trail-details');
    const [zoomPhoto, setZoomPhoto] = useState<{ imageUrl: string, index: number } | null>(null);
    const {
        isUploading,
        changeMainClick,
        setChangeMainClick,
        isDeletePhotosClick,
        photosForDelete,
        setPhotosForDelete } = useTrailPhotosCtx();

    const handleCheckboxClick = (id: number) => {
        photosForDelete.includes(id)
            ? setPhotosForDelete(photosForDelete.filter(p => p != id))
            : setPhotosForDelete([...photosForDelete, id]);
    };

    const handleChangeMainPhoto = async (photoId: number) => {
        if (!token) {
            toast.error(t('missing-token'));
            return;
        }

        try {
            const res = await agent.apiTrails.changeMainPhoto(trailId, token, { imageId: photoId });

            if (res.data) {
                const newPhotosState = photos.map((item) => {
                    if (item.id == photoId) {
                        return { ...item, isMain: true };
                    } else if (item.isMain == true) {
                        return { ...item, isMain: false };
                    }
                    return item;
                });
                setPhotos(newPhotosState);
                setChangeMainClick(false);

                toast.success(t('success-change-main'));
            } else if (res.message) {
                toast.error(res.message);
            } else if (res.errors) {
                toast.error(res.errors[0]);
            }
        } catch (err) {
            console.error('Failed to change main photo: ', err);
        }
    };

    return (
        <>
            {isUploading && (
                <div className="photos-wrapper__spinner" style={{ display: (isUploading ? 'flex' : 'none') }}>
                    <CLoadingSpinner
                        width={photos.length == 0 ? '5rem' : undefined}
                        height={photos.length == 0 ? '5rem' : undefined}
                        fontSize={photos.length == 0 ? '0.65rem' : undefined}
                        uploadOrDelete={photosForDelete.length > 0 ? t('deleting') : t('uploading')}
                    />
                </div>
            )}

            {photos.length == 0 && !isUploading && (
                <p>
                    <span className="asterisk">*</span>
                    <em>{t('limit-photos-message', { max: MAX_PHOTO_COUNT_FOR_UPLOAD })}</em>
                </p>
            )}

            {photos.length > 0 && (
                <div className="photos-wrapper__photos" style={{ marginTop: (isOwner ? '2rem' : '0') }}>
                    {photos.some((p) => p.imageStatus?.toLocaleLowerCase() == 'review') && (
                        <p>{`There are currently ${photos.filter((p) =>
                            p.imageStatus?.toLocaleLowerCase() == 'review').length} images in review!`}</p>
                    )}

                    {photos
                        .filter((p) => p.imageStatus?.toLocaleLowerCase() != 'review')
                        .map((p, index) => (
                            <div
                                key={p.id}
                                className="photos-wrapper__photos__img"
                            >
                                {p.isMain && isOwner && (
                                    <span className="photos-wrapper__photos__img__span-main">{t('main')}</span>
                                )}
                                {!p.isMain && isOwner && changeMainClick && (
                                    <span
                                        onClick={() => handleChangeMainPhoto(p.id)}
                                        className="photos-wrapper__photos__img__span-set-main"
                                    >
                                        {t('set-main')}
                                    </span>
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
                                        className={(p.isMain && isOwner) ? 'photos-wrapper__photos__img__main' : ''}
                                    />
                                </figure>
                            </div>
                        ))}

                    {zoomPhoto && (
                        <ZoomPhoto photos={photos} zoomPhoto={zoomPhoto} setZoomPhoto={setZoomPhoto} />
                    )}

                    {isOwner && (
                        <p className="photos-wrapper__photos__limit-message">
                            <span className="asterisk">*</span>
                            <em>
                                {t('remaining-photos-message', {
                                    count: MAX_PHOTO_COUNT_FOR_UPLOAD - photos.length
                                })}
                            </em>
                        </p>
                    )}
                </div>
            )}
        </>
    );
};

export default TrailDetailsPhotos;