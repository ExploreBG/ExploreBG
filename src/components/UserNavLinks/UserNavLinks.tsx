import React from 'react';
import { useTranslations } from 'next-intl';

import CLink from '../common/CLink/CLink';

interface UserNavLinksProps {
    userRoles: string[];
}

const UserNavLinks: React.FC<UserNavLinksProps> = ({ userRoles }) => {
    const t = useTranslations('navigation');

    const isAdmin = userRoles?.includes('ADMIN');
    const isModerator = userRoles?.includes('MODERATOR');

    return (
        <>
            <li>
                <CLink href={'/users/my-profile'}>{t('profile')}</CLink>
            </li>
            <li><CLink href={'/trails/create'}>{t('create-trail')}</CLink></li>
            {/* <li><CLink href={''}>{t('favorite')}</CLink></li> */}

            <span>--------------------</span>

            {(isAdmin || isModerator) && (
                <>
                    <li><CLink href={'/admin/users'}>Users</CLink></li>
                    <li><CLink href={'/admin/waiting-approval'}>Waiting approval</CLink></li>
                </>
            )}
        </>
    );
};

export default UserNavLinks;