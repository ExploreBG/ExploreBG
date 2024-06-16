'use client';

import React from 'react';
import { useFormState } from 'react-dom';
import { useTranslations } from 'next-intl';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { useRouter } from '@/navigation';
import { toast } from 'react-toastify';

import { login } from './action';
import { loginSchema } from './loginSchema';
import { agent } from '@/api/agent';
import { getSession } from '@/utils/userSession';

import CSubmitButton from '../common/CSubmitButton/CSubmitButton';

interface LoginFormProps { }

export const LoginForm: React.FC<LoginFormProps> = () => {
    const t = useTranslations('login-register');
    const router = useRouter();
    const [lastResult, action] = useFormState(login, undefined);
    const [form, fields] = useForm({
        lastResult,
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',

        onValidate({ formData }) {
            return parseWithZod(formData, { schema: loginSchema });
        },

        async onSubmit(event, context) {
            const formData = context.submission?.payload;

            try {
                const res = await agent.apiUsers.login(formData!);
                const session = await getSession();

                if (session) {
                    toast.success(t('successful-login', { name: res.username }));
                    router.push({
                        pathname: '/users/[userId]/my-profile',
                        params: { userId: res.id }
                    });
                } else {
                    toast.error(res.message);
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
                    placeholder='John Doe'
                />
                <div className="error-message">{fields.email.errors && t(fields.email.errors[0])}</div>

                <label htmlFor="password">{t('password')}</label>
                <input
                    type="password"
                    key={fields.password.key}
                    name={fields.password.name}
                    defaultValue={fields.password.initialValue}
                    placeholder='*********'
                />
                <div className="error-message">{fields.password.errors && t(fields.password.errors[0])}</div>

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