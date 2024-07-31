import { useEffect, RefObject } from "react";

type OnCloseType = (event: MouseEvent | KeyboardEvent) => void;

const useCloseOnEscapeAndClickOutside = (ref: RefObject<HTMLElement>, onClose: OnCloseType) => {

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClose(event);
            }
        };

        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose(event);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        document.addEventListener('keydown', handleEscapeKey);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [ref, onClose]);
};

export default useCloseOnEscapeAndClickOutside;