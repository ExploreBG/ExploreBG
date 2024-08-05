'use client';

import React, { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { FaHandHoldingWater, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { IFormEnums } from '@/interfaces/interfaces';
import { getSession } from '@/utils/userSession';
import { agent } from '@/api/agent';
import useCloseOnEscapeTabAndClickOutside from '@/hooks/useCloseOnEscapeTabAndClickOutside'

import CSubmitButton from '../common/CSubmitButton/CSubmitButton';

interface TrailDetailsWaterAvailableFieldProps {
    initialWaterAvailable: string
    trailId: number
    isTrailOwner: boolean
    formEnums: IFormEnums
}

const TrailDetailsWaterAvailableField: React.FC<TrailDetailsWaterAvailableFieldProps> = ({
    initialWaterAvailable, trailId, isTrailOwner, formEnums
}) => {
    const t = useTranslations('trail-details');
    const t2 = useTranslations('trail-create');
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [waterAvailable, setWaterAvailable] = useState<string>(initialWaterAvailable);
    const [inputData, setInputData] = useState<string>(initialWaterAvailable);
    const formRef = useRef<HTMLFormElement>(null);

    useCloseOnEscapeTabAndClickOutside(formRef, () => setIsVisible(false));

    const onSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();

        if (inputData === waterAvailable) {
            setIsVisible(false);
            return;
        }

        const session = await getSession();
        const token = session?.token;
        const newData = { waterAvailable: inputData };

        try {
            const res = await agent.apiTrails.updateWaterAvailable(trailId, token!, newData);

            if (res.data) {
                setWaterAvailable(res.data.waterAvailable);
                toast.success(t('successful-update-water-available'));
                setIsVisible(false);
            } else if (res.message) {
                toast.error(res.message);
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
                <p>
                    <FaHandHoldingWater />&nbsp;&nbsp;
                    {t('water-sources')}: &nbsp;{t2(waterAvailable)}
                </p>
                {isTrailOwner && (
                    <FaEdit
                        className="trail-edit-icon"
                        style={{ cursor: (isVisible ? 'none' : 'pointer') }}
                        onClick={() => setIsVisible(!isVisible)}
                    />
                )}
            </div>

            <div className="trail__pair__field-wrapper__form">
                <form
                    ref={formRef}
                    onSubmit={onSubmitForm}
                    style={{ display: (isVisible ? 'flex' : 'none') }}
                >
                    <select
                        name="waterAvailable"
                        value={inputData}
                        onChange={(e) => setInputData(e.target.value)}
                    >
                        {formEnums.waterAvailable && formEnums.waterAvailable.map(v => (
                            <option key={v} value={v}>{t2(v)}</option>
                        ))}
                    </select>

                    <CSubmitButton buttonName={t('change-btn')} />
                    <button type='button' onClick={() => setIsVisible(!isVisible)}>{t('cancel-btn')}</button>
                </form>
            </div>
        </div>
    );
};

export default TrailDetailsWaterAvailableField;