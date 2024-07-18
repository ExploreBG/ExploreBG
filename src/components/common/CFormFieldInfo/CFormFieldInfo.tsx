import React, { useState } from 'react';
import { TiInfo } from 'react-icons/ti';

import './CFormFieldInfo.scss';

interface CFormFieldInfoProps {
    infoText: string
}

export const CFormFieldInfo: React.FC<CFormFieldInfoProps> = ({ infoText }) => {
    const [isShowInfo, setIsShowInfo] = useState<boolean>(false);

    return (
        <figure
            className="form-field-info"
            onClick={() => setIsShowInfo(!isShowInfo)}
        >
            <figcaption
                className={`text ${isShowInfo ? 'active' : ''}`}
            >
                {infoText}
            </figcaption>
            <TiInfo />
        </figure>
    );
};

export default CFormFieldInfo;