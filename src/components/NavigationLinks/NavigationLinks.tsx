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
            <li><CLink href={'/destinations'}>{t('destinations')}</CLink></li>
            <li><CLink href={'/trails'}>{t('trails')}</CLink></li>
            <li><CLink href={'/hikes'}>{t('hikes')}</CLink></li>
            <li><CLink href={'/accommodations'}>{t('accommodations')}</CLink></li>
        </>
    );
};

export default NavigationLinks;