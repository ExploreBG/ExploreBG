'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { BsHouseFill } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { IHut } from '@/interfaces/interfaces';
import { agent } from '@/api/agent';

import CFormInputSearch from '../common/CFormInputSearch/CFormInputSearch';

interface TrailDetailsAvailableHutsFieldProps {
    initialAvailableHuts: IHut[]
    trailId: number
    isTrailOwner: boolean
    availableAccommodations: IHut[]
    token?: string
}

const TrailDetailsAvailableHutsField: React.FC<TrailDetailsAvailableHutsFieldProps> = ({
    initialAvailableHuts, trailId, isTrailOwner, availableAccommodations, token
}) => {
    const t = useTranslations('trail-details');
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [availableHuts, setAvailableHuts] = useState<IHut[]>(initialAvailableHuts);
    const [inputData, setInputData] = useState<{ id: number }[]>([]);

    const onSubmitChanges = async () => {

        if (inputData.length === 0) {
            setIsVisible(false);
            return;
        }

        try {
            const res = await agent.apiTrails.updateAvailableHuts(trailId, token!, inputData);

            if (res.availableHuts) {
                setAvailableHuts(res.availableHuts);
                toast.success(t('successful-update-available-huts'));
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
        <div className="trail__links__wrapper">
            <h4>
                <BsHouseFill />&nbsp; {t('lodges-in-the-area')}:
                {isTrailOwner && (
                    <FaEdit
                        className="trail-edit-icon"
                        style={{ display: (isVisible ? 'none' : 'inline') }}
                        onClick={() => setIsVisible(!isVisible)}
                    />
                )}
            </h4>

            <div className="trail__links__wrapper__field">
                <div style={{ opacity: (isVisible ? '0' : '1') }}>
                    {availableHuts?.length > 0
                        ? availableHuts.map((h) => (
                            <Link key={h.id} href={{
                                pathname: '/accommodations/[accommodationId]',
                                params: { accommodationId: h.id }
                            }}>
                                / {h.accommodationName} /
                            </Link>
                        ))
                        : <p>{t('not-available')}</p>
                    }
                </div>

                <div
                    className="trail__links__wrapper__field__form"
                    style={{ display: (isVisible ? 'flex' : 'none') }}
                >
                    <CFormInputSearch
                        suggestions={availableAccommodations}
                        onAddSelection={(selectedValue) => setInputData([...inputData, selectedValue])}
                        onRemoveSelection={(id) => setInputData(inputData.filter(h => h.id !== id))}
                        getSuggestionLabel={(suggestion) => suggestion.accommodationName}
                    />

                    <div>
                        <button onClick={onSubmitChanges}>{t('change-btn')}</button>
                        <button type='button' onClick={() => setIsVisible(!isVisible)}>
                            {t('cancel-btn')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrailDetailsAvailableHutsField;