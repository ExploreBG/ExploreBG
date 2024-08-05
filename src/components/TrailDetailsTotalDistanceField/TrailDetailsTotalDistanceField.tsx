'use client';

import React, { useState, useRef } from 'react';
import { useFormState } from 'react-dom';
import { useTranslations } from 'next-intl';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { GiPathDistance } from 'react-icons/gi';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { updateTotalDistance } from './action';
import { totalDistanceSchema } from './totalDistanceSchema';
import { getSession } from '@/utils/userSession';
import { agent } from '@/api/agent';
import useCloseOnEscapeTabAndClickOutside from '@/hooks/useCloseOnEscapeTabAndClickOutside'

import CSubmitButton from '../common/CSubmitButton/CSubmitButton';

interface TrailDetailsTotalDistanceFieldProps {
    initialTotalDistance: number
    trailId: number
    isTrailOwner: boolean
}

const TrailDetailsTotalDistanceField: React.FC<TrailDetailsTotalDistanceFieldProps> = ({
    initialTotalDistance, trailId, isTrailOwner
}) => {
    const t = useTranslations('trail-details');
    const t2 = useTranslations('trail-create');
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [totalDistance, setTotalDistance] = useState<number | string>(initialTotalDistance);
    const [lastResult, action] = useFormState(updateTotalDistance, undefined);
    const [form, fields] = useForm({
        lastResult,
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',

        onValidate({ formData }) {
            return parseWithZod(formData, { schema: totalDistanceSchema });
        },

        async onSubmit(event, context) {
            const inputData = context.submission?.payload.totalDistance;

            if (Number(inputData) === totalDistance || inputData === '') {
                setIsVisible(false);
                return;
            }

            const session = await getSession();
            const token = session?.token;
            const newData = { totalDistance: Number(inputData) };

            try {
                const res = await agent.apiTrails.updateTotalDistance(trailId, token!, newData);

                if (res.data) {
                    setTotalDistance(res.data.totalDistance);
                    toast.success(t('successful-update-total-distance'));
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
    });

    const formRef = useRef<HTMLFormElement>(null);

    useCloseOnEscapeTabAndClickOutside(formRef, () => setIsVisible(false));

    return (
        <div className="trail__pair__field-wrapper">
            <div className="trail__pair__field-wrapper__field">
                <p>
                    <GiPathDistance />&nbsp; {t('distance')}: &nbsp;
                    {totalDistance ? `${totalDistance} km` : `${t('not-available')}`}
                </p>
                {isTrailOwner && <FaEdit className="trail-edit-icon" onClick={() => setIsVisible(!isVisible)} />}
            </div>

            <div className="trail__pair__field-wrapper__form">
                <form
                    id={form.id}
                    onSubmit={form.onSubmit}
                    action={action}
                    noValidate
                    ref={formRef}
                    style={{ display: (isVisible ? 'flex' : 'none') }}
                >
                    <input
                        type="text"
                        key={fields.totalDistance.key}
                        name={fields.totalDistance.name}
                        defaultValue={totalDistance}
                    />

                    <CSubmitButton buttonName={t('change-btn')} />
                    <button type='button' onClick={() => setIsVisible(!isVisible)}>{t('cancel-btn')}</button>
                </form>

                <div style={{ display: (isVisible ? 'block' : 'none') }} className="error-message">
                    {fields.totalDistance.errors && t2(fields.totalDistance.errors[0])}
                </div>
            </div>
        </div>
    );
};

export default TrailDetailsTotalDistanceField;