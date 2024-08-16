import React, { Dispatch, SetStateAction, useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { MdKeyboardArrowDown } from 'react-icons/md';

import useCloseOnEscapeTabAndClickOutside from '@/hooks/useCloseOnEscapeTabAndClickOutside';

import './CCustomSelect.scss';

interface CCustomSelectProps {
    options: string[] | number[];
    translateKey: string;
    onChangeForStrValue?: Dispatch<SetStateAction<string>>;
    onChangeForNumValue?: Dispatch<SetStateAction<number>>;
    initialValue?: string | number;
}

const CCustomSelect: React.FC<CCustomSelectProps> = ({
    options, onChangeForStrValue, onChangeForNumValue, translateKey, initialValue
}) => {
    const t = useTranslations(translateKey);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<string | number>(initialValue ?? options[0]);
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    const selectRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && dropdownRef.current) {
            dropdownRef.current.focus();
        }
    }, [isOpen]);

    const handleSelect = (value: string | number) => {
        setSelected(value);

        if (onChangeForStrValue) {
            onChangeForStrValue(String(value));
        } else if (onChangeForNumValue) {
            onChangeForNumValue(Number(value));
        }
        setIsOpen(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'ArrowDown' && isOpen) {
            e.preventDefault();

            setCurrentIndex((prevIndex) =>
                prevIndex < options.length - 1 ? prevIndex + 1 : prevIndex
            );
        } else if (e.key === 'ArrowUp' && isOpen) {
            e.preventDefault();

            setCurrentIndex((prevIndex) => prevIndex > 0 ? prevIndex - 1 : 0);
        } else if (e.key === 'Enter' && isOpen) {
            e.preventDefault();

            if (currentIndex >= 0 && currentIndex < options.length) {
                handleSelect(options[currentIndex]);
            }
        } else if (e.key === 'Enter' && !isOpen || e.key === 'ArrowDown' && !isOpen || e.key === 'ArrowUp' && !isOpen) {
            e.preventDefault();
            setIsOpen(true)
        }
    };

    useCloseOnEscapeTabAndClickOutside(selectRef, () => setIsOpen(false));

    return (
        <div ref={selectRef} onKeyDown={handleKeyDown} className="custom-select">
            <div
                tabIndex={0}
                onClick={() => setIsOpen(!isOpen)}
                className={`custom-select__field ${isOpen ? 'open' : ''}`}
            >
                <span>{typeof selected === 'number' ? selected : t(selected)}</span>
                <MdKeyboardArrowDown className={isOpen ? 'rotate' : ''} />
            </div>
            {isOpen && (
                <div ref={dropdownRef} tabIndex={-1} className="custom-select__dropdown">
                    <div className="custom-select__dropdown__options">
                        {options.map((v, index) => (
                            <div
                                key={v}
                                onClick={() => handleSelect(v)}
                                className={`custom-select__dropdown__options__option 
                                    ${index === currentIndex ? 'active' : ''}
                                    ${v === selected ? 'selected' : ''} 
                                `}
                            >
                                {typeof v === 'number' ? v : t(v)}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CCustomSelect;