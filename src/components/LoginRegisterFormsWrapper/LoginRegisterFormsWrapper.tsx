'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

import LoginForm from '@/components/LoginForm/LoginForm';
import RegisterForm from '@/components/RegisterForm/RegisterForm';

interface LoginRegisterFormsWrapperProps { }

const LoginRegisterFormsWrapper: React.FC<LoginRegisterFormsWrapperProps> = () => {
    const t = useTranslations('login-register');
    const [isLogin, setIsLogin] = useState<boolean>(true);

    return (
        <article className="forms">
            <div className="buttons">
                <button
                    onClick={() => setIsLogin(true)}
                    className={isLogin ? 'current' : ''}
                >
                    {t('login-title')}
                </button>
                <button
                    onClick={() => setIsLogin(false)}
                    className={isLogin ? '' : 'current'}
                >
                    {t('register-title')}
                </button>
            </div>

            {isLogin ? <LoginForm /> : <RegisterForm />}
        </article>
    );
};

export default LoginRegisterFormsWrapper;