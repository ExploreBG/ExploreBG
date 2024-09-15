import React, { Dispatch, SetStateAction } from 'react';
import { useTranslations } from 'next-intl';
import { FcStackOfPhotos } from 'react-icons/fc';
import { ImBin } from 'react-icons/im';
import { FcCancel } from 'react-icons/fc';
import { BiSolidSelectMultiple } from 'react-icons/bi';
import { toast } from 'react-toastify';

import { TPhoto } from '@/interfaces/interfaces';
import { useTrailPhotosCtx } from '@/contexts/TrailPhotosContext';
import { agent } from '@/api/agent';

import TrailDetailsUploadPhotos from '../TrailDetailsUploadPhotos/TrailDetailsUploadPhotos';
import CConfirmationModal from '../common/CConfirmationModal/CConfirmationModal';

interface TrailDetailsPhotosButtonsProps {
    photos: TPhoto[];
    setPhotos: Dispatch<SetStateAction<TPhoto[]>>;
    trailId: number;
    token?: string;
}

const TrailDetailsPhotosButtons: React.FC<TrailDetailsPhotosButtonsProps> = ({
    photos, setPhotos, trailId, token
}) => {
    const t = useTranslations('trail-details');
    const {
        setIsUploading,
        changeMainClick,
        setChangeMainClick,
        isDeletePhotosClick,
        setIsDeletePhotosClick,
        photosForDelete,
        setPhotosForDelete,
        showConfirmationModal,
        setShowConfirmationModal } = useTrailPhotosCtx();

    const handleDeleteAll = () => {
        photos.forEach((p) => {
            setPhotosForDelete(state => !state.includes(p.id) ? [...state, p.id] : state);
        });

        setShowConfirmationModal(true);
    };

    const handleDeletePhotos = async () => {
        if (!token) {
            toast.error(t('missing-token'));
            return;
        }

        setIsUploading(true);
        setShowConfirmationModal(false);

        const body = { folder: 'Trails', ids: photosForDelete };

        try {
            const res = await agent.apiTrails.deletePhotos(trailId, token, body);

            if (res.data) {
                setPhotos(state => {
                    const deleteSet = new Set(photosForDelete);

                    const isMainDeleted = state.some((s) => s.isMain && deleteSet.has(s.id));

                    return state
                        .filter((s) => !deleteSet.has(s.id))
                        .map((item, index) => {
                            if (isMainDeleted && index == 0) {
                                return { ...item, isMain: true };
                            } else if (!isMainDeleted) {
                                return item;
                            } else {
                                return { ...item, isMain: false };
                            }
                        });
                });

                setPhotosForDelete([]);
                setIsDeletePhotosClick(false);
                toast.success(photosForDelete.length > 1 ? t('success-delete-photos') : t('success-delete-photo'));
            } else if (res.message) {
                toast.error(res.message);
            } else if (res.errors) {
                toast.error(res.errors[0]);
            }
        } catch (err) {
            console.error('Error deleting photos: ', err);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <>
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
                    <TrailDetailsUploadPhotos
                        photos={photos}
                        setPhotos={setPhotos}
                        trailId={trailId}
                        token={token}
                    />
                )}
            </div>

            {showConfirmationModal && (
                <CConfirmationModal
                    deletionObj={photosForDelete.length == photos.length ? t('all-photos') : t('marked-photos')}
                    confirm={handleDeletePhotos}
                    cancel={() => {
                        setShowConfirmationModal(false);
                        setPhotosForDelete([]);
                    }}
                />
            )}
        </>
    );
};

export default TrailDetailsPhotosButtons;