import React, { Dispatch, SetStateAction } from 'react';
import { useTranslations } from 'next-intl';
import { MdAddAPhoto } from 'react-icons/md';
import { toast } from 'react-toastify';

import { TPhoto } from '@/interfaces/interfaces';
import { useTrailPhotosCtx } from '@/contexts/TrailPhotosContext';
import { MAX_PHOTO_COUNT_FOR_UPLOAD } from '@/utils/constants';
import { compressImages } from '@/utils/utils';
import { agent } from '@/api/agent';

interface TrailDetailsUploadPhotosProps {
    photos: TPhoto[];
    setPhotos: Dispatch<SetStateAction<TPhoto[]>>;
    trailId: number;
    token?: string;
}

const TrailDetailsUploadPhotos: React.FC<TrailDetailsUploadPhotosProps> = ({
    photos, setPhotos, trailId, token
}) => {
    const t = useTranslations('trail-details');
    const { setIsUploading } = useTrailPhotosCtx();

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget?.files;

        if (!token) {
            toast.error(t('missing-token'));
            return;
        }

        if (files) {
            if (Array.from(files).length == 0) {
                return;
            }

            setIsUploading(true);
            const data = { folder: 'Trails' };

            const formData = new FormData();

            formData.append('data', JSON.stringify(data));

            const possibleFilesCountForUpload = MAX_PHOTO_COUNT_FOR_UPLOAD - photos.length;
            const filesForUpload = Array.from(files).slice(0, possibleFilesCountForUpload);
            const compressedFiles = await compressImages(filesForUpload);

            compressedFiles.forEach((file) => {
                file && formData.append(`file`, file);
            });

            const isUpload = true;

            try {
                const res = await agent.apiTrails.uploadPhotos(trailId, token, formData, isUpload);

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
            } finally {
                setIsUploading(false);
            }
        }
    };

    return (
        <form className="photos-wrapper__buttons__form">
            <label htmlFor="photos-file">
                <span>{t('upload-photos')} <MdAddAPhoto style={{ fontSize: '1.25rem' }} /></span>
            </label>
            <input onChange={handleFileUpload} type="file" accept="image/*" multiple id="photos-file" />
        </form>
    );
};

export default TrailDetailsUploadPhotos;