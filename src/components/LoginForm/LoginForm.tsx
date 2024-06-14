'use client';

import React from 'react';
import { useFormState } from 'react-dom';
import { useTranslations } from 'next-intl';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';

import { login } from './action';
import { loginSchema } from './loginSchema';

import CSubmitButton from '../common/CSubmitButton/CSubmitButton';

interface LoginFormProps { }

export const LoginForm: React.FC<LoginFormProps> = () => {
    const t = useTranslations('login-register');
    const [lastResult, action] = useFormState(login, undefined);
    const [form, fields] = useForm({
        lastResult,
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',

        onValidate({ formData }) {
            return parseWithZod(formData, { schema: loginSchema });
        }
    });

    return (
        <section className="login-register-form">
            <form
                id={form.id}
                onSubmit={form.onSubmit}
                action={action}
                noValidate
            >
                <label htmlFor="email">{t('email')}</label>
                <input
                    type="email"
                    key={fields.email.key}
                    name={fields.email.name}
                    defaultValue={fields.email.initialValue}
                    placeholder='John Doe'
                />
                <div className="error-message">{fields.email.errors}</div>

                <label htmlFor="password">{t('password')}</label>
                <input
                    type="password"
                    key={fields.password.key}
                    name={fields.password.name}
                    defaultValue={fields.password.initialValue}
                    placeholder='*********'
                />
                <div className="error-message">{fields.password.errors}</div>

                <div>
                    <label htmlFor="remember">{t('remember-me')}</label>
                    <input
                        type="checkbox"
                        key={fields.remember.key}
                        name={fields.remember.name}
                        defaultChecked={fields.remember.initialValue === 'on'}
                    />
                </div>

                <CSubmitButton buttonName={t('login-btn')} />
            </form>
        </section>
    );
};

export default LoginForm;