'use client';

import React, { useState } from 'react';
import { useFormState } from 'react-dom';
import { useTranslations } from 'next-intl';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { changeUserInfo } from './action';
import { infoSchema, userInfoMaxLength } from './infoSchema';
import { getToken } from '@/utils/userSession';
import { agent } from '@/api/agent';

import CSubmitButton from '../common/CSubmitButton/CSubmitButton';

interface MyProfileInfoFieldProps {
    userInfo: string | null
    userId: string
}

export const MyProfileInfoField: React.FC<MyProfileInfoFieldProps> = ({ userInfo, userId }) => {
    const t = useTranslations('my-profile');
    const [infoValue, setInfoValue] = useState<string | null>(userInfo);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [lastResult, action] = useFormState(changeUserInfo, undefined);
    const [form, fields] = useForm({
        lastResult,
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',

        onValidate({ formData }) {
            return parseWithZod(formData, { schema: infoSchema });
        },

        async onSubmit(event, context) {
            const inputData = context.submission?.payload.userInfo;

            const token = await getToken();
            const newData = { userInfo: inputData };

            try {
                const res = await agent.apiUsers.updateUserInfo(userId, token, newData);

                if (res.userInfo) {
                    setInfoValue(res.userInfo);
                    toast.success(t('successful-update-info'));
                    setIsVisible(!isVisible);
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
        <div>
            <p
                style={{ display: (isVisible ? 'none' : 'block') }}
                className="info-text"
            >
                {infoValue ?? <><span>{t('my-info')}: </span><strong>.........</strong></>} &nbsp;
                <FaEdit className="edit" onClick={() => setIsVisible(!isVisible)} />
            </p>

            <form
                id={form.id}
                onSubmit={form.onSubmit}
                action={action}
                noValidate
                style={{ display: (isVisible ? 'flex' : 'none') }}
                className="form-info"
            >
                <textarea
                    key={fields.userInfo.key}
                    name={fields.userInfo.name}
                    defaultValue={infoValue ?? ''}
                    // cols={30} rows={10}
                    className='info-field'
                    placeholder=' ........'
                ></textarea>

                <div>
                    <CSubmitButton buttonName={t('change-btn')} />
                    <button type='button' onClick={() => setIsVisible(!isVisible)}>{t('cancel-btn')}</button>
                </div>
            </form>

            <div style={{ display: (isVisible ? 'block' : 'none') }} className="error-message">
                {fields.userInfo.errors && t(fields.userInfo.errors[0], { maxLength: userInfoMaxLength })}
            </div>
        </div>
    );
};

export default MyProfileInfoField;