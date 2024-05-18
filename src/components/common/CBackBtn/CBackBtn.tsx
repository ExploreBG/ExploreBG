'use client';

import React from 'react';
import { useRouter } from '@/navigation';
import { RiArrowGoBackFill } from 'react-icons/ri';

interface CBackBtnProps {
    btn: string
}

const CBackBtn: React.FC<CBackBtnProps> = ({ btn }) => {
    const router = useRouter();

    return (
        <button onClick={() => router.back()}>{btn} <RiArrowGoBackFill /></button>
    );
};

export default CBackBtn;