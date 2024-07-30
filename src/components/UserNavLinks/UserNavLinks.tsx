import React from 'react';
import { useTranslations } from 'next-intl';

import CLink from '../common/CLink/CLink';

interface UserNavLinksProps {
    id: string
    userRoles: string[]
}

const UserNavLinks: React.FC<UserNavLinksProps> = ({ id, userRoles }) => {
    const t = useTranslations('navigation');

    const isAdmin = userRoles.includes('ADMIN');
    
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

            {isAdmin && (
                <>
                    <span>--------------------</span>
                    <li><CLink href={'/admin/users'}>Users</CLink></li>
                </>
            )}
        </>
    );
};

export default UserNavLinks;