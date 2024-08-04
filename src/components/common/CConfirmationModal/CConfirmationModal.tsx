import React from 'react';
import { useTranslations } from 'next-intl';

import './CConfirmationModal.scss';

interface CConfirmationModalProps {
    deletionObj: string
    confirm: () => void
    cancel: () => void
}

const CConfirmationModal: React.FC<CConfirmationModalProps> = ({ deletionObj, confirm, cancel }) => {
    const t = useTranslations('pop-up');

    return (
        <section className="pop-up-wrapper">
            <article className="pop-up-wrapper__modal">
                <div className="pop-up-wrapper__modal__confirmation">
                    <p>{t('del-question')} {deletionObj}?</p>

                    <button onClick={confirm} className="deleteBtn">{t('del-btn')}</button>
                    <button onClick={cancel}>{t('cancel-btn')}</button>
                </div>
            </article>
        </section>
    );
};

export default CConfirmationModal;