import React, { useState, useRef } from 'react';
import { TiInfo } from 'react-icons/ti';

import useCloseOnEscapeTabAndClickOutside from '@/hooks/useCloseOnEscapeTabAndClickOutside';

import './CFormFieldInfo.scss';

interface CFormFieldInfoProps {
    infoText: string
}

const CFormFieldInfo: React.FC<CFormFieldInfoProps> = ({ infoText }) => {
    const [isShowInfo, setIsShowInfo] = useState<boolean>(false);
    const infoIconRef = useRef<HTMLElement>(null);

    useCloseOnEscapeTabAndClickOutside(infoIconRef, () => setIsShowInfo(false));

    return (
        <figure
            ref={infoIconRef}
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