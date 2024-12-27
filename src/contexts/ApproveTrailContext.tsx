import React, { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

import { ITrail } from '@/interfaces/interfaces';

interface ApproveTrailContextProps {
    ctxDataForReview: ITrail | undefined;
    setCtxDataForReview: Dispatch<SetStateAction<ITrail | undefined>>;
}

const ApproveTrailContext = createContext<ApproveTrailContextProps | undefined>(undefined);

export const useApproveTrailCtx = () => {
    const context = useContext(ApproveTrailContext);

    if (!context) {
        throw new Error('useApproveTrailCtx must be used within a ApproveTrailContextProvider');
    }

    return context;
};

export const ApproveTrailContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [ctxDataForReview, setCtxDataForReview] = useState<ITrail | undefined>(undefined);

    return (
        <ApproveTrailContext.Provider value={{ ctxDataForReview, setCtxDataForReview }}>
            {children}
        </ApproveTrailContext.Provider>
    );
};
