import React from 'react';
import { useTranslations } from 'next-intl';

import './changePasswordPopUp.scss';
import CPasswordInfo from '../common/CPasswordInfo/CPasswordInfo';

interface ChangePasswordPopUpProps {
    cancel: () => void
}

export const ChangePasswordPopUp: React.FC<ChangePasswordPopUpProps> = ({ cancel }) => {
    const t = useTranslations('pop-up');

    return (
        <section className="pop-up-wrapper">
            <article className="pop-up-wrapper__modal">
                <form className="change-pass-form">
                    <label htmlFor="currentPass">{t('current-pass')}</label>
                    <input type="password" name="currentPass" placeholder="***************" />

                    <label htmlFor="newPass">
                        {t('new-pass')} &nbsp;
                        <CPasswordInfo />
                    </label>
                    <input type="password" name="newPass" placeholder="***************" />

                    <label htmlFor="repeatNewPass">{t('repeat-new-pass')}</label>
                    <input type="password" name="repeatNewPass" placeholder="***************" />

                    <button type="submit">{t('change-btn')}</button>
                </form>

                <button onClick={cancel}>{t('cancel-btn')}</button>
            </article>
        </section>
    );
};

export default ChangePasswordPopUp;