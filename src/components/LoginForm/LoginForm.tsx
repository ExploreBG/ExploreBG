import React from 'react';
import { useFormState } from 'react-dom';
import { useTranslations } from 'next-intl';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { decodeJwt } from 'jose';
import { useRouter } from '@/i18n/routing';
import { toast } from 'react-toastify';

import { login } from './action';
import { loginSchema } from './loginSchema';
import { agent } from '@/api/agent';
import { IDecodedToken } from '@/interfaces/interfaces';
import { setSession } from '@/utils/userSession';

import CSubmitButton from '../common/CSubmitButton/CSubmitButton';

interface LoginFormProps { }

const LoginForm: React.FC<LoginFormProps> = () => {
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

                if (res.token) {
                    const token = res.token;
                    const decodedToken = decodeJwt<IDecodedToken>(token);
                    const userRoles = decodedToken.roles;
                    const userId = res.data.id;

                    await setSession({ token, userId, userRoles });
                    toast.success(t('successful-login', { name: res.data.username }));
                    router.push('/users/my-profile');
                } else {
                    toast.error(res.message);
                }
            } catch (err) {
                console.error('Login request failed: ', err);
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
                        placeholder='John Doe'
                    />
                    {fields.email.errors && (
                        <div className="error-message">{t(fields.email.errors[0])}</div>
                    )}
                </div>

                <div>
                    <label htmlFor="password">{t('password')}</label>
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

                <div className="remember-me">
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