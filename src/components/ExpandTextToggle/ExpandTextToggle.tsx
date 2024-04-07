import React, { useState } from 'react';
import { GiClick } from 'react-icons/gi';

interface ExpandTextToggleProps {
    text: string
    length: number
}

const ExpandTextToggle: React.FC<ExpandTextToggleProps> = ({ text, length }) => {
    const [isExpand, setIsExpand] = useState<boolean>(false);

    return (
        <p onClick={() => setIsExpand(!isExpand)}>
            {isExpand
                ? text
                : text.slice(0, length) + ' ..... click to expand '
            }
            &nbsp;&nbsp;<GiClick />
        </p>
    );
};

export default ExpandTextToggle;