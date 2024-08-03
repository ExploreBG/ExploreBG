import React from 'react';
import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import { AiOutlineFieldNumber } from "react-icons/ai";

import { getSession } from '@/utils/userSession';
import { agent } from '@/api/agent';
import { IUser } from '@/interfaces/interfaces';

import '@/app/[locale]/admin/admin.scss';
import CCommonModal, { requireAuthChildren } from '@/components/common/CCommonModal/CCommonModal';
import AdminLayout from '@/components/AdminLayout/AdminLayout';
import CMemberImage from '@/components/common/CMemberImage/CMemberImage';
import PaginationControls from '@/components/PaginationControls/PaginationControls';
import CSmallFooter from '@/components/common/CSmallFooter/CSmallFooter';

interface AllUsersProps {
    params: { locale: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const formatFullDate = (input: string) => {
    const date = new Date(input);

    const year = date.getFullYear();
    const monthIndex = date.getMonth();
    const month = monthNames[monthIndex];
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `
        ${day} ${month} ${year} --
        ${hours.toString().padStart(2, '0')}:
        ${minutes.toString().padStart(2, '0')}:
        ${seconds.toString().padStart(2, '0')}
    `
};

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
                        <table>
                            <thead>
                                <tr>
                                    <th><AiOutlineFieldNumber /></th>
                                    <th>Image</th>
                                    <th>Username</th>
                                    <th>Roles</th>
                                    <th>Creation date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.content.map((u: IUser) => (
                                    <tr key={u.id}>
                                        <td>{u.id}</td>
                                        <td>
                                            <CMemberImage
                                                ownerId={u.id}
                                                imageUrl={u.imageUrl}
                                                username={u.username}
                                            />
                                        </td>
                                        <td>{u.username}</td>
                                        <td>
                                            <ul>
                                                {u.roles.map((r, index) => (
                                                    <li key={index}>{r.role}</li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td>{formatFullDate(u.creationDate)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

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