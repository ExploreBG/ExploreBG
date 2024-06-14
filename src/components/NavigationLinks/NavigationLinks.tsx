import React from 'react';
import { useTranslations } from 'next-intl';

import CLink from '../common/CLink/CLink';

interface NavigationLinksProps { }

const NavigationLinks: React.FC<NavigationLinksProps> = () => {
    const t = useTranslations('navigation');

    return (
        <>
            <li><CLink href={'/about'}>{t('about')}</CLink></li>
            <li><CLink href={'/FAQ'}>{t('FAQ')}</CLink></li>
            <li><CLink href={'/destinations/all'}>{t('destinations')}</CLink></li>
            <li><CLink href={'/trails/all'}>{t('trails')}</CLink></li>
            <li><CLink href={'/hikes/all'}>{t('hikes')}</CLink></li>
            <li><CLink href={'/accommodations/all'}>{t('accommodations')}</CLink></li>
        </>
    );
};

export default NavigationLinks;