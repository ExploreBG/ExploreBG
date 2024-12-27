import React, { ReactNode, useState, useRef } from 'react';
import { BsEyeFill } from 'react-icons/bs';

import useCloseOnEscapeTabAndClickOutside from '@/hooks/useCloseOnEscapeTabAndClickOutside';

import '../CFormFieldInfo/CFormFieldInfo.scss';

interface CViewDetailsProps {
    details?: string;
    element?: ReactNode;
}

const CViewDetails: React.FC<CViewDetailsProps> = ({ details, element }) => {
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
                {details}
                {element}
            </figcaption>
            <BsEyeFill />
        </figure>
    );
};

export default CViewDetails;