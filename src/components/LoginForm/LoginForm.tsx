'use client';

import React, { ReactNode } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';

import { login } from './action';
import { loginSchema } from './loginSchema';

import { ILoginRegisterTranslate } from '@/interfaces/interfaces';

interface LoginFormProps {
    translate: ILoginRegisterTranslate
}

export const LoginForm: React.FC<LoginFormProps> = ({ translate }) => {
    const [lastResult, action] = useFormState(login, undefined);
    const [form, fields] = useForm({
        lastResult,
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',

        onValidate({ formData }) {
            return parseWithZod(formData, { schema: loginSchema });
        },

        onSubmit(e) {
            const formData = new FormData(e.currentTarget);
            const usernameOrEmail = formData.get('usernameOrEmail');
            const password = formData.get('password');

            console.log(usernameOrEmail, '\n', password, '\n', 'Successful login');
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
                <label htmlFor="usernameOrEmail">{translate.usernameOrEmail}</label>
                <input
                    type="text"
                    key={fields.usernameOrEmail.key}
                    name={fields.usernameOrEmail.name}
                    defaultValue={fields.usernameOrEmail.initialValue}
                    placeholder='John Doe'
                />
                <div className="error-message">{fields.usernameOrEmail.errors}</div>

                <label htmlFor="password">{translate.pass}</label>
                <input
                    type="password"
                    key={fields.password.key}
                    name={fields.password.name}
                    defaultValue={fields.password.initialValue}
                    placeholder='*********'
                />
                <div className="error-message">{fields.password.errors}</div>

                <div>
                    <label htmlFor="remember">{translate.rememberMe}</label>
                    <input
                        type="checkbox"
                        key={fields.remember.key}
                        name={fields.remember.name}
                        defaultChecked={fields.remember.initialValue === 'on'}
                    />
                </div>

                <Button>{translate.loginBtn}</Button>
            </form>
        </section>
    );
};

export default LoginForm;

function Button({ children }: { children: ReactNode }) {
    const { pending } = useFormStatus();

    return (
        <button disabled={pending}>
            {pending ? 'Loading...' : children}
        </button>
    );
}