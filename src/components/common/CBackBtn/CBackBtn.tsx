'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/navigation';
import { RiArrowGoBackFill } from 'react-icons/ri';

interface CBackBtnProps { }

const CBackBtn: React.FC<CBackBtnProps> = () => {
    const router = useRouter();
    const t = useTranslations('navigation');

    return (
        <button
            onClick={() => router.back()}
        >
            {t('back-btn')} <RiArrowGoBackFill style={{ fontSize: '0.85rem' }} />
        </button>
    );
};

export default CBackBtn;