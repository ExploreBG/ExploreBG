import React from 'react';
import { useTranslations } from 'next-intl';

import CLink from '../common/CLink/CLink';

interface UserNavLinksProps {
    id: string
}

const UserNavLinks: React.FC<UserNavLinksProps> = ({ id }) => {
    const t = useTranslations('navigation');

    return (
        <>
            <li>
                <CLink href={{
                    pathname: '/users/[userId]/my-profile',
                    params: { userId: id }
                }}>
                    {t('profile')}
                </CLink>
            </li>
            <li><CLink href={'/trails/create'}>{t('create-trail')}</CLink></li>
            {/* <li><CLink href={''}>{t('favorite')}</CLink></li> */}
        </>
    );
};

export default UserNavLinks;