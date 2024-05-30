'use client';

import React, { useState } from 'react';
import { useFormState } from 'react-dom';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { TiInfo } from 'react-icons/ti';

import { register } from './action';
import { registerSchema } from './registerSchema';
import { ILoginRegisterTranslate } from '@/interfaces/interfaces';

import CSubmitButton from '../common/CSubmitButton/CSubmitButton';

interface RegisterFormProps {
    translate: ILoginRegisterTranslate
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ translate }) => {
    const [isShowInfoPass, setIsShowInfoPass] = useState<boolean>(false);
    const [lastResult, action] = useFormState(register, undefined);
    const [form, fields] = useForm({
        lastResult,
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',

        onValidate({ formData }) {
            return parseWithZod(formData, { schema: registerSchema });
        },

        onSubmit(e) {
            const formData = new FormData(e.currentTarget);
            const email = formData.get('email');
            const username = formData.get('username');
            const password = formData.get('password');
            const confirmPassword = formData.get('confirmPassword');

            console.log(email, '\n', username, '\n', password, '\n', confirmPassword, '\n', 'Successful Register');
        }
    });

    const passwordErrors = (errors: string[] | undefined) => {
        return errors !=undefined ? errors[0] : errors;
    };

    const passwordInfoText = 'Password must contain at least one uppercase, lowercase, digit, special character ( ! @ # $ % ^ & * ( ) , . ? " : { } | < > ) and must be at least 5 characters!';

    return (
        <section className="login-register-form">
            <form
                id={form.id}
                onSubmit={form.onSubmit}
                action={action}
                noValidate
            >
                <label htmlFor="email">{translate.email}</label>
                <input
                    type="email"
                    key={fields.email.key}
                    name={fields.email.name}
                    defaultValue={fields.email.initialValue}
                    placeholder='john.doe@gmail.com'
                />
                <div className="error-message">{fields.email.errors}</div>

                <label htmlFor="username">{translate.username}</label>
                <input
                    type="text"
                    key={fields.username.key}
                    name={fields.username.name}
                    defaultValue={fields.username.initialValue}
                    placeholder='John Doe'
                />
                <div className="error-message">{fields.username.errors}</div>

                <label htmlFor="password">{translate.pass} &nbsp;
                    <figure 
                        className="password-info" 
                        onClick={() => setIsShowInfoPass(!isShowInfoPass)}
                    >
                        <figcaption 
                            className={`info ${isShowInfoPass ? 'active' : ''}`}
                        >
                            {passwordInfoText}
                        </figcaption>
                        <TiInfo />
                    </figure>
                </label>
                <input
                    type="password"
                    key={fields.password.key}
                    name={fields.password.name}
                    defaultValue={fields.password.initialValue}
                    placeholder='*********'
                />
                <div className="error-message">{passwordErrors(fields.password.errors)}</div>

                <label htmlFor="confirmPassword">{translate.confirmPass}</label>
                <input
                    type="password"
                    key={fields.confirmPassword.key}
                    name={fields.confirmPassword.name}
                    defaultValue={fields.confirmPassword.initialValue}
                    placeholder='*********'
                />
                <div className="error-message">{fields.confirmPassword.errors}</div>

                <CSubmitButton buttonName={translate.registerBtn} />
            </form>
        </section>
    );
};

export default RegisterForm;