'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AiOutlineFieldNumber } from 'react-icons/ai';

import { IUserSession, IWaitingApproval } from '@/interfaces/interfaces';
import { agent } from '@/api/agent';
import { formatFullDate } from '@/utils/utils';

import PaginationControls from '../PaginationControls/PaginationControls';

const pathnames = {
    trails: 'trail-review',
    destinations: 'destination-review',
    accommodations: 'accommodation-review',
};

const statusFields = {
    trails: 'trailStatus',
    destinations: 'destinationStatus',
    accommodations: 'accommodationStatus',
};

interface WaitingApprovalCount {
    accommodations: { pending: number, review: number },
    destinations: { pending: number, review: number },
    trails: { pending: number, review: number }
}

interface AllWaitingApprovalTableProps {
    waitingApproval: WaitingApprovalCount;
    userSession: IUserSession;
    searchParams: { [key: string]: string | string[] | undefined };
}

const AllWaitingApprovalTable: React.FC<AllWaitingApprovalTableProps> = ({
    waitingApproval, userSession, searchParams
}) => {
    const [activeCollection, setActiveCollection] = useState<string>('');
    const [data, setData] = useState<IWaitingApproval[]>([]);
    const [totalElements, setTotalElements] = useState<number>(0);
    const [countFrom, setCountFrom] = useState<number>(0);

    const itemStatus = statusFields[activeCollection as keyof typeof statusFields];
    const page = searchParams['pageNumber'] ?? '1';
    const resultsPerPage = searchParams['pageSize'] ?? '1';
    const query = `?pageNumber=${page}&pageSize=${resultsPerPage}&sortBy=${itemStatus}`;

    useEffect(() => {
        if (activeCollection) {
            getCollection(activeCollection);
        }
    }, [activeCollection, page, resultsPerPage, itemStatus]);

    const getCollection = async (collection: string) => {
        try {
            const res = await agent.apiAdmin.getWaitingApprovalCollection(collection, query, userSession.token);

            setData(res?.content ?? []);
            setTotalElements(res?.totalElements ?? 0);

            const countFrom = (res?.totalElements ?? 0) - (Number(page) - 1) * Number(resultsPerPage);
            setCountFrom(countFrom);
        } catch (err) {
            console.error('Error fetching collection:', err);
        }
    };

    return (
        <>
            <ul className="admin-wrapper__pending-menu">
                {Object.entries(waitingApproval).map(([collection, status]) => (
                    <li
                        key={collection}
                        onClick={() => setActiveCollection(collection)}
                        className={activeCollection === collection ? 'active' : ''}
                        style={{ display: ((status.pending == 0 && status.review == 0) ? 'none' : 'inline-block') }}
                    >
                        {`${collection} - p: ${status.pending} / r: ${status.review}`}
                    </li>
                ))}
            </ul>

            <table>
                <thead>
                    <tr>
                        <th><AiOutlineFieldNumber /></th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Link</th>
                        <th>Creation date</th>
                        <th>Review by</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((p, index: number) => (
                        <tr key={p.id}>
                            <td>{countFrom - index}</td>
                            <td>{p.name}</td>
                            <td>{p.status}</td>
                            <td>
                                {(userSession.userId == p.reviewedBy?.id || p.status != 'review') && (
                                    <Link href={`/admin/${pathnames[activeCollection as keyof typeof pathnames]}/${p.id}`}>
                                        View
                                    </Link>
                                )}
                            </td>
                            <td>{formatFullDate(p.creationDate)}</td>
                            <td>{p.reviewedBy?.username}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <PaginationControls
                totalElements={totalElements}
                cardsPerPage={Number(resultsPerPage)}
                pathname={`/admin/waiting-approval`}
                sortBy={itemStatus}
                sortDir={'DESC'}
            />
        </>
    );
};

export default AllWaitingApprovalTable;