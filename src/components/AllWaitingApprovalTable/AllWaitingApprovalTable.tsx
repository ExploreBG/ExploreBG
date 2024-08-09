'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AiOutlineFieldNumber } from 'react-icons/ai';

import { IUserSession, IWaitingApproval } from '@/interfaces/interfaces';
import { agent } from '@/api/agent';
import { formatFullDate } from '@/utils/utils';
import { setSession } from '@/utils/userSession';

import PaginationControls from '../PaginationControls/PaginationControls';

interface AllWaitingApprovalTableProps {
    waitingApproval: { destinations: number, trails: number, accommodations: number };
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
    const router = useRouter();

    const page = searchParams['pageNumber'] ?? '1';
    const resultsPerPage = searchParams['pageSize'] ?? '1';
    const query = `?pageNumber=${page}&pageSize=${resultsPerPage}&sortBy=id&sortDir=DESC`;

    useEffect(() => {
        if (activeCollection) {
            getCollection(activeCollection);
        }
    }, [page]);

    const getCollection = async (collection: string) => {
        try {
            const res = await agent.apiAdmin.getWaitingApprovalCollection(collection, query, userSession.token);

            setData(res.content);
            setTotalElements(res.totalElements);

            const countFrom = res?.totalElements - (Number(page) - 1) * Number(resultsPerPage);
            setCountFrom(countFrom);
        } catch (err) {
            console.error(err);
        }
    }

    const handleCollectionClick = (collection: string) => {
        setActiveCollection(collection);

        getCollection(collection);
    };

    const onViewItemClick = async (id: number) => {
        await setSession({ ...userSession, itemForReviewId: id });

        router.push(`/${activeCollection}/create`);
    };

    return (
        <>
            <ul className="admin-wrapper__pending-menu">
                {Object.entries(waitingApproval).map(([collection, count]) => (
                    <li
                        key={collection}
                        onClick={() => handleCollectionClick(collection)}
                        className={activeCollection === collection ? 'active' : ''}
                    >
                        {`${collection}: ${count}`}
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
                            <td onClick={() => onViewItemClick(p.id)} className="td-link">View</td>
                            <td>{formatFullDate(p.creationDate)}</td>
                            <td>{p.reviewedBy}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <PaginationControls
                totalElements={totalElements}
                cardsPerPage={Number(resultsPerPage)}
                pathname={`/admin/waiting-approval`}
                sortBy={'id'}
                sortDir={'DESC'}
            />
        </>
    );
};

export default AllWaitingApprovalTable;