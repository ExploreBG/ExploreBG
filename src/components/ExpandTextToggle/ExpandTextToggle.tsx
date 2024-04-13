import React, { useState } from 'react';
import { GiClick } from 'react-icons/gi';

interface ExpandTextToggleProps {
    text: string
    length: number
}

const ExpandTextToggle: React.FC<ExpandTextToggleProps> = ({ text, length }) => {
    const [isExpand, setIsExpand] = useState<boolean>(false);

    const slice = text.length > length
        ? text.slice(0, length) + ' ..... click to expand '
        : text;

    return (
        <p onClick={() => setIsExpand(!isExpand)}>
            {isExpand ? text : slice}
            &nbsp;&nbsp;{text.length > length && <GiClick />}
        </p>
    );
};

export default ExpandTextToggle;