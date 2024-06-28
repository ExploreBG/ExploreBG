import React, { ReactNode } from 'react';
import { Link } from '@/navigation';

import './CCommonModal.scss';
import CBackBtn from '../CBackBtn/CBackBtn';

interface CCommonModalProps {
    children: ReactNode
}

export const requireAuthChildren = (translate: { [key: string]: string }) => {
    return (
        <div className="children">
            <p>{translate.requireAuthMessage}</p>
            <CBackBtn />
            <Link href='/login-register'>{translate.loginBtn}</Link>
        </div>
    );
};

export const CCommonModal: React.FC<CCommonModalProps> = ({ children }) => {
    return (
        <section className="pop-up-wrapper">
            <article className="pop-up-wrapper__modal">
                {children}
            </article>
        </section>
    );
};

export default CCommonModal;