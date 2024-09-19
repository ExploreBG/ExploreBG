import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { usePathname } from '@/navigation';

import { DEFAULT_PAGE_NUMBER, DEFAULT_CARDS_PER_PAGE } from '@/utils/constants';

interface SortOptionsPanelProps {
    alphabeticallySearchParam: string;
    token?: string;
}

const SortOptionsPanel: React.FC<SortOptionsPanelProps> = ({ alphabeticallySearchParam, token }) => {
    const t = useTranslations('common');
    const [activeSort, setActiveSort] = useState<string>('id-DESC');
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const pageNumber = searchParams.get('pageNumber');
    const pageSize = searchParams.get('pageSize');

    const updateSortParams = async (sortBy: string, sortDir: string, sortByLikedUser?: string) => {
        setActiveSort(`${sortBy}-${sortDir}${sortByLikedUser ? '-true' : ''}`);
        const newParams = new URLSearchParams(searchParams.toString());

        newParams.set('pageNumber', pageNumber ?? DEFAULT_PAGE_NUMBER);
        newParams.set('pageSize', pageSize ?? DEFAULT_CARDS_PER_PAGE);
        newParams.set('sortBy', sortBy);
        newParams.set('sortDir', sortDir);
        sortByLikedUser && newParams.set('sortByLikedUser', sortByLikedUser);
        !sortByLikedUser && newParams.delete('sortByLikedUser');

        router.push(`${pathname}?${newParams.toString()}`);
    };

    return (
        <nav className="catalog-wrapper__nav" aria-label="all-trails-page-navigation">
            <p>{t('sort-by')}</p>

            <button
                onClick={() => updateSortParams('id', 'DESC')}
                className={activeSort == 'id-DESC' ? 'active' : ''}
            >
                {t('newest')}
            </button>
            <button
                onClick={() => updateSortParams('id', 'ASC')}
                className={activeSort == 'id-ASC' ? 'active' : ''}
            >
                {t('oldest')}
            </button>
            <button
                onClick={() => updateSortParams(alphabeticallySearchParam, 'ASC')}
                className={activeSort == `${alphabeticallySearchParam}-ASC` ? 'active' : ''}
            >
                {t('A-z')}
            </button>
            <button
                onClick={() => updateSortParams(alphabeticallySearchParam, 'DESC')}
                className={activeSort == `${alphabeticallySearchParam}-DESC` ? 'active' : ''}
            >
                {t('Z-a')}
            </button>

            {token && (
                <>
                    <button
                        onClick={() => updateSortParams('id', 'DESC', 'true')}
                        className={activeSort == 'id-DESC-true' ? 'active' : ''}
                    >
                        {t('liked')}
                    </button>
                    <button
                        onClick={() => updateSortParams('id', 'ASC', 'true')}
                        className={activeSort == 'id-ASC-true' ? 'active' : ''}
                    >
                        {t('not-liked')}
                    </button>
                </>
            )}
        </nav>
    );
};

export default SortOptionsPanel;