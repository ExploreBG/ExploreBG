import React, { FormEvent } from 'react';

interface LoginFormProps { }

export const LoginForm: React.FC<LoginFormProps> = () => {

    const onLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const user = formData.get('user');
        const password = formData.get('password');
        
        console.log(user, '\n', password, '\n', 'Successful login');
    };

    return (
        <section className="login-register-form">
            <h1>Login form</h1>

            <form onSubmit={onLoginSubmit}>
                <label htmlFor="user">Username or Email</label>
                <input type="text" name="user" required placeholder='John Doe' />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" required placeholder='*********' />

                <input type="submit" value="Login" />
            </form>
        </section>
    );
};

export default LoginForm;