import React from 'react';

import CLink from '../common/CLink/CLink';

interface NavigationLinksProps {
    t: any
}

const NavigationLinks: React.FC<NavigationLinksProps> = ({ t }) => {
    return (
        <>
            <li><CLink href={'/about'}>{t.about}</CLink></li>
            <li><CLink href={'/FAQ'}>{t.FAQ}</CLink></li>
            <li><CLink href={'/destination'}>{t.destinations}</CLink></li>
            <li><CLink href={'/trails'}>{t.trails}</CLink></li>
            <li><CLink href={'/hikes'}>{t.hikes}</CLink></li>
            <li><CLink href={'/accommodation'}>{t.accommodation}</CLink></li>
        </>
    );
};

export default NavigationLinks;