import React from 'react';

import './CSmallHeader.scss';
import CLogo from '../CLogo/CLogo';
import CBackBtn from '../CBackBtn/CBackBtn';

interface CSmallHeaderProps { }

const CSmallHeader: React.FC<CSmallHeaderProps> = () => {
    return (
        <header>
            <CLogo />
            <CBackBtn />
        </header>
    );
};

export default CSmallHeader;