'use client';

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { usePathname } from '@/navigation';

import { DEFAULT_PAGE_NUMBER, DEFAULT_CARDS_PER_PAGE, DEFAULT_SORT_BY, SORT_DIR_DESC } from '@/utils/constants';

import './paginationControls.scss';

interface PaginationControlsProps {
    totalElements: number;
    sortByProp?: string;
    sortDirProp?: string;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
    totalElements, sortByProp, sortDirProp
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const cardsPerPage = searchParams.get('pageSize') ?? DEFAULT_CARDS_PER_PAGE;
    const page = Number(searchParams.get('pageNumber') ?? DEFAULT_PAGE_NUMBER);
    const totalPages = Math.ceil(totalElements / Number(cardsPerPage));

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
                onClick={() => onChangePage(i)}
                className={i == page ? 'current-btn' : ''}
            >
                {i}
            </button>
        );
    }

    const sortBy = searchParams.get('sortBy');
    const sortDir = searchParams.get('sortDir');

    const onChangePage = (newPage: number) => {
        const newParams = new URLSearchParams(searchParams.toString());

        newParams.set('pageNumber', newPage.toString());
        newParams.set('pageSize', cardsPerPage);
        newParams.set('sortBy', sortByProp ?? (sortBy ?? DEFAULT_SORT_BY));
        newParams.set('sortDir', sortDirProp ?? (sortDir ?? SORT_DIR_DESC));

        router.push(`${pathname}?${newParams.toString()}`);
    };

    return (
        <>
            {totalElements && (
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
            )}
        </>
    );
};

export default PaginationControls;