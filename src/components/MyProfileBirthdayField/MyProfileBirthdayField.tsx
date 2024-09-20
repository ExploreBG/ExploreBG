'use client';

import React, { useState, useRef } from 'react';
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
import { agent } from '@/api/agent';
import useCloseOnEscapeTabAndClickOutside from '@/hooks/useCloseOnEscapeTabAndClickOutside';

import CSubmitButton from '../common/CSubmitButton/CSubmitButton';

interface MyProfileBirthdayFieldProps {
    birthday: string | null;
    token: string;
}

const MyProfileBirthdayField: React.FC<MyProfileBirthdayFieldProps> = ({ birthday, token }) => {
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

            if (inputData == birthDateValue) {
                setIsVisible(false);
                return;
            }

            const newData = { birthdate: inputData };

            try {
                const res = await agent.apiUsers.updateBirthDate(token, newData);

                if (res.data) {
                    setBirthDateValue(res.data.birthDate);
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

    const formRef = useRef<HTMLFormElement>(null);

    useCloseOnEscapeTabAndClickOutside(formRef, () => setIsVisible(false));

    return (
        <div>
            <p style={{ opacity: (isVisible ? '0' : '1') }}>
                <LiaBirthdayCakeSolid /> {t('birthday')}:&nbsp;&nbsp;
                <strong>{birthDateValue ? formatDate(birthDateValue) : '.....'}</strong>
                <FaEdit className="edit" onClick={() => setIsVisible(!isVisible)} />
            </p>

            <form
                id={form.id}
                onSubmit={form.onSubmit}
                action={action}
                noValidate
                ref={formRef}
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
        </div>
    );
};

export default MyProfileBirthdayField;