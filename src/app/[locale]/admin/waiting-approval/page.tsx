import React from 'react';

import { getSession } from '@/utils/userSession';
import { agent } from '@/api/agent';

import '@/app/[locale]/admin/admin.scss';
import AccessDenied from '@/components/AccessDenied/AccessDenied';
import AdminLayout from '@/components/AdminLayout/AdminLayout';
import AllWaitingApprovalTable from '@/components/AllWaitingApprovalTable/AllWaitingApprovalTable';
import CSmallFooter from '@/components/common/CSmallFooter/CSmallFooter';

interface AllWaitingApprovalProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

const AllWaitingApproval: React.FC<AllWaitingApprovalProps> = async ({ searchParams }) => {

    const session = await getSession();
    const isAdminOrModerator = session?.isAdminOrModerator;
    const token = session?.token;

    const res = token && await agent.apiAdmin.getWaitingApprovalCount(token);

    return (
        <>
            {!isAdminOrModerator && <AccessDenied token={token} />}

            {isAdminOrModerator && (
                <AdminLayout>
                    <main className="admin-wrapper">
                        {!res && <p>Resource not found!</p>}

                        {res && (
                            <AllWaitingApprovalTable
                                waitingApproval={res}
                                userSession={session!}
                                searchParams={searchParams}
                            />
                        )}

                        <CSmallFooter />
                    </main>
                </AdminLayout>
            )}
        </>
    );
};

export default AllWaitingApproval;