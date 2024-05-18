import React, { FormEvent } from 'react';

import { ILoginRegisterTranslate } from '@/interfaces/interfaces';

interface LoginFormProps {
    translate: ILoginRegisterTranslate
}

export const LoginForm: React.FC<LoginFormProps> = ({ translate }) => {

    const onLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const user = formData.get('user');
        const password = formData.get('password');

        console.log(user, '\n', password, '\n', 'Successful login');
    };

    return (
        <section className="login-register-form">
            <form onSubmit={onLoginSubmit}>
                <label htmlFor="user">{translate.usernameOrEmail}</label>
                <input type="text" name="user" required placeholder='John Doe' />
                <label htmlFor="password">{translate.pass}</label>
                <input type="password" name="password" required placeholder='*********' />
                <div>
                    <label htmlFor="rememberMe">{translate.rememberMe}</label>
                    <input type="checkbox" name="rememberMe" />
                </div>

                <input type="submit" value={translate.loginBtn} />
            </form>
        </section>
    );
};

export default LoginForm;