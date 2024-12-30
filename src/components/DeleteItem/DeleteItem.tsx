'use client';

import React, { useState } from 'react';
import { useRouter } from '@/i18n/routing';

import { agent } from '@/api/agent';

import './DeleteItem.scss';
import CConfirmationModal from '../common/CConfirmationModal/CConfirmationModal';

interface DeleteItemProps {
    deletionObj: string;
    itemType: 'trail' | 'destination' | 'hike' | 'accommodation';
    itemId: number;
    token: string;
}

const DeleteItem: React.FC<DeleteItemProps> = ({ deletionObj, itemType, itemId, token }) => {
    const [isClickDeleteItemBtn, setIsClickDeleteItemBtn] = useState<boolean>(false);
    const router = useRouter();

    const onConfirmClick = async () => {
        try {
            let res;

            if (itemType == 'trail') {
                res = await agent.apiTrails.deleteTrail(itemId, token);
            } else if (itemType == 'destination') {
                // TO DO
            } else if (itemType == 'hike') {
                // TO DO
            } else if (itemType == 'accommodation') {
                // TO DO
            }

            if (res.data) {
                router.push('/users/my-profile');
            }
        } catch (err) {
            console.error('Failed to delete this item: ', err);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsClickDeleteItemBtn(true)}
                className='delete-item-btn'
            >
                Delete this item
            </button>

            {isClickDeleteItemBtn && (
                <CConfirmationModal
                    deletionObj={deletionObj}
                    confirm={onConfirmClick}
                    cancel={() => setIsClickDeleteItemBtn(false)} />
            )}
        </>
    );
};

export default DeleteItem;