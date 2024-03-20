import React, { ComponentProps } from 'react';
import { useSelectedLayoutSegment } from 'next/navigation';

import type { AppPathnames } from '@/config';
import { Link } from '@/navigation';

import './CLink.scss';

export default function CLink<Pathname extends AppPathnames>({
    href, ...rest
}: ComponentProps<typeof Link<Pathname>>) {
    const selectedLayoutSegment = useSelectedLayoutSegment();
    const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/';
    const isActive = pathname == href;

    return (
        <Link href={href} className={`link ${isActive && 'active'}`} {...rest} />
    );
}