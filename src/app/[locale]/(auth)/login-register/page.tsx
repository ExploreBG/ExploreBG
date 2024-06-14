import React from 'react';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import './login-register.scss';
import CLogo from '@/components/common/CLogo/CLogo';
import CBackBtn from '@/components/common/CBackBtn/CBackBtn';
import LoginRegisterFormsWrapper from '@/components/LoginRegisterFormsWrapper/LoginRegisterFormsWrapper';
import CPhotoInfo from '@/components/common/CPhotoInfo/CPhotoInfo';
import CSmallFooter from '@/components/common/CSmallFooter/CSmallFooter';

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
    const t = useTranslations('login-register');

    return (
        <main className="login-register">
            <header>
                <CLogo />
                <CBackBtn btn={t('back-btn')} />
            </header>

            <LoginRegisterFormsWrapper />

            <CPhotoInfo imgInfo={t('img-info')} />
            <CSmallFooter />
        </main>
    );
};

export default LoginRegister;