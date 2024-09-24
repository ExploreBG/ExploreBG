'use client';

import React from 'react';
import { useFormState } from 'react-dom';
import { useTranslations } from 'next-intl';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { useRouter } from '@/i18n/routing';
import { toast } from 'react-toastify';

import { register } from './action';
import { registerSchema } from './registerSchema';
import { agent } from '@/api/agent';
import { getSession } from '@/utils/userSession';

import CPasswordInfo from '../common/CPasswordInfo/CPasswordInfo';
import CSubmitButton from '../common/CSubmitButton/CSubmitButton';

interface RegisterFormProps { }

const RegisterForm: React.FC<RegisterFormProps> = () => {
    const t = useTranslations('login-register');
    const router = useRouter();
    const [lastResult, action] = useFormState(register, undefined);
    const [form, fields] = useForm({
        lastResult,
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',

        onValidate({ formData }) {
            return parseWithZod(formData, { schema: registerSchema });
        },

        async onSubmit(event, context) {
            const formData = context.submission?.payload;

            try {
                const res = await agent.apiUsers.register(formData!);
                const session = await getSession();

                if (session) {
                    toast.success(t('successful-register', { name: res.username }));
                    router.push('/users/my-profile');
                } else {
                    res.errors.slice(0, 4).map((err: string) => toast.error(err, { autoClose: 10000 }));
                }
            } catch (err) {
                console.error(err);
            }
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
                <div>
                    <label htmlFor="email">{t('email')}</label>
                    <input
                        type="email"
                        key={fields.email.key}
                        name={fields.email.name}
                        defaultValue={fields.email.initialValue}
                        placeholder='john.doe@gmail.com'
                    />
                    {fields.email.errors && (
                        <div className="error-message">{t(fields.email.errors[0])}</div>
                    )}
                </div>

                <div>
                    <label htmlFor="username">{t('username')}</label>
                    <input
                        type="text"
                        key={fields.username.key}
                        name={fields.username.name}
                        defaultValue={fields.username.initialValue}
                        placeholder='John Doe'
                    />
                    {fields.username.errors && (
                        <div className="error-message">{t(fields.username.errors[0])}</div>
                    )}
                </div>

                <div>
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
                    {fields.password.errors && (
                        <div className="error-message">{t(fields.password.errors[0])}</div>
                    )}
                </div>

                <div>
                    <label htmlFor="confirmPassword">{t('confirm-pass')}</label>
                    <input
                        type="password"
                        key={fields.confirmPassword.key}
                        name={fields.confirmPassword.name}
                        defaultValue={fields.confirmPassword.initialValue}
                        placeholder='*********'
                    />
                    {fields.confirmPassword.errors && (
                        <div className="error-message">{t(fields.confirmPassword.errors[0])}</div>
                    )}
                </div>

                <CSubmitButton buttonName={t('register-btn')} />
            </form>
        </section>
    );
};

export default RegisterForm;