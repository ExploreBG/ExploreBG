'use client';

import React from 'react';
import { useFormState } from 'react-dom';
import { useTranslations } from 'next-intl';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { useRouter } from '@/navigation';
import { toast } from 'react-toastify';

import { register } from './action';
import { registerSchema } from './registerSchema';
import { agent } from '@/api/agent';

import CPasswordInfo from '../common/CPasswordInfo/CPasswordInfo';
import CSubmitButton from '../common/CSubmitButton/CSubmitButton';

interface RegisterFormProps { }

export const RegisterForm: React.FC<RegisterFormProps> = () => {
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

                if (res.id) {
                    toast.success(t('successful-register', { name: res.username }));
                    router.push({
                        pathname: '/users/[userId]/my-profile',
                        params: { userId: res.id }
                    });
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
                <label htmlFor="email">{t('email')}</label>
                <input
                    type="email"
                    key={fields.email.key}
                    name={fields.email.name}
                    defaultValue={fields.email.initialValue}
                    placeholder='john.doe@gmail.com'
                />
                <div className="error-message">{fields.email.errors && t(fields.email.errors[0])}</div>

                <label htmlFor="username">{t('username')}</label>
                <input
                    type="text"
                    key={fields.username.key}
                    name={fields.username.name}
                    defaultValue={fields.username.initialValue}
                    placeholder='John Doe'
                />
                <div className="error-message">{fields.username.errors && t(fields.username.errors[0])}</div>

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
                <div className="error-message">{fields.password.errors && t(fields.password.errors[0])}</div>

                <label htmlFor="confirmPassword">{t('confirm-pass')}</label>
                <input
                    type="password"
                    key={fields.confirmPassword.key}
                    name={fields.confirmPassword.name}
                    defaultValue={fields.confirmPassword.initialValue}
                    placeholder='*********'
                />
                <div className="error-message">{fields.confirmPassword.errors && t(fields.confirmPassword.errors[0])}</div>

                <CSubmitButton buttonName={t('register-btn')} />
            </form>
        </section>
    );
};

export default RegisterForm;