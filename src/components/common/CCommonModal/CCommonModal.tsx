import React, { ReactNode } from 'react';
import { Link } from '@/i18n/routing';

import './CCommonModal.scss';
import CBackBtn from '../CBackBtn/CBackBtn';

interface CCommonModalProps {
    children: ReactNode
}

export const requireAuthChildren = (translate: { [key: string]: string }, token?: string) => {
    return (
        <>
            <p>{translate.requireAuthMessage}</p>
            <CBackBtn />
            {!token && <Link href='/login-register'>{translate.loginBtn}</Link>}
        </>
    );
};

const CCommonModal: React.FC<CCommonModalProps> = ({ children }) => {
    return (
        <section className="pop-up-wrapper">
            <article className="pop-up-wrapper__modal">
                {children}
            </article>
        </section>
    );
};

export default CCommonModal;