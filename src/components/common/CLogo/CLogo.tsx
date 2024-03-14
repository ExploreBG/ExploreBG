import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import './CLogo.scss';

interface CLogoProps { }

const CLogo: React.FC<CLogoProps> = () => {
    return (
        <Link href={'/'}>
            <figure className="logo">
                <figcaption>Explore BG</figcaption>
                <Image
                    src="/logo.png"
                    width={40} height={40} loading="eager"
                    alt="logo" title="Logo" priority={true}
                />
            </figure>
        </Link>
    );
};

export default CLogo;