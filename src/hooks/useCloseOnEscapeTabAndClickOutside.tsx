import { Dispatch, SetStateAction, RefObject, useEffect } from "react";

type OnCloseType = Dispatch<SetStateAction<MouseEvent | KeyboardEvent>>;

const useCloseOnEscapeTabAndClickOutside = (ref: RefObject<HTMLElement>, onClose: OnCloseType) => {

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClose(event);
            }
        };

        const handleEscapeAndTabKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' || event.key === 'Tab') {
                onClose(event);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        document.addEventListener('keydown', handleEscapeAndTabKey);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
            document.removeEventListener('keydown', handleEscapeAndTabKey);
        };
    }, [ref, onClose]);
};

export default useCloseOnEscapeTabAndClickOutside;