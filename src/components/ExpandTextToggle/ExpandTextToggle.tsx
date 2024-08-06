import React, { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { GiClick } from 'react-icons/gi';

import useCloseOnEscapeTabAndClickOutside from '@/hooks/useCloseOnEscapeTabAndClickOutside';

interface ExpandTextToggleProps {
    text: string
    length: number
}

const ExpandTextToggle: React.FC<ExpandTextToggleProps> = ({ text, length }) => {
    const t = useTranslations('common');
    const [isExpand, setIsExpand] = useState<boolean>(false);
    const textRef = useRef<HTMLDivElement>(null);

    useCloseOnEscapeTabAndClickOutside(textRef, () => setIsExpand(false));

    return (
        <div ref={textRef} onClick={() => setIsExpand(!isExpand)}>
            <p>
                {isExpand ? text : `${text.slice(0, length)}  ${text.length > length ? '.....' : ''}`}
            </p>
            {text.length > length && (
                <span>
                    {t('click-to')}  {isExpand ? `${t('close')}` : `${t('expand')}`}
                    <GiClick />
                </span>
            )}
        </div>
    );
};

export default ExpandTextToggle;