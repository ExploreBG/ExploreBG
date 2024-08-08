import React from 'react';
import { unstable_setRequestLocale } from 'next-intl/server';

import { getSession } from '@/utils/userSession';
import { agent } from '@/api/agent';

import '@/app/[locale]/admin/admin.scss';
import AccessDenied from '@/components/AccessDenied/AccessDenied';
import AdminLayout from '@/components/AdminLayout/AdminLayout';
import AllWaitingApprovalTable from '@/components/AllWaitingApprovalTable/AllWaitingApprovalTable';
import CSmallFooter from '@/components/common/CSmallFooter/CSmallFooter';

interface AllWaitingApprovalProps {
    params: { locale: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

const AllWaitingApproval: React.FC<AllWaitingApprovalProps> = async ({ params: { locale }, searchParams }) => {
    unstable_setRequestLocale(locale);

    const session = await getSession();
    const isAdminOrModerator = (session?.userRoles.includes('ADMIN') || session?.userRoles.includes('MODERATOR')) ?? false;
    const token = session?.token;

    const res = token && await agent.apiAdmin.getWaitingApprovalCount(token);

    return (
        <>
            {!isAdminOrModerator && <AccessDenied token={token} />}

            {isAdminOrModerator && (
                <AdminLayout>
                    <main className="admin-wrapper">
                        <AllWaitingApprovalTable
                            waitingApproval={res}
                            token={token!}
                            searchParams={searchParams}
                        />

                        <CSmallFooter />
                    </main>
                </AdminLayout>
            )}
        </>
    );
};

export default AllWaitingApproval;