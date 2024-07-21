import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { TiInfo } from 'react-icons/ti';

import { passMinLength } from '@/utils/validations';

import './CPasswordInfo.scss';

interface CPasswordInfoProps { }

export const CPasswordInfo: React.FC<CPasswordInfoProps> = () => {
    const [isShowInfoPass, setIsShowInfoPass] = useState<boolean>(false);
    const t = useTranslations('pop-up');

    const specialChars = ` ( ! @ # $ % ^ & * ( ) , . ? " : { } | < > ) `;

    return (
        <figure
            className="password-info"
            onClick={() => setIsShowInfoPass(!isShowInfoPass)}
        >
            <figcaption
                className={`info ${isShowInfoPass ? 'active' : ''}`}
            >
                {t('pass-info', { spChars: specialChars, minLength: passMinLength })}
            </figcaption>
            <TiInfo />
        </figure>
    );
};

export default CPasswordInfo;