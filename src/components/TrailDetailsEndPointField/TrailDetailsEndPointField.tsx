'use client';

import React, { useState, useRef } from 'react';
import { useFormState } from 'react-dom';
import { useTranslations } from 'next-intl';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { updateEndPoint } from './action';
import { endPointSchema } from './endPointSchema';
import { trailPlaceMinLength, trailPlaceMaxLength } from '@/utils/validations';
import { getSession } from '@/utils/userSession';
import { agent } from '@/api/agent';
import useCloseOnEscapeTabAndClickOutside from '@/hooks/useCloseOnEscapeTabAndClickOutside'

import CSubmitButton from '../common/CSubmitButton/CSubmitButton';

interface TrailDetailsEndPointFieldProps {
    initialEndPoint: string
    trailId: number
    isTrailOwner: boolean
}

const TrailDetailsEndPointField: React.FC<TrailDetailsEndPointFieldProps> = ({
    initialEndPoint, trailId, isTrailOwner
}) => {
    const t = useTranslations('trail-details');
    const t2 = useTranslations('trail-create');
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [endPoint, setEndPoint] = useState<string>(initialEndPoint);
    const [lastResult, action] = useFormState(updateEndPoint, undefined);
    const [form, fields] = useForm({
        lastResult,
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',

        onValidate({ formData }) {
            return parseWithZod(formData, { schema: endPointSchema });
        },

        async onSubmit(event, context) {
            const inputData = context.submission?.payload.endPoint;

            if (inputData === endPoint) {
                setIsVisible(false);
                return;
            }

            const session = await getSession();
            const token = session?.token;
            const newData = { endPoint: inputData };

            try {
                const res = await agent.apiTrails.updateEndPoint(trailId, token!, newData);

                if (res.data) {
                    setEndPoint(res.data.endPoint);
                    toast.success(t('successful-update-end-point'));
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
            <div
                className="trail__pair__field-wrapper__field"
                style={{ opacity: (isVisible ? '0' : '1') }}
            >
                <details open>
                    <summary>{t('to')}: <strong>{endPoint}</strong></summary>
                    {/* <GrMapLocation />&nbsp; 018293794663487685 */}
                </details>
                {isTrailOwner && (
                    <FaEdit
                        onClick={() => setIsVisible(!isVisible)}
                        className="trail-edit-icon"
                        style={{ cursor: (isVisible ? 'none' : 'pointer') }}
                    />
                )}
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
                        key={fields.endPoint.key}
                        name={fields.endPoint.name}
                        defaultValue={endPoint}
                    />

                    <CSubmitButton buttonName={t('change-btn')} />
                    <button type='button' onClick={() => setIsVisible(!isVisible)}>{t('cancel-btn')}</button>
                </form>

                <div style={{ display: (isVisible ? 'block' : 'none') }} className="error-message">
                    {fields.endPoint.errors && t2(fields.endPoint.errors[0], {
                        minLength: trailPlaceMinLength, maxLength: trailPlaceMaxLength
                    })}
                </div>
            </div>
        </div>
    );
};

export default TrailDetailsEndPointField;