import React from 'react';
import { unstable_setRequestLocale } from 'next-intl/server';
import { redirect } from '@/navigation';

import { getToken } from '@/utils/userSession';
import { agent } from '@/api/agent';
import { IUser } from '@/interfaces/interfaces';

import '@/app/[locale]/admin/admin.scss';
import AdminLayout from '@/components/AdminLayout/AdminLayout';
import PaginationControls from '@/components/PaginationControls/PaginationControls';

interface AllUsersProps {
    params: { locale: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

const AllUsers: React.FC<AllUsersProps> = async ({ params: { locale }, searchParams }) => {
    unstable_setRequestLocale(locale);

    const page = searchParams['pageNumber'] ?? '1';
    const resultsPerPage = searchParams['pageSize'] ?? '2';
    const query = `?pageNumber=${page}&pageSize=${resultsPerPage}&sortBy=id&sortDir=DESC`;

    const token = await getToken();
    const data = await agent.apiAdmin.getAllUsers(query, token);

    return (
        <AdminLayout>
            <main className="admin-wrapper">
                <section>
                    {data.content.map((u: IUser) => (
                        <p key={u.id}>{u.username}</p>
                    ))}
                </section>

                <PaginationControls
                    totalElements={data.totalElements}
                    cardsPerPage={Number(resultsPerPage)}
                    pathname={'/admin/users'}
                    sortBy={'id'}
                    sortDir={'DESC'}
                />
            </main>
        </AdminLayout>
    );
};

export default AllUsers;