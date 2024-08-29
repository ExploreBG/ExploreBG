import React, { Dispatch, SetStateAction } from 'react';
import { useTranslations } from 'next-intl';
import { FaFileUpload } from 'react-icons/fa';
import { ImBin } from 'react-icons/im';
import { toast } from 'react-toastify';

import { agent } from '@/api/agent';

interface TrailDetailsUploadGpxProps {
    trailId: number;
    token: string;
    track: string | null;
    setGpx: Dispatch<SetStateAction<string | null>>;
}

const TrailDetailsUploadGpx: React.FC<TrailDetailsUploadGpxProps> = ({ trailId, token, track, setGpx }) => {
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
            toast.success(t('successful-remove-gpx'));
        } else if (res.message) {
            toast.error(res.message);
        }
    };

    return (
        <>
            {!track && (
                <form className="map__gpx">
                    <label htmlFor="file-input">
                        <span>{t('upload-gpx')}</span> <FaFileUpload />
                    </label>
                    <input onChange={handleFileUpload} type="file" accept=".gpx" id="file-input" />
                </form>
            )}

            {track && (
                <div onClick={onRemoveGpx} className="map__gpx">
                    <label>
                        <span >{t('remove-gpx')}</span> <ImBin style={{ color: 'red' }} />
                    </label>
                </div>
            )}
        </>
    );
};

export default TrailDetailsUploadGpx;