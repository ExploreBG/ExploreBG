import React from 'react';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import './login-register.scss';
import LoginRegisterFormsWrapper from '@/components/LoginRegisterFormsWrapper/LoginRegisterFormsWrapper';

interface LoginRegisterProps {
    params: { locale: string }
}

export async function generateMetadata({
    params: { locale }
}: Omit<LoginRegisterProps, 'children'>) {
    const t = await getTranslations({ locale, namespace: 'login-register' });

    return {
        title: t('metadata.tab-name'),
    };
}

const LoginRegister: React.FC<LoginRegisterProps> = ({ params: { locale } }) => {
    unstable_setRequestLocale(locale);

    return (
        <main className="login-register">
            <LoginRegisterFormsWrapper />
        </main>
    );
};

export default LoginRegister;