import React from 'react';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { redirect } from '@/navigation';

import { getSession } from '@/utils/userSession';

import './login-register.scss';
import CSmallHeader from '@/components/common/CSmallHeader/CSmallHeader';
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

const LoginRegister: React.FC<LoginRegisterProps> = async ({ params: { locale } }) => {
    unstable_setRequestLocale(locale);
    const t = await getTranslations('login-register');

    const session = await getSession();

    if (session) {
        redirect('/users/my-profile');
        return;
    }

    return (
        <main className="login-register">
            <CSmallHeader />

            <LoginRegisterFormsWrapper />

            <CPhotoInfo imgInfo={t('img-info')} />
            <CSmallFooter />
        </main>
    );
};

export default LoginRegister;