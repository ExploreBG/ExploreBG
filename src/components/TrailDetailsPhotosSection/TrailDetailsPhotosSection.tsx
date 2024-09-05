'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { MdAddAPhoto } from 'react-icons/md';
import { toast } from 'react-toastify';

import { ITrail } from '@/interfaces/interfaces';
import { agent } from '@/api/agent';

import './TrailDetailsPhotosSection.scss';

interface TrailDetailsPhotosSectionProps {
    trail: ITrail;
    token?: string;
    isOwner: boolean;
}

const TrailDetailsPhotosSection: React.FC<TrailDetailsPhotosSectionProps> = ({ trail, token, isOwner }) => {
    const t = useTranslations('trail-details');
    const [photos, setPhotos] = useState<{ id: number, imageUrl: string }[]>(trail.images);

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

            Array.from(files).forEach((file) => {
                formData.append(`file`, file);
            });

            const isUpload = true;

            try {
                const res = await agent.apiTrails.uploadPhotos(trail.id, token, formData, isUpload);

                if (res.data) {
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

    return (
        <section className="photos details-page-section">
            {isOwner && photos.length < 10 && (
                <form className="upload-file">
                    <label htmlFor="photos-file">
                        <span>{t('upload-photos')}</span> <MdAddAPhoto />
                    </label>
                    <input onChange={handleFileUpload} type="file" accept="image/*" multiple id="photos-file" />
                </form>
            )}

            {photos && (
                photos.map((p) => (
                    <Image key={p.id} src={p.imageUrl} width={150} height={150} alt="Trail photo" />
                ))
            )}
        </section>
    );
};

export default TrailDetailsPhotosSection;