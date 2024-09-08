import React from 'react';
import { useTranslations } from 'next-intl';

import './CLoadingSpinner.scss';

interface CLoadingSpinnerProps {
    width?: string;
    height?: string;
    fontSize?: string;
    uploadOrDelete?: string;
}

const CLoadingSpinner: React.FC<CLoadingSpinnerProps> = ({
    width, height, fontSize, uploadOrDelete
}) => {
    const t = useTranslations('common');

    return (
        <div
            className="spinner"
            style={{
                width: width ?? '8rem',
                height: height ?? '8rem',
                fontSize: fontSize ?? '1rem'
            }}
        >
            {uploadOrDelete ?? t('loading')}
        </div>
    );
};

export default CLoadingSpinner;