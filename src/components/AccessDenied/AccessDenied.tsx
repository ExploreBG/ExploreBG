'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

import './AccessDenied.scss';
import CLogo from '../common/CLogo/CLogo';
import CCommonModal, { requireAuthChildren } from '../common/CCommonModal/CCommonModal';
import CSmallFooter from '../common/CSmallFooter/CSmallFooter';

interface AccessDeniedProps {
    token?: string
}

const AccessDenied: React.FC<AccessDeniedProps> = ({ token }) => {
    const tPopUp = useTranslations('pop-up');

    const translatePopUp = {
        requireAuthMessage: tPopUp('require-role-message'),
        loginBtn: tPopUp('login-btn')
    };

    return (
        <div className="access-denied">
            <CLogo />

            <CCommonModal>
                {requireAuthChildren(translatePopUp, token)}
            </CCommonModal>

            <CSmallFooter />
        </div>
    );
};

export default AccessDenied;