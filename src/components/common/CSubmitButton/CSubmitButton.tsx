import React, { ReactNode } from 'react';
import { useFormStatus } from 'react-dom';

interface CSubmitButtonProps {
    buttonName: ReactNode
}

const CSubmitButton: React.FC<CSubmitButtonProps> = ({ buttonName }) => {
    const { pending } = useFormStatus();

    return (
        <button disabled={pending}>
            {pending ? 'Loading...' : buttonName}
        </button>
    );
};

export default CSubmitButton;