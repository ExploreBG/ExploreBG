import React, { Dispatch, SetStateAction, ReactNode, createContext, useContext, useState } from 'react';

interface FullscreenContextProps {
    isFullscreen: boolean;
    setIsFullscreen: Dispatch<SetStateAction<boolean>>;
}

const FullscreenContext = createContext<FullscreenContextProps | undefined>(undefined);

export const useFullscreenCtx = () => {
    const context = useContext(FullscreenContext);

    if (!context) {
        throw new Error('useFullscreen must be used within a FullscreenProvider');
    }

    return context;
};

export const FullscreenProvider = ({ children }: { children: ReactNode }) => {
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

    return (
        <FullscreenContext.Provider value={{ isFullscreen, setIsFullscreen }}>
            {children}
        </FullscreenContext.Provider>
    );
};
