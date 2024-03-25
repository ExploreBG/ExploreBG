'use client';

import React from 'react';
import { useRouter } from '@/navigation';

interface CBackBtnProps {
    btn: string
}

const CBackBtn: React.FC<CBackBtnProps> = ({ btn }) => {
    const router = useRouter();

    return (
        <button onClick={() => router.back()}>{btn}</button>
    );
};

export default CBackBtn;