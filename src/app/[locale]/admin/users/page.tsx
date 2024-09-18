import React from 'react';
import { unstable_setRequestLocale } from 'next-intl/server';

import { DEFAULT_PAGE_NUMBER } from '@/utils/constants';
import { getSession } from '@/utils/userSession';
import { agent } from '@/api/agent';

import '@/app/[locale]/admin/admin.scss';
import AccessDenied from '@/components/AccessDenied/AccessDenied';
import AdminLayout from '@/components/AdminLayout/AdminLayout';
import AllUsersTable from '@/components/AllUsersTable/AllUsersTable';
// import PaginationControls from '@/components/PaginationControls/PaginationControls';
import CSmallFooter from '@/components/common/CSmallFooter/CSmallFooter';

interface AllUsersProps {
    params: { locale: string };
    searchParams: { [key: string]: string | string[] | undefined };
}

const AllUsers: React.FC<AllUsersProps> = async ({ params: { locale }, searchParams }) => {
    unstable_setRequestLocale(locale);

    const page = searchParams['pageNumber'] ?? DEFAULT_PAGE_NUMBER;
    const resultsPerPage = searchParams['pageSize'] ?? '3';
    const query = `?pageNumber=${page}&pageSize=${resultsPerPage}&sortBy=id&sortDir=DESC`;

    const session = await getSession();
    const isAdminOrModerator = session?.isAdminOrModerator;
    const isAdmin = session?.isAdmin;
    const token = session?.token;

    const data = token && await agent.apiAdmin.getAllUsers(query, token);

    // const userCountFrom = data?.totalElements - (Number(page) - 1) * Number(resultsPerPage);

    return (
        <>
            {!isAdminOrModerator && <AccessDenied token={token} />}

            {isAdminOrModerator && (
                <AdminLayout>
                    <main className="admin-wrapper">
                        <AllUsersTable
                            // data={data.content}
                            data={data.reverse()}
                            adminOrModeratorToken={token!}
                            isAdmin={isAdmin!}
                            // userCountFrom={userCountFrom}
                        />

                        {/* <PaginationControls totalElements={data.totalElements} /> */}
                        <CSmallFooter />
                    </main>
                </AdminLayout>
            )}
        </>
    );
};

export default AllUsers;