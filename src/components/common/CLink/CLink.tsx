import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import './CLink.scss';

interface CLinkProps {
    item: {
        title: string
        path: string
    }
}

const CLink: React.FC<CLinkProps> = ({ item }) => {
    const pathName = usePathname();

    return (
        <Link href={item.path} className={`link ${pathName == item.path && 'active'}`}>
            {item.title}
        </Link>
    );
};

export default CLink;