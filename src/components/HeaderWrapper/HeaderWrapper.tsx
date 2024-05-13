import React from 'react';
import { useTranslations } from 'next-intl';

import Header from '../header/Header';

interface HeaderWrapperProps { }

const HeaderWrapper: React.FC<HeaderWrapperProps> = () => {
    const translate = useTranslations('navigation');

    const t = {
        'about': translate('about'),
        'FAQ': translate('FAQ'),
        'destinations': translate('destinations'),
        'trails': translate('trails'),
        'hikes': translate('hikes'),
        'accommodations': translate('accommodations'),
        'login': translate('login'),
        'profile': translate('profile'),
        'favorite': translate('favorite'),
        'created-hikes': translate('created-hikes'),
        'logout': translate('logout')
    };

    return (
        <Header t={t} />
    );
};

export default HeaderWrapper;