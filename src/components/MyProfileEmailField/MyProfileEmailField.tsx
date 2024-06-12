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

import CSubmitButton from '../common/CSubmitButton/CSubmitButton';

interface MyProfileEmailFieldProps { }

export const MyProfileEmailField: React.FC<MyProfileEmailFieldProps> = () => {
    const t = useTranslations('my-profile');
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [lastResult, action] = useFormState(changeEmail, undefined);
    const [form, fields] = useForm({
        lastResult,
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',

        onValidate({ formData }) {
            return parseWithZod(formData, { schema: emailSchema });
        },

        onSubmit(event, context) {
            const inputData = context.submission?.payload.email;

            console.log(inputData);

            toast.success(t('successful-update-email'));
            setIsVisible(false);
        }
    });

    const translateErrors = (error: string[] | undefined): string | undefined => {
        if (error && error[0] === 'Email is required!') {
            return t('err-email-require');
        } else if (error && error[0] === 'Invalid email') {
            return t('err-email-invalid');
        }
    };

    return (
        <div>
            <p style={{ display: (isVisible ? 'none' : 'block') }}>
                <HiOutlineMail /> <strong>shamar@gmail.com</strong>
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
                {translateErrors(fields.email.errors)}
            </div>
        </div>
    );
};

export default MyProfileEmailField;