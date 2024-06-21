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
import { getToken } from '@/utils/userSession';
import { agent } from '@/api/agent';

import CSubmitButton from '../common/CSubmitButton/CSubmitButton';

interface MyProfileUsernameFieldProps {
    initialUsername: string
    userId: string
}

export const MyProfileUsernameField: React.FC<MyProfileUsernameFieldProps> = ({ initialUsername, userId }) => {
    const t = useTranslations('my-profile');
    const t2 = useTranslations('login-register');
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [username, setUsername] = useState<string>(initialUsername);
    const [lastResult, action] = useFormState(changeUsername, undefined);
    const [form, fields] = useForm({
        lastResult,
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',

        onValidate({ formData }) {
            return parseWithZod(formData, { schema: usernameSchema });
        },

        async onSubmit(event, context) {
            const inputData = context.submission?.payload.username;

            const token = await getToken();
            const newUsername = { username: inputData };

            try {
                const res = await agent.apiUsers.updateUsername(userId, token, newUsername);

                if (res.username) {
                    setUsername(res.username);
                    toast.success(t('successful-update-username'));
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
                    defaultValue={username}
                    className="username-field"
                />

                <CSubmitButton buttonName={t('change-btn')} />
                <button type='button' onClick={() => setIsVisible(!isVisible)}>{t('cancel-btn')}</button>
            </form>

            <div style={{ display: (isVisible ? 'block' : 'none') }} className="error-message">
                {fields.username.errors && t2(fields.username.errors[0])}
            </div>
        </div>
    );
};

export default MyProfileUsernameField;