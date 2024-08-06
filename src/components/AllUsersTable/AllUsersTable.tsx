'use client';

import React, { useEffect, useState } from 'react';
import { AiOutlineFieldNumber } from 'react-icons/ai';

import { IUser } from '@/interfaces/interfaces';
import { formatFullDate } from '@/utils/utils';

import CMemberImage from '../common/CMemberImage/CMemberImage';
import AllUsersEditRole from '../AllUsersEditRole/AllUsersEditRole';

interface AllUsersTableProps {
    data: IUser[]
    adminToken: string
    userCountFrom: number
}

const AllUsersTable: React.FC<AllUsersTableProps> = ({ data, adminToken, userCountFrom }) => {
    const [users, setUsers] = useState<IUser[]>(data);

    useEffect(() => {
        if (data) {
            setUsers(data);
        }
    }, [data]);

    return (
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
                {users.map((u, index) => (
                    <tr key={u.id}>
                        <td>{userCountFrom - index}</td>
                        <td>
                            <CMemberImage
                                ownerId={u.id}
                                imageUrl={u.imageUrl}
                                username={u.username}
                            />
                        </td>
                        <td>{u.username}</td>
                        <td>
                            <AllUsersEditRole
                                user={u.username}
                                userId={u.id}
                                userRoles={u.roles}
                                adminToken={adminToken}
                                setUsers={setUsers}
                            />
                        </td>
                        <td>{formatFullDate(u.creationDate)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default AllUsersTable;