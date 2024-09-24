import React, { ComponentProps } from 'react';

import type { AppPathnames } from '@/i18n/config';
import { Link, usePathname } from '@/i18n/routing';

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