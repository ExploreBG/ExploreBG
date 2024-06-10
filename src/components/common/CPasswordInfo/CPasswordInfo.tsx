import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { TiInfo } from 'react-icons/ti';

import './CPasswordInfo.scss';

interface CPasswordInfoProps { }

export const CPasswordInfo: React.FC<CPasswordInfoProps> = () => {
    const [isShowInfoPass, setIsShowInfoPass] = useState<boolean>(false);
    const t = useTranslations('pop-up');

    const passwordInfoText = `${t('pass-info-begin')} ( ! @ # $ % ^ & * ( ) , . ? " : { } | < > ) ${t('pass-info-end')}`;

    return (
        <figure
            className="password-info"
            onClick={() => setIsShowInfoPass(!isShowInfoPass)}
        >
            <figcaption
                className={`info ${isShowInfoPass ? 'active' : ''}`}
            >
                {passwordInfoText}
            </figcaption>
            <TiInfo />
        </figure>
    );
};

export default CPasswordInfo;