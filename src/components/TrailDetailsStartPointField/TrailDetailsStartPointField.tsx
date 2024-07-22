'use client';

import React, { useState } from 'react';
import { useFormState } from 'react-dom';
import { useTranslations } from 'next-intl';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { updateStartPoint } from './action';
import { startPointSchema } from './startPointSchema';
import { trailPlaceMinLength, trailPlaceMaxLength } from '@/utils/validations';
import { getToken } from '@/utils/userSession';
import { agent } from '@/api/agent';

import CSubmitButton from '../common/CSubmitButton/CSubmitButton';

interface TrailDetailsStartPointFieldProps {
    initialStartPoint: string
    trailId: number
    isTrailOwner: boolean
}

const TrailDetailsStartPointField: React.FC<TrailDetailsStartPointFieldProps> = ({
    initialStartPoint, trailId, isTrailOwner
}) => {
    const t = useTranslations('trail-details');
    const t2 = useTranslations('trail-create');
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [startPoint, setStartPoint] = useState<string>(initialStartPoint);
    const [lastResult, action] = useFormState(updateStartPoint, undefined);
    const [form, fields] = useForm({
        lastResult,
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',

        onValidate({ formData }) {
            return parseWithZod(formData, { schema: startPointSchema });
        },

        async onSubmit(event, context) {
            const inputData = context.submission?.payload.startPoint;

            if (inputData === startPoint) {
                setIsVisible(false);
                return;
            }

            const token = await getToken();
            const newData = { startPoint: inputData };

            try {
                const res = await agent.apiTrails.updateStartPoint(trailId, token, newData);

                if (res.startPoint) {
                    setStartPoint(res.startPoint);
                    toast.success(t('successful-update-start-point'));
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

    return (
        <div className="trail__pair__field-wrapper">
            <div className="trail__pair__field-wrapper__field">
                <details open>
                    <summary>{t('from')}: <strong>{startPoint}</strong></summary>
                    {/* <GrMapLocation />&nbsp; 018293794663487685 */}
                </details>
                {isTrailOwner && <FaEdit className="edit" onClick={() => setIsVisible(!isVisible)} />}
            </div>

            <div className="trail__pair__field-wrapper__form">
                <form
                    id={form.id}
                    onSubmit={form.onSubmit}
                    action={action}
                    noValidate
                    style={{ display: (isVisible ? 'flex' : 'none') }}
                >
                    <input
                        type="text"
                        key={fields.startPoint.key}
                        name={fields.startPoint.name}
                        defaultValue={startPoint}
                    />

                    <CSubmitButton buttonName={t('change-btn')} />
                    <button type='button' onClick={() => setIsVisible(!isVisible)}>{t('cancel-btn')}</button>
                </form>

                <div style={{ display: (isVisible ? 'block' : 'none') }} className="error-message">
                    {fields.startPoint.errors && t2(fields.startPoint.errors[0], { minLength: trailPlaceMinLength, maxLength: trailPlaceMaxLength })}
                </div>
            </div>
        </div>
    );
};

export default TrailDetailsStartPointField;