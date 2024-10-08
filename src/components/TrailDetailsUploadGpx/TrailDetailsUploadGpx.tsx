import React, { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { FaFileUpload, FaDownload } from 'react-icons/fa';
import { ImBin } from 'react-icons/im';
import { toast } from 'react-toastify';

import { agent } from '@/api/agent';

interface TrailDetailsUploadGpxProps {
    trailId: number;
    token: string;
    track: string | null;
    setGpx: Dispatch<SetStateAction<string | null>>;
    setCreationDate: Dispatch<SetStateAction<string>>;
}

const TrailDetailsUploadGpx: React.FC<TrailDetailsUploadGpxProps> = ({
    trailId, token, track, setGpx, setCreationDate
}) => {
    const t = useTranslations('trail-details');

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files?.[0];

        if (file) {
            const formData = new FormData();

            formData.append('file', file);
            const isUpload = true;

            try {
                const res = await agent.apiTrails.uploadGpxFile(trailId, token, formData, isUpload);

                if (res.data) {
                    setGpx(res.data.gpxUrl);
                    setCreationDate(res.data.creationDate);
                    toast.success(t('successful-upload'));
                } else if (res.message) {
                    toast.error(res.message);
                } else if (res.errors) {
                    toast.error(res.errors[0]);
                }
            } catch (err) {
                console.error(err);
            }
        }
    };

    const onRemoveGpx = async () => {
        const res = await agent.apiTrails.removeGpxFile(trailId, token);

        if (res.data) {
            setGpx(null);
            setCreationDate('');
            toast.success(t('successful-remove-gpx'));
        } else if (res.message) {
            toast.error(res.message);
        }
    };

    return (
        <aside className="map__buttons">
            {track && (
                <Link href={track} download>
                    {t('download-gpx')} <FaDownload />
                </Link>
            )}

            {!track && (
                <form>
                    <label htmlFor="file-input">
                        <span>{t('upload-gpx')} <FaFileUpload style={{ fontSize: '1.25rem' }} /></span>
                    </label>
                    <input onChange={handleFileUpload} type="file" accept=".gpx" id="file-input" />
                </form>
            )}

            {track && (
                <div onClick={onRemoveGpx}>
                    <label>
                        <span >{t('remove-gpx')} <ImBin style={{ color: 'red' }} /></span>
                    </label>
                </div>
            )}
        </aside>
    );
};

export default TrailDetailsUploadGpx;