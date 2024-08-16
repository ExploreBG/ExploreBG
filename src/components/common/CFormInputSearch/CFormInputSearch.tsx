import React, { Dispatch, SetStateAction, useState, useRef } from 'react';
import { useTranslations } from 'next-intl';

import './CFormInputSearch.scss';
import useCloseOnEscapeTabAndClickOutside from '@/hooks/useCloseOnEscapeTabAndClickOutside';

interface ISuggestion {
    id: number
    [key: string]: any
}

interface CFormInputSearchProps {
    suggestions: ISuggestion[]
    onAddSelection: Dispatch<SetStateAction<{ id: number }[]>>;
    onRemoveSelection: Dispatch<SetStateAction<{ id: number }[]>>;
    suggestionName: string;
    initialValues?: ISuggestion[]
}

const CFormInputSearch: React.FC<CFormInputSearchProps> = ({
    suggestions, onAddSelection, onRemoveSelection, suggestionName, initialValues
}) => {
    const t = useTranslations('common');
    const [search, setSearch] = useState<string>('');
    const [filteredSuggestions, setFilteredSuggestions] = useState<ISuggestion[]>([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(-1);
    const [selectedValues, setSelectedValues] = useState<ISuggestion[]>(initialValues ?? []);
    const suggestionsRef = useRef<HTMLDivElement>(null);

    const onSearch = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;

        setSearch(value);

        if (value) {
            const filtered = suggestions.filter(s => s[suggestionName].toLowerCase().includes(value.toLowerCase()));

            setFilteredSuggestions(filtered);
            setActiveSuggestionIndex(-1);
        } else {
            setFilteredSuggestions([]);
        }
    };

    const onSuggestionClick = (suggestion: ISuggestion) => {
        if (!selectedValues.find(selected => selected.id === suggestion.id)) {
            setSelectedValues([...selectedValues, suggestion]);
            onAddSelection(state => [...state, { id: suggestion.id }]);
        }

        setSearch('');
        setFilteredSuggestions([]);
        setActiveSuggestionIndex(-1);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowDown') {
            setActiveSuggestionIndex((prevIndex) =>
                prevIndex < filteredSuggestions.length - 1 ? prevIndex + 1 : prevIndex
            );
        } else if (e.key === 'ArrowUp') {
            setActiveSuggestionIndex((prevIndex) => prevIndex > 0 ? prevIndex - 1 : 0);
        } else if (e.key === 'Enter') {
            e.preventDefault();

            if (activeSuggestionIndex >= 0 && activeSuggestionIndex < filteredSuggestions.length) {
                const selectedSuggestion = filteredSuggestions[activeSuggestionIndex];

                if (!selectedValues.find(selected => selected.id === selectedSuggestion.id)) {
                    setSelectedValues([...selectedValues, selectedSuggestion]);
                    onAddSelection(state => [...state, { id: selectedSuggestion.id }]);
                }

                setSearch('');
                setFilteredSuggestions([]);
                setActiveSuggestionIndex(-1);
            }
        }
    };

    const removeSelectedValue = (id: number) => {
        const newSelectedValues = selectedValues.filter(selectedValue => selectedValue.id !== id);
        setSelectedValues(newSelectedValues);
        onRemoveSelection(state => state.filter(s => s.id !== id));
    };

    useCloseOnEscapeTabAndClickOutside(suggestionsRef, () => {
        if (filteredSuggestions.length > 0) {
            setFilteredSuggestions([]);
            setSearch('');
        }
    });

    return (
        <div className="suggestions">
            <input
                type="text"
                value={search}
                onChange={onSearch}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                placeholder={t('type-to-search')}
            />
            {filteredSuggestions.length > 0 && (
                <div ref={suggestionsRef} className="suggestions__wrapper">
                    <ul className="suggestions__wrapper__matches">
                        {filteredSuggestions.map((suggestion, index) => (
                            <li
                                key={suggestion.id}
                                onClick={() => onSuggestionClick(suggestion)}
                                className={index === activeSuggestionIndex ? 'active' : ''}
                            >
                                {suggestion[suggestionName]}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {selectedValues.map((value) => (
                <p key={value.id} className="suggestions__selected">
                    {value[suggestionName]}
                    <button type="button" onClick={() => removeSelectedValue(value.id)}>X</button>
                </p>
            ))}
        </div>
    );
};

export default CFormInputSearch;