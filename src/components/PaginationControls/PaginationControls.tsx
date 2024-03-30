'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/navigation';

import './paginationControls.scss';

interface PaginationControlsProps {
    totalElements: number
    cardsPerPage: number
}

const PaginationControls: React.FC<PaginationControlsProps> = ({ totalElements, cardsPerPage }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const page = Number(searchParams.get('pageNumber') ?? '1');
    const totalPages = Math.ceil(totalElements / cardsPerPage);

    const buttons = [];
    let start = page == 1 ? 1 : page - 1;
    let end = totalPages;

    if (totalPages >= 5) {
        if (totalPages > start + 4) {
            end = start + 4;
        } else {
            start = totalPages - 4;
        }
    }

    for (let i = start; i <= end; i++) {
        buttons.push(
            <button
                key={i}
                // @ts-ignore
                onClick={() => onChangePage(i)}
                className={i == page ? 'current-btn' : ''}
            >
                {i}
            </button>
        );
    }

    const onChangePage = (page: number) => {
        // @ts-ignore
        return router.push(`?pageNumber=${page}&pageSize=${cardsPerPage}&sortBy=hikeDate&sortDir=DESC`);
    };

    return (
        <aside className="pagination-buttons">
            <button
                onClick={() => onChangePage(1)}
                disabled={page == 1}
            >
                &lt;&lt;&lt;
            </button>
            <button
                onClick={() => onChangePage(page - 1)}
                className="pagination-buttons__prev-next"
                disabled={page == 1}
            >
                Prev
            </button>

            {buttons}
            
            <button
                onClick={() => onChangePage(page + 1)}
                className="pagination-buttons__prev-next"
                disabled={page == totalPages}
            >
                Next
            </button>
            <button
                onClick={() => onChangePage(totalPages)}
                disabled={page == totalPages}
            >
                &gt;&gt;&gt;
            </button>
        </aside>
    );
};

export default PaginationControls;