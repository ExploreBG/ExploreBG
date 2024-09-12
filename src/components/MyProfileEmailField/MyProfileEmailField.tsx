'use client';

import React, { useState, useRef } from 'react';
import { useFormState } from 'react-dom';
import { useTranslations } from 'next-intl';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { HiOutlineMail } from 'react-icons/hi';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { changeEmail } from './action';
import { emailSchema } from './emailSchema';
import { agent } from '@/api/agent';
import useCloseOnEscapeTabAndClickOutside from '@/hooks/useCloseOnEscapeTabAndClickOutside';

import CSubmitButton from '../common/CSubmitButton/CSubmitButton';

interface MyProfileEmailFieldProps {
    initialEmail: string;
    token: string;
}

const MyProfileEmailField: React.FC<MyProfileEmailFieldProps> = ({ initialEmail, token }) => {
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

            if (inputData == email) {
                setIsVisible(false);
                return;
            }

            const newEmail = { email: inputData };

            const res = await agent.apiUsers.updateEmail(token, newEmail);

            if (res.data) {
                setEmail(res.data.email);
                toast.success(t('successful-update-email'));
                setIsVisible(false);
            } else if (res.message) {
                toast.error(res.message);
            } else if (res.errors) {
                toast.error(res.errors[0]);
            }
        }
    });

    const formRef = useRef<HTMLFormElement>(null);

    useCloseOnEscapeTabAndClickOutside(formRef, () => setIsVisible(false));

    return (
        <div>
            <p style={{ opacity: (isVisible ? '0' : '1') }}>
                <HiOutlineMail /> <strong>{email}</strong>
                <FaEdit
                    className="edit"
                    onClick={() => setIsVisible(!isVisible)}
                    style={{ cursor: (isVisible ? 'none' : 'pointer') }}
                />
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
                    type="email"
                    key={fields.email.key}
                    name={fields.email.name}
                    defaultValue={email}
                    className="email-field"
                />

                <CSubmitButton buttonName={t('change-btn')} />
                <button type='button' onClick={() => setIsVisible(!isVisible)}>{t('cancel-btn')}</button>

                {fields.email.errors && <div className="error-message">{t(fields.email.errors[0])}</div>}
            </form>
        </div>
    );
};

export default MyProfileEmailField;