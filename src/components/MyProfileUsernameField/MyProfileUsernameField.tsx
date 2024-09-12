'use client';

import React, { useState, useRef } from 'react';
import { useFormState } from 'react-dom';
import { useTranslations } from 'next-intl';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { FaUserNinja, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { changeUsername } from './action';
import { usernameSchema } from './usernameSchema';
import { usernameMinLength, usernameMaxLength } from '@/utils/validations';
import { agent } from '@/api/agent';
import useCloseOnEscapeTabAndClickOutside from '@/hooks/useCloseOnEscapeTabAndClickOutside';

import CSubmitButton from '../common/CSubmitButton/CSubmitButton';

interface MyProfileUsernameFieldProps {
    initialUsername: string;
    token: string;
}

const MyProfileUsernameField: React.FC<MyProfileUsernameFieldProps> = ({ initialUsername, token }) => {
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

            if (inputData == username) {
                setIsVisible(false);
                return;
            }

            const newUsername = { username: inputData };

            try {
                const res = await agent.apiUsers.updateUsername(token, newUsername);

                if (res.data) {
                    setUsername(res.data.username);
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

    const formRef = useRef<HTMLFormElement>(null);

    useCloseOnEscapeTabAndClickOutside(formRef, () => setIsVisible(false));

    return (
        <div>
            <p style={{ opacity: (isVisible ? '0' : '1') }}>
                <FaUserNinja />&nbsp;<strong>{username}</strong>
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
                    type="text"
                    key={fields.username.key}
                    name={fields.username.name}
                    defaultValue={username}
                    className="username-field"
                />

                <CSubmitButton buttonName={t('change-btn')} />
                <button type='button' onClick={() => setIsVisible(!isVisible)}>{t('cancel-btn')}</button>

                {fields.username.errors && (
                    <div className="error-message">
                        {t2(fields.username.errors[0], {
                            minLength: usernameMinLength, maxLength: usernameMaxLength
                        })}
                    </div>
                )}
            </form>
        </div>
    );
};

export default MyProfileUsernameField;