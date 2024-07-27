'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { GiHiking } from 'react-icons/gi';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { IFormEnums } from '@/interfaces/interfaces';
import { getToken } from '@/utils/userSession';
import { agent } from '@/api/agent';

import CSubmitButton from '../common/CSubmitButton/CSubmitButton';

interface TrailDetailsTrailDifficultyFieldProps {
    initialTrailDifficulty: string
    trailId: number
    isTrailOwner: boolean
    formEnums: IFormEnums
}

const TrailDetailsTrailDifficultyField: React.FC<TrailDetailsTrailDifficultyFieldProps> = ({
    initialTrailDifficulty, trailId, isTrailOwner, formEnums
}) => {
    const t = useTranslations('trail-details');
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [trailDifficulty, setTrailDifficulty] = useState<string>(initialTrailDifficulty);
    const [inputData, setInputData] = useState<string>(initialTrailDifficulty);

    const maxDifficultyLevel = formEnums.trailDifficulty?.length;

    const repeatIcon = (end: number) => {
        let icons = [];
        for (let i = 1; i <= end; i++) {
            icons.push(
                <span key={i}><GiHiking /></span>
            );
        }

        return icons;
    };

    const onSubmitDifficulty = async (e: React.FormEvent) => {
        e.preventDefault();

        if (inputData == trailDifficulty) {
            setIsVisible(false);
            return;
        }

        const token = await getToken();
        const newData = { trailDifficulty: Number(inputData) };

        try {
            const res = await agent.apiTrails.updateTrailDifficulty(trailId, token, newData);

            if (res.data) {
                setTrailDifficulty(res.data.trailDifficulty);
                toast.success(t('successful-update-trail-difficulty'));
                setIsVisible(false);
            } else if (res.message) {
                toast.error(res.message);
            } else if (res.errors) {
                toast.error(res.errors[0]);
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="trail__pair__field-wrapper">
            <div
                style={{ opacity: (isVisible ? '0' : '1') }}
                className="trail__pair__field-wrapper__field"
            >
                <div className="trail__pair__difficulty">
                    {t('difficulty')}:&nbsp;&nbsp;
                    <div>
                        {repeatIcon(Number(trailDifficulty))}
                    </div>
                    <div className="trail__pair__difficulty__empty">
                        {repeatIcon(maxDifficultyLevel - Number(trailDifficulty))}
                    </div>
                </div>
                {isTrailOwner && (
                    <FaEdit
                        className="trail-edit-icon"
                        style={{ cursor: (isVisible ? 'none' : 'pointer') }}
                        onClick={() => setIsVisible(!isVisible)}
                    />
                )}
            </div>

            <div className="trail__pair__field-wrapper__form with-select">
                <form
                    onSubmit={onSubmitDifficulty}
                    style={{ display: (isVisible ? 'flex' : 'none') }}
                >
                    <select
                        name="trailDifficulty"
                        value={inputData}
                        onChange={(e) => setInputData(e.target.value)}
                    >
                        {formEnums.trailDifficulty && formEnums.trailDifficulty.map(v => (
                            <option key={v} value={v}>{v}</option>
                        ))}
                    </select>

                    <CSubmitButton buttonName={t('change-btn')} />
                    <button type='button' onClick={() => setIsVisible(!isVisible)}>{t('cancel-btn')}</button>
                </form>
            </div>
        </div>
    );
};

export default TrailDetailsTrailDifficultyField;