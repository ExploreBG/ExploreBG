'use client';

import React, { useState } from 'react';
import { useFormState } from 'react-dom';
import { useTranslations } from 'next-intl';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { updateTrailInfo } from './action';
import { trailInfoSchema } from './trailInfoSchema';
import { trailInfoMaxLength } from '@/utils/validations';
import { getToken } from '@/utils/userSession';
import { agent } from '@/api/agent';

import ExpandTextToggle from '../ExpandTextToggle/ExpandTextToggle';
import CSubmitButton from '../common/CSubmitButton/CSubmitButton';

interface TrailDetailsInfoFieldProps {
    initialInfo: string
    trailId: number
    isTrailOwner: boolean
}

const TrailDetailsInfoField: React.FC<TrailDetailsInfoFieldProps> = ({
    initialInfo, trailId, isTrailOwner
}) => {
    const t = useTranslations('trail-details');
    const t2 = useTranslations('trail-create');
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [trailInfo, setTrailInfo] = useState<string>(initialInfo);
    const [lastResult, action] = useFormState(updateTrailInfo, undefined);
    const [form, fields] = useForm({
        lastResult,
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',

        onValidate({ formData }) {
            return parseWithZod(formData, { schema: trailInfoSchema });
        },

        async onSubmit(event, context) {
            const inputData = context.submission?.payload.trailInfo;

            if (inputData === trailInfo) {
                setIsVisible(false);
                return;
            }

            const token = await getToken();
            const newData = { trailInfo: inputData };

            try {
                const res = await agent.apiTrails.updateTrailInfo(trailId, token, newData);

                if (res.data) {
                    setTrailInfo(res.data.trailInfo);
                    toast.success(t('successful-update-trail-info'));
                    setIsVisible(false);
                } else if (res.message) {
                    toast.error(res.message);
                } else if (res.errors) {
                    toast.error(t2(res.errors[0]));
                }
            } catch (err) {
                console.error(err);
            }
        }
    });

    const trailInfoVisibleTextLength = 155;

    return (
        <div
            className="trail__info"
            style={{ cursor: trailInfo.length > trailInfoVisibleTextLength ? 'pointer' : 'unset' }}
        >
            <ExpandTextToggle text={trailInfo} length={trailInfoVisibleTextLength} />
            {isTrailOwner && <FaEdit className="trail-edit-icon" onClick={() => setIsVisible(!isVisible)} />}

            <div className="trail__info__form">
                <form
                    id={form.id}
                    onSubmit={form.onSubmit}
                    action={action}
                    noValidate
                    style={{ display: (isVisible ? 'flex' : 'none') }}
                >
                    <textarea
                        key={fields.trailInfo.key}
                        name={fields.trailInfo.name}
                        defaultValue={trailInfo}
                        cols={30} rows={10}
                    />

                    <div style={{ display: (isVisible ? 'block' : 'none') }} className="error-message">
                        {fields.trailInfo.errors && t2(fields.trailInfo.errors[0], {
                            maxLength: trailInfoMaxLength
                        })}
                    </div>

                    <div>
                        <CSubmitButton buttonName={t('change-btn')} />
                        <button
                            type='button'
                            onClick={() => setIsVisible(!isVisible)}>{t('cancel-btn')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TrailDetailsInfoField;