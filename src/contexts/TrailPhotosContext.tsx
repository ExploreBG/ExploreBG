import React, { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

import { TPhoto } from '@/interfaces/interfaces';

interface TrailPhotosContextProps {
    photos: TPhoto[];
    setPhotos: Dispatch<SetStateAction<TPhoto[]>>;
    isUploading: boolean;
    setIsUploading: Dispatch<SetStateAction<boolean>>;
    changeMainClick: boolean;
    setChangeMainClick: Dispatch<SetStateAction<boolean>>;
    isDeletePhotosClick: boolean;
    setIsDeletePhotosClick: Dispatch<SetStateAction<boolean>>;
    photosForDelete: number[];
    setPhotosForDelete: Dispatch<SetStateAction<number[]>>;
    showConfirmationModal: boolean;
    setShowConfirmationModal: Dispatch<SetStateAction<boolean>>;
}

const TrailPhotosContext = createContext<TrailPhotosContextProps | undefined>(undefined);

export const useTrailPhotosCtx = () => {
    const context = useContext(TrailPhotosContext);

    if (!context) {
        throw new Error('useTrailPhotosCtx must be used within a TrailPhotosContextProvider');
    }

    return context;
};

export const TrailPhotosContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [photos, setPhotos] = useState<TPhoto[]>([]);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [changeMainClick, setChangeMainClick] = useState<boolean>(false);
    const [isDeletePhotosClick, setIsDeletePhotosClick] = useState<boolean>(false);
    const [photosForDelete, setPhotosForDelete] = useState<number[]>([]);
    const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);

    const ctx = {
        photos,
        setPhotos,
        isUploading,
        setIsUploading,
        changeMainClick,
        setChangeMainClick,
        isDeletePhotosClick,
        setIsDeletePhotosClick,
        photosForDelete,
        setPhotosForDelete,
        showConfirmationModal,
        setShowConfirmationModal
    };

    return (
        <TrailPhotosContext.Provider value={ctx}>
            {children}
        </TrailPhotosContext.Provider>
    );
};