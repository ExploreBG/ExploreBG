'use client';

import React, { useState } from 'react';
import { useFormState } from 'react-dom';
import { useTranslations } from 'next-intl';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { LiaBirthdayCakeSolid } from 'react-icons/lia';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { formatDate } from '@/utils/utils';
import { changeBirthDate } from './action';
import { birthDateSchema } from './birthDateSchema';
import { getToken } from '@/utils/userSession';
import { agent } from '@/api/agent';

import CSubmitButton from '../common/CSubmitButton/CSubmitButton';

interface MyProfileBirthdayFieldProps {
    birthday: string | null
    userId: string
}

export const MyProfileBirthdayField: React.FC<MyProfileBirthdayFieldProps> = ({ birthday, userId }) => {
    const t = useTranslations('my-profile');
    const [birthDateValue, setBirthDateValue] = useState<string | null>(birthday);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [lastResult, action] = useFormState(changeBirthDate, undefined);
    const [form, fields] = useForm({
        lastResult,
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',

        onValidate({ formData }) {
            return parseWithZod(formData, { schema: birthDateSchema });
        },

        async onSubmit(event, context) {
            const inputData = context.submission?.payload.birthday;

            const token = await getToken();
            const newData = { birthdate: inputData };

            try {
                const res = await agent.apiUsers.updateBirthDate(userId, token, newData);

                if (res.birthDate) {
                    setBirthDateValue(res.birthDate);
                    toast.success(t('successful-update-birthday'));
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
            <p style={{ display: (isVisible ? 'none' : 'block') }}>
                <LiaBirthdayCakeSolid /> {t('birthday')}: 
                <strong>{birthDateValue ? formatDate(birthDateValue) : '.....'}</strong> &nbsp;
                <FaEdit className="edit" onClick={() => setIsVisible(!isVisible)} />
            </p>

            <form
                id={form.id}
                onSubmit={form.onSubmit}
                action={action}
                noValidate
                style={{ display: (isVisible ? 'flex' : 'none') }}
            >
                <input
                    type="date"
                    key={fields.birthday.key}
                    name={fields.birthday.name}
                    defaultValue={birthDateValue ?? ''}
                    className='birthday-field'
                />

                <CSubmitButton buttonName={t('change-btn')} />
                <button type='button' onClick={() => setIsVisible(!isVisible)}>{t('cancel-btn')}</button>
            </form>

            <div style={{ display: (isVisible ? 'block' : 'none') }} className="error-message">
                {fields.birthday.errors && t(fields.birthday.errors[0])}
            </div>
        </div>
    );
};

export default MyProfileBirthdayField;