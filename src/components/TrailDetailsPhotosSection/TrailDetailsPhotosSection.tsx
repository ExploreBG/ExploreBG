'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { MdAddAPhoto } from 'react-icons/md';
import { FcStackOfPhotos } from 'react-icons/fc';
import { ImBin } from 'react-icons/im';
import { FcCancel } from 'react-icons/fc';
import { BiSolidSelectMultiple } from 'react-icons/bi';
import { toast } from 'react-toastify';

import { ITrail } from '@/interfaces/interfaces';
import { agent } from '@/api/agent';
import { MAX_PHOTO_COUNT_FOR_UPLOAD } from '@/utils/constants';

import './TrailDetailsPhotosSection.scss';
import CLoadingSpinner from '../common/CLoadingSpinner/CLoadingSpinner';
import CConfirmationModal from '../common/CConfirmationModal/CConfirmationModal';

const TrailDetailsPhotos = dynamic(() => import('@/components/TrailDetailsPhotos/TrailDetailsPhotos'), {
    loading: () => <CLoadingSpinner />,
    ssr: false
});

interface TrailDetailsPhotosSectionProps {
    trail: ITrail;
    token?: string;
    isOwner: boolean;
}

const TrailDetailsPhotosSection: React.FC<TrailDetailsPhotosSectionProps> = ({ trail, token, isOwner }) => {
    const t = useTranslations('trail-details');
    const [photos, setPhotos] = useState<{ id: number, imageUrl: string }[]>(trail.images);
    const [changeMainClick, setChangeMainClick] = useState<boolean>(false);
    const [isDeletePhotosClick, setIsDeletePhotosClick] = useState<boolean>(false);
    const [photosForDelete, setPhotosForDelete] = useState<number[]>([]);
    const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget?.files;

        if (!token) {
            toast.error(t('missing-token'));
            return;
        }

        if (files) {
            const data = { folder: 'Trails' };

            const formData = new FormData();

            formData.append('data', JSON.stringify(data));

            const possibleFilesCountForUpload = MAX_PHOTO_COUNT_FOR_UPLOAD - photos.length;
            const filesForUpload = Array.from(files).slice(0, possibleFilesCountForUpload);

            filesForUpload.forEach((file) => {
                formData.append(`file`, file);
            });

            const isUpload = true;

            try {
                const res = await agent.apiTrails.uploadPhotos(trail.id, token, formData, isUpload);

                if (res.data) {
                    if (Array.from(files).length + photos.length > MAX_PHOTO_COUNT_FOR_UPLOAD) {
                        toast.info(t('uploaded-photos-info', { count: possibleFilesCountForUpload }));
                    }

                    setPhotos([...photos, ...res.data]);

                    toast.success(t('success-upload-photos'));
                } else if (res.message) {
                    toast.error(res.message);
                } else if (res.errors) {
                    toast.error(res.errors[0]);
                }
            } catch (err) {
                console.error('Error uploading photos' + err);
            }
        }
    };

    const handleCheckboxClick = (id: number) => {
        photosForDelete.includes(id)
            ? setPhotosForDelete(photosForDelete.filter(p => p != id))
            : setPhotosForDelete([...photosForDelete, id]);
    };

    const handleDeleteAll = () => {
        photos.forEach((p) => {
            setPhotosForDelete(state => !state.includes(p.id) ? [...state, p.id] : state);
        });

        setShowConfirmationModal(true);
    };

    const handleDeletePhotos = () => {
        console.log('Successful remove photos' + photosForDelete);
    };

    return (
        <section className="photos-wrapper details-page-section">
            {isOwner && (
                <div className="photos-wrapper__buttons">
                    {photos.length > 0 && (
                        <>
                            {isDeletePhotosClick && (
                                <>
                                    <button onClick={handleDeleteAll}>
                                        <span>{t('delete-all')}</span>
                                        <BiSolidSelectMultiple style={{ fontSize: '1.25rem', color: 'red' }} />
                                    </button>
                                    <button onClick={() => {
                                        setPhotosForDelete([]);
                                        setIsDeletePhotosClick(false);
                                    }}>
                                        <span>{t('cancel-btn')}</span><FcCancel style={{ fontSize: '1.25rem' }} />
                                    </button>
                                </>
                            )}

                            <button onClick={() => photosForDelete.length > 0
                                ? setShowConfirmationModal(true)
                                : (
                                    setIsDeletePhotosClick(true),
                                    setChangeMainClick(false)
                                )}
                            >
                                <span>{photosForDelete.length > 0 ? t('delete-marked') : t('delete-photos')}</span>
                                <ImBin style={{ color: 'red' }} />
                            </button>

                            <button onClick={() => {
                                setChangeMainClick(!changeMainClick);
                                setPhotosForDelete([]);
                                setIsDeletePhotosClick(false);
                            }}>
                                <span>{changeMainClick ? t('cancel-btn') : t('change-main')}</span>
                                <FcStackOfPhotos style={{ fontSize: '1.3rem' }} />
                            </button>
                        </>
                    )}

                    {photos.length < 10 && (
                        <form className="photos-wrapper__buttons__form">
                            <label htmlFor="photos-file">
                                <span>{t('upload-photos')} <MdAddAPhoto style={{ fontSize: '1.25rem' }} /></span>
                            </label>
                            <input onChange={handleFileUpload} type="file" accept="image/*" multiple id="photos-file" />
                        </form>
                    )}
                </div>
            )}

            {showConfirmationModal && (
                <CConfirmationModal
                    deletionObj={photosForDelete.length == photos.length ? t('all-photos') : t('marked-photos')}
                    confirm={handleDeletePhotos}
                    cancel={() => setShowConfirmationModal(false)}
                />
            )}

            {photos.length > 0 && (
                <div className="photos-wrapper__photos" style={{ marginTop: (isOwner ? '2rem' : '0') }}>
                    <TrailDetailsPhotos
                        photos={photos}
                        isOwner={isOwner}
                        changeMainClick={changeMainClick}
                        isDeletePhotosClick={isDeletePhotosClick}
                        handleCheckboxClick={handleCheckboxClick}
                        photosForDelete={photosForDelete}
                    />

                    {isOwner && (
                        <p className="photos-wrapper__photos__limit-message">
                            <span style={{ color: 'red', fontSize: '1.25rem' }}>*</span>
                            <em>{t('limit-photos-message', { max: MAX_PHOTO_COUNT_FOR_UPLOAD })}</em>
                        </p>
                    )}
                </div>
            )}
        </section>
    );
};

export default TrailDetailsPhotosSection;