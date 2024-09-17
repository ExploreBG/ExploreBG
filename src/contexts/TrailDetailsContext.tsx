import React, { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

interface TrailDetailsContextProps {
    lastUpdate: string;
    setLastUpdate: Dispatch<SetStateAction<string>>;
}

const TrailDetailsContext = createContext<TrailDetailsContextProps | undefined>(undefined);

export const useTrailDetailsCtx = () => {
    const context = useContext(TrailDetailsContext);

    if (!context) {
        throw new Error('useTrailDetailsCtx must be used within a TrailDetailsContextProvider');
    }

    return context;
};

export const TrailDetailsContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [lastUpdate, setLastUpdate] = useState<string>('');

    return (
        <TrailDetailsContext.Provider value={{ lastUpdate, setLastUpdate }}>
            {children}
        </TrailDetailsContext.Provider>
    );
};
