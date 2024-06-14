'use client';

import React from 'react';
import { useFormState } from 'react-dom';
import { useTranslations } from 'next-intl';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';

import { register } from './action';
import { registerSchema } from './registerSchema';
import { passwordErrors } from '@/utils/validations';

import CPasswordInfo from '../common/CPasswordInfo/CPasswordInfo';
import CSubmitButton from '../common/CSubmitButton/CSubmitButton';

interface RegisterFormProps { }

export const RegisterForm: React.FC<RegisterFormProps> = () => {
    const t = useTranslations('login-register');
    const [lastResult, action] = useFormState(register, undefined);
    const [form, fields] = useForm({
        lastResult,
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',

        onValidate({ formData }) {
            return parseWithZod(formData, { schema: registerSchema });
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
                <label htmlFor="email">{ t('email')}</label>
                <input
                    type="email"
                    key={fields.email.key}
                    name={fields.email.name}
                    defaultValue={fields.email.initialValue}
                    placeholder='john.doe@gmail.com'
                />
                <div className="error-message">{fields.email.errors}</div>

                <label htmlFor="username">{t('username')}</label>
                <input
                    type="text"
                    key={fields.username.key}
                    name={fields.username.name}
                    defaultValue={fields.username.initialValue}
                    placeholder='John Doe'
                />
                <div className="error-message">{fields.username.errors}</div>

                <label htmlFor="password">{t('password')} &nbsp;
                    <CPasswordInfo />
                </label>
                <input
                    type="password"
                    key={fields.password.key}
                    name={fields.password.name}
                    defaultValue={fields.password.initialValue}
                    placeholder='*********'
                />
                <div className="error-message">{passwordErrors(fields.password.errors)}</div>

                <label htmlFor="confirmPassword">{t('confirm-pass')}</label>
                <input
                    type="password"
                    key={fields.confirmPassword.key}
                    name={fields.confirmPassword.name}
                    defaultValue={fields.confirmPassword.initialValue}
                    placeholder='*********'
                />
                <div className="error-message">{fields.confirmPassword.errors}</div>

                <CSubmitButton buttonName={t('register-btn')} />
            </form>
        </section>
    );
};

export default RegisterForm;