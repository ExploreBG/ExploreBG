import React, { FormEvent } from 'react';

interface RegisterFormProps { }

export const RegisterForm: React.FC<RegisterFormProps> = () => {

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
            <h1>Register form</h1>

            <form onSubmit={onRegisterSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" required placeholder='john.doe@gmail.com' />
                <label htmlFor="username">Username</label>
                <input type="text" name="username" required placeholder='John Doe' />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" required placeholder='*********' />
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" name="confirmPassword" required placeholder='*********' />

                <input type="submit" value="Sign up" />
            </form>
        </section>
    );
};

export default RegisterForm;