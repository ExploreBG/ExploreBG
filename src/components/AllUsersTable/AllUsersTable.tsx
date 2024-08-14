'use client';

import React, { useEffect, useState } from 'react';
import { AiOutlineFieldNumber } from 'react-icons/ai';

import { IUser } from '@/interfaces/interfaces';
import { formatFullDate } from '@/utils/utils';

import CMemberImage from '../common/CMemberImage/CMemberImage';
import AllUsersLockUnlockAccount from '../AllUsersLockUnlockAccount/AllUsersLockUnlockAccount';
import AllUsersEditRole from '../AllUsersEditRole/AllUsersEditRole';

interface AllUsersTableProps {
    data: IUser[];
    adminOrModeratorToken: string;
    isAdmin: boolean;
    // userCountFrom: number
}

const AllUsersTable: React.FC<AllUsersTableProps> = ({ data, adminOrModeratorToken, isAdmin }) => {
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
                    <tr key={u.id} className={u.accountNonLocked ? '' : 'locked-account'}>
                        <td>{users.length - index}</td>
                        <td>
                            <CMemberImage
                                ownerId={u.id}
                                imageUrl={u.imageUrl}
                                username={u.username}
                            />
                        </td>
                        <td>
                            <AllUsersLockUnlockAccount
                                user={u}
                                adminOrModeratorToken={adminOrModeratorToken}
                                isAdmin={isAdmin}
                                setUsers={setUsers}
                            />
                        </td>
                        <td>
                            <AllUsersEditRole
                                user={u}
                                adminOrModeratorToken={adminOrModeratorToken}
                                isAdmin={isAdmin}
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