'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

import CConfirmationModal from '../common/CConfirmationModal/CConfirmationModal';
import ChangePasswordPopUp from '../ChangePasswordPopUp/ChangePasswordPopUp';

interface MyProfileButtonsProps {
    token: string;
}

const MyProfileButtons: React.FC<MyProfileButtonsProps> = ({ token }) => {
    const [isClickDelAccountBtn, setIsClickDelAccountBtn] = useState<boolean>(false);
    const [isClickChangePassBtn, setIsClickChangePassBtn] = useState<boolean>(false);
    const t = useTranslations('my-profile');

    const onConfirmClick = () => {
        console.log('Successful deletion!');
    };

    const onCancelClick = () => {
        setIsClickDelAccountBtn(false);
        setIsClickChangePassBtn(false);
    };

    return (
        <>
            <aside>
                <button
                    onClick={() => setIsClickDelAccountBtn(!isClickDelAccountBtn)}
                >
                    {t('del-account-btn')}
                </button>
                <button
                    onClick={() => setIsClickChangePassBtn(!isClickChangePassBtn)}
                >
                    {t('change-pass-btn')}
                </button>
            </aside>

            {isClickDelAccountBtn && (
                <CConfirmationModal deletionObj={t('deletion-obj')} confirm={onConfirmClick} cancel={onCancelClick} />
            )}

            {isClickChangePassBtn && <ChangePasswordPopUp closePopUp={onCancelClick} token={token} />}
        </>
    );
};

export default MyProfileButtons;