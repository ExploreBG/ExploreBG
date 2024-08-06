import React, { Dispatch, SetStateAction, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { IUser } from '@/interfaces/interfaces';
import { agent } from '@/api/agent';

import CCommonModal from '../common/CCommonModal/CCommonModal';

interface AllUsersEditRoleProps {
    user: string
    userId: number
    userRoles: { role: string }[]
    adminToken: string
    setUsers: Dispatch<SetStateAction<IUser[]>>
}

const AllUsersEditRole: React.FC<AllUsersEditRoleProps> = ({
    user, userRoles, userId, adminToken, setUsers
}) => {
    const [isClickEdit, setIsClickEdit] = useState<boolean>(false);

    const isAdmin = userRoles.some(obj => obj.role === 'Admin');
    const isModerator = userRoles.some(obj => obj.role === 'Moderator');

    const onClickEdit = () => {
        isModerator
            ? toast.info(`${user} is already a "Moderator"`)
            : setIsClickEdit(true);
    };

    const onConfirm = async () => {
        try {
            const body = { moderator: true }

            const res = await agent.apiAdmin.updateUserRole(userId, adminToken, body);

            setIsClickEdit(false);

            if (res.data) {
                setUsers(state => state.map((user) => user.id === res.data.id ? res.data : user));
                toast.success('Successful update');
            } else if (res.message) {
                toast.error(res.message);
            } else if (res.errors) {
                res.errors.forEach((er: string) => toast.error(er));
            }
        } catch (err) {
            console.error('An error occurred while updating the role' + err);
        }
    };

    return (
        <>
            <div>
                <ul>
                    {userRoles.map((r, index) => (
                        <li
                            key={index}
                            style={{
                                listStyle: (userRoles.length > 1 ? 'disc' : 'none'),
                                color: (isAdmin || isModerator ? 'yellow' : '')
                            }}
                        >
                            {r.role}
                        </li>
                    ))}
                </ul>
                {!isAdmin && <FaEdit onClick={onClickEdit} />}
            </div>

            {isClickEdit && (
                <CCommonModal>
                    <p>Are you sure you want to make <b>{user}</b> a moderator?</p>

                    <button onClick={onConfirm}>Yes, please</button>
                    <button onClick={() => setIsClickEdit(false)}>Cancel</button>
                </CCommonModal>
            )}
        </>
    );
};

export default AllUsersEditRole;