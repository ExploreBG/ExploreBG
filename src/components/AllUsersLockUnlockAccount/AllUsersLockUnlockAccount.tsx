import React, { Dispatch, SetStateAction, useState } from 'react';
import { CiUnlock } from 'react-icons/ci';
import { FaUserLock } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { IUser } from '@/interfaces/interfaces';
import { agent } from '@/api/agent';

import CCommonModal from '../common/CCommonModal/CCommonModal';

interface AllUsersLockUnlockAccountProps {
    user: IUser;
    adminOrModeratorToken: string;
    isAdmin: boolean;
    setUsers: Dispatch<SetStateAction<IUser[]>>;
}

const AllUsersLockUnlockAccount: React.FC<AllUsersLockUnlockAccountProps> = ({
    user, adminOrModeratorToken, isAdmin, setUsers
}) => {
    const [account, setAccount] = useState<IUser>(user);
    const [isClickLockUnlockAccount, setIsClickLockUnlockAccount] = useState<boolean>(false);

    const currentUserFromTableIsModerator = account.roles.some(obj => obj.role === 'Moderator');

    const onConfirm = async () => {
        try {
            if (!isAdmin && currentUserFromTableIsModerator) {
                toast.info(`You don't have permission to lock the account of a Moderator!`);
                setIsClickLockUnlockAccount(false);
                return;
            }

            const body = { lockAccount: account.accountNonLocked ? true : false }

            const res = await agent.apiAdmin.lockAccount(account?.id, adminOrModeratorToken, body);

            setIsClickLockUnlockAccount(false);

            if (res.data) {
                const updatedUser = { ...account, accountNonLocked: !account.accountNonLocked };

                toast.success(`Successful ${account.accountNonLocked ? 'lock' : 'unlock'} this account`);
                setAccount(updatedUser);
                setUsers(state => state.map((u) => u.id === account.id ? updatedUser : u));
            } else if (res.message) {
                toast.error(res.message);
            } else if (res.errors) {
                res.errors.forEach((er: string) => toast.error(er));
            }
        } catch (err) {
            console.error('An error occurred while try to lock account' + err);
        }
    };

    return (
        <>
            {account.username} &nbsp;&nbsp;
            {account.roles.some(obj => obj.role !== 'Admin') && (
                <span onClick={() => setIsClickLockUnlockAccount(true)} className="lock-unlock-icon">
                    {(account.accountNonLocked) ? <CiUnlock /> : <FaUserLock />}
                </span>
            )}

            {isClickLockUnlockAccount && (
                <CCommonModal>
                    <p>Are you sure you want to {account.accountNonLocked ? 'lock' : 'unlock'} <b>{account?.username}</b>&apos;s account?</p>

                    <button onClick={onConfirm} className="confirm-btn">Yes, please</button>
                    <button onClick={() => setIsClickLockUnlockAccount(false)}>Cancel</button>
                </CCommonModal>
            )}
        </>
    );
};

export default AllUsersLockUnlockAccount;