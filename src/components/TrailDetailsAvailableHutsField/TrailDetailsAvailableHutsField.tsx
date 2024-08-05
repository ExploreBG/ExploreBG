'use client';

import React, { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { GiWoodCabin } from "react-icons/gi";
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { IHut } from '@/interfaces/interfaces';
import { agent } from '@/api/agent';
import useCloseOnEscapeTabAndClickOutside from '@/hooks/useCloseOnEscapeTabAndClickOutside';

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

    const initialInputData: { id: number; }[] | (() => { id: number; }[]) = [];
    initialAvailableHuts.map(h => initialInputData.push({ id: h.id }));
    const [inputData, setInputData] = useState<{ id: number }[]>(initialInputData);
    const formRef = useRef<HTMLDivElement>(null);

    useCloseOnEscapeTabAndClickOutside(formRef, () => setIsVisible(false));

    const onSubmitChanges = async () => {

        if (JSON.stringify(initialInputData) === JSON.stringify(inputData)) {
            setIsVisible(false);
            return;
        }

        const newData = { availableHuts: inputData }

        try {
            const res = await agent.apiTrails.updateAvailableHuts(trailId, token!, newData);

            if (res.data) {
                setAvailableHuts(res.data);
                toast.success(t('successful-update-available-huts'));
                setIsVisible(false);
            } else if (res.message) {
                toast.error(res.message);
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="trail__links__wrapper">
            <h4>
                <GiWoodCabin />&nbsp; {t('lodges-in-the-area')}:
                {isTrailOwner && (
                    <FaEdit
                        className="trail-edit-icon"
                        style={{
                            opacity: (isVisible ? '0' : '1'),
                            cursor: (isVisible ? 'none' : 'pointer')
                        }}
                        onClick={() => setIsVisible(!isVisible)}
                    />
                )}
            </h4>

            <div className="trail__links__wrapper__field">
                {availableHuts?.length > 0
                    ? availableHuts.map((h) => (
                        <Link
                            key={h.id}
                            href={{
                                pathname: '/accommodations/[accommodationId]',
                                params: { accommodationId: h.id }
                            }}
                            style={{
                                opacity: (isVisible ? '0' : '1'),
                                cursor: (isVisible ? 'none' : 'pointer')
                            }}
                        >
                            / {h.accommodationName} /
                        </Link>
                    ))
                    : <p>{t('not-available')}</p>
                }

                <div
                    ref={formRef}
                    className="trail__links__wrapper__field__form"
                    style={{ display: (isVisible ? 'flex' : 'none') }}
                >
                    <CFormInputSearch
                        suggestions={availableAccommodations}
                        onAddSelection={(selectedValue) => setInputData([...inputData, selectedValue])}
                        onRemoveSelection={(id) => setInputData(inputData.filter(h => h.id !== id))}
                        getSuggestionLabel={(suggestion) => suggestion.accommodationName}
                        initialValues={initialAvailableHuts}
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