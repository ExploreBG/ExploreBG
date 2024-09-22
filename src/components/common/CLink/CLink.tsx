import React, { ComponentProps } from 'react';

import type { AppPathnames } from '@/config';
import { Link, usePathname } from '@/navigation';

import './CLink.scss';

export default function CLink<Pathname extends AppPathnames>({
    href, ...rest
}: ComponentProps<typeof Link<Pathname>>) {
    const pathname = usePathname();
    const isActive = pathname == href;

    return (
        <Link
            href={href}
            className={`link ${isActive ? 'active-page-link' : ''}`}
            {...rest}
        />
    );
}