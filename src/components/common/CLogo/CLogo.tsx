'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import './CLogo.scss';

interface CLogoProps { }

const CLogo: React.FC<CLogoProps> = () => {
    const currentPath = usePathname();
    const [oldPath, setOldPath] = useState<string>('');

    useEffect(() => {
        if (currentPath != oldPath) {
            const timer = setTimeout(() => {
                setOldPath(currentPath);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [currentPath, oldPath]);

    return (
        <Link href={'/'}>
            <figure className="logo">
                <figcaption>
                    <span className={oldPath != currentPath ? 'rolling' : ''}>E</span>
                    <span className={oldPath != currentPath ? 'rolling' : ''}>x</span>
                    <span className={oldPath != currentPath ? 'rolling' : ''}>p</span>
                    <span className={oldPath != currentPath ? 'rolling' : ''}>l</span>
                    <span className={oldPath != currentPath ? 'rolling' : ''}>o</span>
                    <span className={oldPath != currentPath ? 'rolling' : ''}>r</span>
                    <span className={oldPath != currentPath ? 'rolling' : ''}>e</span>
                    <span>&nbsp;</span>
                    <span className={oldPath != currentPath ? 'rolling' : ''}>B</span>
                    <span className={oldPath != currentPath ? 'rolling' : ''}>G</span>
                </figcaption>
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