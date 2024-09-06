import React from 'react';
import { useTranslations } from 'next-intl';

import './CLoadingSpinner.scss';

interface CLoadingSpinnerProps { }

const CLoadingSpinner: React.FC<CLoadingSpinnerProps> = () => {
    const t = useTranslations('common');

    return (
        <div className="spinner">{t('loading')}</div>
    );
};

export default CLoadingSpinner;