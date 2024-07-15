import React, { useState } from 'react';

interface ISuggestion {
    id: number
    [key: string]: any
}

interface CFormInputSearchProps {
    suggestions: ISuggestion[]
    key: string | undefined
    name: string | undefined
    onAddSelection: (selectedValue: { id: number }) => void;
    onRemoveSelection: (id: number) => void;
    getSuggestionLabel: (suggestion: ISuggestion) => string;
}

export const CFormInputSearch: React.FC<CFormInputSearchProps> = ({
    suggestions, name, key, onAddSelection, onRemoveSelection, getSuggestionLabel
}) => {
    const [search, setSearch] = useState<string>('');
    const [filteredSuggestions, setFilteredSuggestions] = useState<ISuggestion[]>([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(-1);
    const [selectedValues, setSelectedValues] = useState<ISuggestion[]>([]);

    const onSearch = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;

        setSearch(value);

        if (value) {
            const filtered = suggestions.filter(s => getSuggestionLabel(s).toLowerCase().includes(value.toLowerCase()));

            setFilteredSuggestions(filtered);
            setActiveSuggestionIndex(-1);
        } else {
            setFilteredSuggestions([]);
        }
    };

    const onSuggestionClick = (suggestion: ISuggestion) => {
        if (!selectedValues.find(selected => selected.id === suggestion.id)) {
            setSelectedValues([...selectedValues, suggestion]);
            onAddSelection({ id: suggestion.id });
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
                    onAddSelection({ id: selectedSuggestion.id });
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
        onRemoveSelection(id);
    };

    return (
        <>
            <input
                type="text"
                key={key}
                name={name}
                value={search}
                onChange={onSearch}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                placeholder="Type to search..."
            />
            {filteredSuggestions.length > 0 && (
                <ul className="form-container__form__pair__search__suggestions">
                    {filteredSuggestions.map((suggestion, index) => (
                        <li
                            key={suggestion.id}
                            onClick={() => onSuggestionClick(suggestion)}
                            className={index === activeSuggestionIndex ? 'active' : ''}
                        >
                            {getSuggestionLabel(suggestion)}
                        </li>
                    ))}
                </ul>
            )}
            <div>
                {selectedValues.map((value) => (
                    <span key={value.id}>
                        {getSuggestionLabel(value)}
                        <button type="button" onClick={() => removeSelectedValue(value.id)}>X</button>
                    </span>
                ))}
            </div>
        </>
    );
};

export default CFormInputSearch;