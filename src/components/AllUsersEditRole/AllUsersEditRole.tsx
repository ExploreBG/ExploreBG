import React, { Dispatch, SetStateAction, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { IUser } from '@/interfaces/interfaces';
import { agent } from '@/api/agent';

import CCommonModal from '../common/CCommonModal/CCommonModal';

interface AllUsersEditRoleProps {
    user: IUser;
    adminOrModeratorToken: string;
    isAdmin: boolean;
    setUsers: Dispatch<SetStateAction<IUser[]>>;
}

const AllUsersEditRole: React.FC<AllUsersEditRoleProps> = ({
    user, adminOrModeratorToken, isAdmin, setUsers
}) => {
    const [isClickEdit, setIsClickEdit] = useState<boolean>(false);
    const [isModerator, setIsModerator] = useState<boolean>(user.roles.some(obj => obj.role === 'Moderator'));

    const currentUserFromTableIsAdmin = user.roles.some(obj => obj.role === 'Admin');

    const onConfirm = async () => {
        try {
            const body = { moderator: (isModerator ? false : true) }

            const res = await agent.apiAdmin.updateUserRole(user.id, adminOrModeratorToken, body);

            setIsClickEdit(!isClickEdit);

            if (res.data) {
                setUsers(state => state.map((user) => user.id === res.data.id ? res.data : user));
                toast.success('Successful update');
                setIsModerator(!isModerator);
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
                    {user.roles.map((r, index) => (
                        <li
                            key={index}
                            style={{
                                listStyle: (user.roles.length > 1 ? 'disc' : 'none'),
                                color: (currentUserFromTableIsAdmin || isModerator ? 'yellow' : '')
                            }}
                        >
                            {r.role}
                        </li>
                    ))}
                </ul>
                {(isAdmin && !currentUserFromTableIsAdmin && user.accountNonLocked) && (
                    <FaEdit onClick={() => setIsClickEdit(!isClickEdit)} />
                )}
            </div>

            {isClickEdit && (
                <CCommonModal>
                    <p>Are you sure you want to make <b>{user.username}</b> {isModerator ? 'just member' : 'a Moderator'}?</p>

                    <button onClick={onConfirm}>Yes, please</button>
                    <button onClick={() => setIsClickEdit(false)}>Cancel</button>
                </CCommonModal>
            )}
        </>
    );
};

export default AllUsersEditRole;