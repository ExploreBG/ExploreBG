'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { FcBinoculars } from "react-icons/fc";
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { IPlace } from '@/interfaces/interfaces';
import { agent } from '@/api/agent';

import CFormInputSearch from '../common/CFormInputSearch/CFormInputSearch';

interface TrailDetailsDestinationsFieldProps {
    initialDestinations: IPlace[]
    trailId: number
    isTrailOwner: boolean
    availableDestinations: IPlace[]
    token?: string
}

const TrailDetailsDestinationsField: React.FC<TrailDetailsDestinationsFieldProps> = ({
    initialDestinations, trailId, isTrailOwner, availableDestinations, token
}) => {
    const t = useTranslations('trail-details');
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [destinations, setDestinations] = useState<IPlace[]>(initialDestinations);

    const initialInputData: { id: number; }[] | (() => { id: number; }[]) = [];
    initialDestinations.map(d => initialInputData.push({ id: d.id }));
    const [inputData, setInputData] = useState<{ id: number }[]>(initialInputData);

    const onSubmitChanges = async () => {

        if (JSON.stringify(initialInputData) === JSON.stringify(inputData)) {
            setIsVisible(false);
            return;
        }

        const newData = { destinations: inputData }

        try {
            const res = await agent.apiTrails.updateDestinations(trailId, token!, newData);

            if (res.data) {
                setDestinations(res.data);
                toast.success(t('successful-update-destinations'));
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
                <FcBinoculars />&nbsp; {t('curious-places')}:
                {isTrailOwner && (
                    <FaEdit
                        className="trail-edit-icon"
                        style={{ display: (isVisible ? 'none' : 'inline') }}
                        onClick={() => setIsVisible(!isVisible)}
                    />
                )}
            </h4>

            <div className="trail__links__wrapper__field">
                {destinations?.length > 0
                    ? destinations.map((d) => (
                        <Link
                            key={d.id}
                            href={{
                                pathname: '/destinations/[destinationId]',
                                params: { destinationId: d.id }
                            }}
                            style={{
                                opacity: (isVisible ? '0' : '1'),
                                cursor: (isVisible ? 'none' : 'pointer')
                            }}
                        >
                            / {d.destinationName} /
                        </Link>
                    ))
                    : <p>{t('not-available')}</p>
                }

                <div
                    className="trail__links__wrapper__field__form"
                    style={{ display: (isVisible ? 'flex' : 'none') }}
                >
                    <CFormInputSearch
                        suggestions={availableDestinations}
                        onAddSelection={(selectedValue) => setInputData([...inputData, selectedValue])}
                        onRemoveSelection={(id) => setInputData(inputData.filter(h => h.id !== id))}
                        getSuggestionLabel={(suggestion) => suggestion.destinationName}
                        initialValues={initialDestinations}
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

export default TrailDetailsDestinationsField;