'use client';

import React, { useState } from 'react';
import { useFormState } from 'react-dom';
import { useTranslations } from 'next-intl';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { HiOutlineMail } from 'react-icons/hi';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { changeEmail } from './action';
import { emailSchema } from './emailSchema';
import { getToken } from '@/utils/userSession';
import { agent } from '@/api/agent';

import CSubmitButton from '../common/CSubmitButton/CSubmitButton';

interface MyProfileEmailFieldProps {
    initialEmail: string
    userId: string
}

export const MyProfileEmailField: React.FC<MyProfileEmailFieldProps> = ({ initialEmail, userId }) => {
    const t = useTranslations('my-profile');
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [email, setEmail] = useState<string>(initialEmail);
    const [lastResult, action] = useFormState(changeEmail, undefined);
    const [form, fields] = useForm({
        lastResult,
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',

        onValidate({ formData }) {
            return parseWithZod(formData, { schema: emailSchema });
        },

        async onSubmit(event, context) {
            const inputData = context.submission?.payload.email;

            const token = await getToken();
            const newEmail = { email: inputData };

            const res = await agent.apiUsers.updateEmail(userId, token, newEmail);

            if (res.email) {
                setEmail(res.email);
                toast.success(t('successful-update-email'));
                setIsVisible(false);
            } else if (res.message) {
                toast.error(res.message);
            } else if (res.errors) {
                toast.error(res.errors[0]);
            }
        }
    });

    return (
        <div>
            <p style={{ display: (isVisible ? 'none' : 'block') }}>
                <HiOutlineMail /> <strong>{email}</strong>
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
                    type="email"
                    key={fields.email.key}
                    name={fields.email.name}
                    defaultValue={fields.email.initialValue}
                    className="email-field"
                />

                <CSubmitButton buttonName={t('change-btn')} />
                <button type='button' onClick={() => setIsVisible(!isVisible)}>{t('cancel-btn')}</button>
            </form>

            <div style={{ display: (isVisible ? 'block' : 'none') }} className="error-message">
                {fields.email.errors && t(fields.email.errors[0])}
            </div>
        </div>
    );
};

export default MyProfileEmailField;