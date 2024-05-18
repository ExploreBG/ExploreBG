import React from 'react';
import { FaRegCopyright } from 'react-icons/fa6';

interface CSmallFooterProps { }

export const CSmallFooter: React.FC<CSmallFooterProps> = () => {
    return (
        <footer>
            <FaRegCopyright /> {new Date().getFullYear()} Explore BG
        </footer>
    );
};

export default CSmallFooter;
