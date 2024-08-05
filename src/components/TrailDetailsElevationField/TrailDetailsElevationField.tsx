'use client';

import React, { useState, useRef } from 'react';
import { useFormState } from 'react-dom';
import { useTranslations } from 'next-intl';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { GiMountainRoad } from 'react-icons/gi';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { updateElevation } from './action';
import { elevationSchema } from './elevationSchema';
import { getSession } from '@/utils/userSession';
import { agent } from '@/api/agent';
import useCloseOnEscapeTabAndClickOutside from '@/hooks/useCloseOnEscapeTabAndClickOutside'

import CSubmitButton from '../common/CSubmitButton/CSubmitButton';

interface TrailDetailsElevationFieldProps {
    initialElevation: number
    trailId: number
    isTrailOwner: boolean
}

const TrailDetailsElevationField: React.FC<TrailDetailsElevationFieldProps> = ({
    initialElevation, trailId, isTrailOwner
}) => {
    const t = useTranslations('trail-details');
    const t2 = useTranslations('trail-create');
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [elevationGained, setElevationGained] = useState<number | string>(initialElevation);
    const [lastResult, action] = useFormState(updateElevation, undefined);
    const [form, fields] = useForm({
        lastResult,
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',

        onValidate({ formData }) {
            return parseWithZod(formData, { schema: elevationSchema });
        },

        async onSubmit(event, context) {
            const inputData = context.submission?.payload.elevationGained;

            if (Number(inputData) === elevationGained || inputData === '') {
                setIsVisible(false);
                return;
            }

            const session = await getSession();
            const token = session?.token;
            const newData = { elevationGained: Number(inputData) };

            try {
                const res = await agent.apiTrails.updateElevationGained(trailId, token!, newData);

                if (res.data) {
                    setElevationGained(res.data.elevationGained);
                    toast.success(t('successful-update-elevation'));
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
                    <GiMountainRoad />&nbsp; {t('elevation')}: &nbsp;
                    {elevationGained ? `${elevationGained} m` : `${t('not-available')}`}
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
                        key={fields.elevationGained.key}
                        name={fields.elevationGained.name}
                        defaultValue={elevationGained}
                    />

                    <CSubmitButton buttonName={t('change-btn')} />
                    <button type='button' onClick={() => setIsVisible(!isVisible)}>{t('cancel-btn')}</button>
                </form>

                <div style={{ display: (isVisible ? 'block' : 'none') }} className="error-message">
                    {fields.elevationGained.errors && t2(fields.elevationGained.errors[0])}
                </div>
            </div>
        </div>
    );
};

export default TrailDetailsElevationField;