'use client';

import React, { useState } from 'react';

import { ILoginRegisterTranslate } from '@/interfaces/interfaces';

import LoginForm from '@/components/LoginForm/LoginForm';
import RegisterForm from '@/components/RegisterForm/RegisterForm';

interface LoginRegisterFormsWrapperProps {
    translate: ILoginRegisterTranslate
}

export const LoginRegisterFormsWrapper: React.FC<LoginRegisterFormsWrapperProps> = ({
    translate
}) => {
    const [isLogin, setIsLogin] = useState<boolean>(true);

    return (
        <article className="forms">
            <div className="buttons">
                <button
                    onClick={() => setIsLogin(true)}
                    className={isLogin ? 'current' : ''}
                >
                    {translate.loginTitle}
                </button>
                <button
                    onClick={() => setIsLogin(false)}
                    className={isLogin ? '' : 'current'}
                >
                    {translate.registerTitle}
                </button>
            </div>

            {isLogin ? <LoginForm translate={translate} /> : <RegisterForm translate={translate} />}
        </article>
    );
};

export default LoginRegisterFormsWrapper;