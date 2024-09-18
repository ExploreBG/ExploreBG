'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { ITrail, ITrailCard } from '@/interfaces/interfaces';
import { agent } from '@/api/agent';

import SortOptionsPanel from '../SortOptionsPanel/SortOptionsPanel';
import TrailCard from '../TrailCard/TrailCard';
import PaginationControls from '../PaginationControls/PaginationControls';

interface AllTrailsClientProps {
    trails: ITrail[];
    totalElements: number;
    token?: string;
}

const AllTrailsClient: React.FC<AllTrailsClientProps> = ({ trails, totalElements, token }) => {
    const searchParams = useSearchParams();
    const [trailsState, setTrailsState] = useState<ITrail[]>(trails);

    useEffect(() => {
        Boolean(searchParams.toString()) && (async () => {
            const query = `?${searchParams.toString()}`;

            const res = token
                ? await agent.apiTrails.getAllTrails(query, token)
                : await agent.apiTrails.getAllTrails(query);

            res.data && setTrailsState(res.data.content);
        })();
    }, [searchParams, token]);

    return (
        <>
            <SortOptionsPanel token={token} />

            <section className="catalog-wrapper__cards">
                {trailsState.map((card: ITrailCard) => (
                    <article key={card.id} className="card">
                        <TrailCard card={card} />
                    </article>
                ))}
            </section>

            <PaginationControls totalElements={totalElements} />
        </>
    );
};

export default AllTrailsClient;