'use client';

import React, { useState } from 'react';
import { useFormState } from 'react-dom';
import { useTranslations } from 'next-intl';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { FaUserNinja, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { changeUsername } from './action';
import { usernameSchema } from './usernameSchema';

import CSubmitButton from '../common/CSubmitButton/CSubmitButton';

interface MyProfileUsernameFieldProps {
    username: string
}

export const MyProfileUsernameField: React.FC<MyProfileUsernameFieldProps> = ({ username }) => {
    const t = useTranslations('my-profile');
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [lastResult, action] = useFormState(changeUsername, undefined);
    const [form, fields] = useForm({
        lastResult,
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',

        onValidate({ formData }) {
            return parseWithZod(formData, { schema: usernameSchema });
        },

        onSubmit(event, context) {
            const inputData = context.submission?.payload.username;

            console.log(inputData);

            toast.success(t('successful-update-username'));
            setIsVisible(false);
        }
    });

    const translateErrors = (error: string[] | undefined): string | undefined => {
        if (error && error[0] === 'Username is required!') {
            return t('err-username-require');
        } else if (error && error[0] === 'Username must contain at least 3 characters!') {
            return t('err-username-length');
        }
    };

    return (
        <div>
            <p style={{ display: (isVisible ? 'none' : 'block') }}>
                <FaUserNinja />&nbsp;<strong>{username}</strong>&nbsp;
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
                    type="text"
                    key={fields.username.key}
                    name={fields.username.name}
                    defaultValue={fields.username.initialValue}
                    className="username-field"
                />

                <CSubmitButton buttonName={t('change-btn')} />
                <button type='button' onClick={() => setIsVisible(!isVisible)}>{t('cancel-btn')}</button>
            </form>

            <div style={{ display: (isVisible ? 'block' : 'none') }} className="error-message">
                {translateErrors(fields.username.errors)}
            </div>
        </div>
    );
};

export default MyProfileUsernameField;