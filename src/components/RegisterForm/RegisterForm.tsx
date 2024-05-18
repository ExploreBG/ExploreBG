import React, { FormEvent } from 'react';

import { ILoginRegisterTranslate } from '@/interfaces/interfaces';

interface RegisterFormProps {
    translate: ILoginRegisterTranslate
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ translate }) => {

    const onRegisterSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        const username = formData.get('username');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');

        if (password != confirmPassword) {
            console.log('Passwords mismatch!');

            return;
        }

        console.log(email, '\n', username, '\n', password, '\n', confirmPassword, '\n', 'Successful Register');
    };

    return (
        <section className="login-register-form">
            <form onSubmit={onRegisterSubmit}>
                <label htmlFor="email">{translate.email}</label>
                <input type="email" name="email" required placeholder='john.doe@gmail.com' />
                <label htmlFor="username">{translate.username}</label>
                <input type="text" name="username" required placeholder='John Doe' />
                <label htmlFor="password">{translate.pass}</label>
                <input type="password" name="password" required placeholder='*********' />
                <label htmlFor="confirmPassword">{translate.confirmPass}</label>
                <input type="password" name="confirmPassword" required placeholder='*********' />

                <input type="submit" value={translate.registerBtn} />
            </form>
        </section>
    );
};

export default RegisterForm;