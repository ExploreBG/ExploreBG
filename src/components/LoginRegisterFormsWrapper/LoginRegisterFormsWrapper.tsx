'use client';

import React, { useState } from 'react';

import LoginForm from '@/components/LoginForm/LoginForm';
import RegisterForm from '@/components/RegisterForm/RegisterForm';

interface LoginRegisterFormsWrapperProps { }

export const LoginRegisterFormsWrapper: React.FC<LoginRegisterFormsWrapperProps> = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true);

    return (
        <article>
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Sign up' : 'Login'}
            </button>

            {isLogin ? <LoginForm /> : <RegisterForm />}
        </article>
    );
};

export default LoginRegisterFormsWrapper;