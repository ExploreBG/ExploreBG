'use client';

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Link from 'next/link';
import { AiOutlineFieldNumber } from 'react-icons/ai';

import { IUserSession, IWaitingApproval, TImagesForReview } from '@/interfaces/interfaces';
import { agent } from '@/api/agent';
import { DEFAULT_PAGE_NUMBER, DEFAULT_CARDS_PER_PAGE } from '@/utils/constants';
import { formatFullDate } from '@/utils/utils';

import CViewDetails from '../common/CViewDetails/CViewDetails';
import PaginationControls from '../PaginationControls/PaginationControls';

const pathnames = {
    trails: 'trail-review',
    destinations: 'destination-review',
    accommodations: 'accommodation-review',
};

interface WaitingApprovalCount {
    accommodations: number,
    destinations: number,
    trails: number
}

interface AllWaitingApprovalTableProps {
    waitingApproval: WaitingApprovalCount;
    userSession: IUserSession;
    searchParams: { [key: string]: string | string[] | undefined };
}

const getCollection = async (
    collection: string,
    query: string,
    token: string,
    setData: Dispatch<SetStateAction<IWaitingApproval[]>>,
    setTotalElements: Dispatch<SetStateAction<number>>,
    page: string | string[],
    resultsPerPage: string | string[],
    setCountFrom: Dispatch<SetStateAction<number>>
) => {
    try {
        const res = await agent.apiAdmin.getWaitingApprovalCollection(collection, query, token);

        setData(res?.content ?? []);
        setTotalElements(res?.totalElements ?? 0);

        const countFrom = (res?.totalElements ?? 0) - (Number(page) - 1) * Number(resultsPerPage);
        setCountFrom(countFrom);
    } catch (err) {
        console.error('Error fetching collection:', err);
    }
};

const AllWaitingApprovalTable: React.FC<AllWaitingApprovalTableProps> = ({
    waitingApproval, userSession, searchParams
}) => {
    const [activeCollection, setActiveCollection] = useState<string>('');
    const [data, setData] = useState<IWaitingApproval[]>([]);
    const [totalElements, setTotalElements] = useState<number>(0);
    const [countFrom, setCountFrom] = useState<number>(0);

    const page = searchParams['pageNumber'] ?? DEFAULT_PAGE_NUMBER;
    const resultsPerPage = searchParams['pageSize'] ?? DEFAULT_CARDS_PER_PAGE;
    const query = `?pageNumber=${page}&pageSize=${resultsPerPage}`;

    useEffect(() => {
        if (activeCollection) {
            getCollection(
                activeCollection, query, userSession.token, setData, setTotalElements, page, resultsPerPage, setCountFrom
            );
        }
    }, [activeCollection, query, userSession.token, page, resultsPerPage]);

    const imageDetails = (images: TImagesForReview) => {
        return (
            <ul>
                {images.map((i) => (
                    <li key={i.id}>
                        {`id: ${i.id} -- ${i.image_status == 'pending'
                            ? i.image_status
                            : `reviewed by: ${i.reviewedBy?.username}`}
                        `}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <>
            <ul className="admin-wrapper__pending-menu">
                {Object.entries(waitingApproval).map(([collection, count]) => (
                    <li
                        key={collection}
                        onClick={() => setActiveCollection(collection)}
                        className={activeCollection === collection ? 'active' : ''}
                        style={{ display: (count == 0 ? 'none' : 'inline-block') }}
                    >
                        {`${collection} - ${count}`}
                    </li>
                ))}
            </ul>

            <table>
                <thead>
                    <tr>
                        <th><AiOutlineFieldNumber /></th>
                        <th>Name</th>
                        <th>Details status</th>
                        <th>Link</th>
                        <th>Images status</th>
                        <th>Gpx status</th>
                        <th>Creation date</th>
                        <th>Review by</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((p, index: number) => (
                        <tr key={p.id}>
                            <td>{countFrom - index}</td>
                            <td>{p.name}</td>
                            <td>{`${p.detailsStatus}`}</td>
                            <td>
                                {(userSession.userId == p.reviewedBy?.id || p.detailsStatus != 'review') && (
                                    <Link href={`/admin/${pathnames[activeCollection as keyof typeof pathnames]}/${p.id}`}>
                                        View
                                    </Link>
                                )}
                            </td>
                            <td>
                                {p.images.length > 0 && (
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span>
                                            {`${p.images.filter((i) => i.image_status == 'pending').length} - pending`}
                                        </span>
                                        <span>
                                            {`${p.images.filter((i) => i.image_status == 'review').length} - review`}
                                        </span>
                                        <span>
                                            {`${p.images.filter((i) => i.image_status == 'approved').length} - approved`}
                                        </span>
                                        <CViewDetails element={imageDetails(p.images)} />
                                    </div>
                                )}
                            </td>
                            <td>
                                <div>
                                    <span>{p.gpxFile?.gpxStatus}</span>
                                    {p.gpxFile?.gpxStatus && p.gpxFile?.gpxStatus != 'pending' && (
                                        <CViewDetails details={`reviewed by: ${p.gpxFile?.reviewedBy?.username}`} />
                                    )}
                                </div>
                            </td>
                            <td>{formatFullDate(p.creationDate)}</td>
                            <td>{p.reviewedBy?.username}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <PaginationControls totalElements={totalElements} />
        </>
    );
};

export default AllWaitingApprovalTable;