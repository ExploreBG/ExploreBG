import React from 'react';
import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';

import { getSession } from '@/utils/userSession';
import { agent } from '@/api/agent';

import '@/app/[locale]/admin/admin.scss';
import CCommonModal, { requireAuthChildren } from '@/components/common/CCommonModal/CCommonModal';
import AdminLayout from '@/components/AdminLayout/AdminLayout';
import AllUsersTable from '@/components/AllUsersTable/AllUsersTable';
import PaginationControls from '@/components/PaginationControls/PaginationControls';
import CSmallFooter from '@/components/common/CSmallFooter/CSmallFooter';

interface AllUsersProps {
    params: { locale: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

const AllUsers: React.FC<AllUsersProps> = async ({ params: { locale }, searchParams }) => {
    unstable_setRequestLocale(locale);
    const tPopUp = await getTranslations('pop-up');

    const page = searchParams['pageNumber'] ?? '1';
    const resultsPerPage = searchParams['pageSize'] ?? '3';
    const query = `?pageNumber=${page}&pageSize=${resultsPerPage}&sortBy=id&sortDir=DESC`;

    const session = await getSession();
    const isAdmin = session?.userRoles.includes('ADMIN') ?? false;
    const token = session?.token;

    const data = token && await agent.apiAdmin.getAllUsers(query, token);

    const translatePopUp = {
        requireAuthMessage: tPopUp('require-role-message'),
        loginBtn: tPopUp('login-btn')
    };

    return (
        <>
            {!isAdmin && (
                <CCommonModal>{requireAuthChildren(translatePopUp, token)}</CCommonModal>
            )}

            {isAdmin && (
                <AdminLayout>
                    <main className="admin-wrapper">
                        <AllUsersTable data={data.content} adminToken={token!} />

                        <PaginationControls
                            totalElements={data.totalElements}
                            cardsPerPage={Number(resultsPerPage)}
                            pathname={'/admin/users'}
                            sortBy={'id'}
                            sortDir={'DESC'}
                        />
                        <CSmallFooter />
                    </main>
                </AdminLayout>
            )}
        </>
    );
};

export default AllUsers;