import React, { useState } from 'react';

interface CFormInputSearchProps {
    suggestions: string[]
    key: string | undefined
    name: string | undefined
}

export const CFormInputSearch: React.FC<CFormInputSearchProps> = ({ suggestions, key, name }) => {
    const [search, setSearch] = useState<string>('');
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(-1);

    const onSearch = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;

        setSearch(value);

        if (value) {
            const filtered = suggestions.filter(s => s.toLowerCase().includes(value.toLowerCase()));

            setFilteredSuggestions(filtered);
            setActiveSuggestionIndex(-1);
        } else {
            setFilteredSuggestions([]);
        }
    };

    const onSuggestionClick = (submission: React.SetStateAction<string>) => {
        setSearch(submission);
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
                setSearch(filteredSuggestions[activeSuggestionIndex]);
                setFilteredSuggestions([]);
                setActiveSuggestionIndex(-1);
            }
        }
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
                            key={index}
                            onClick={() => onSuggestionClick(suggestion)}
                            className={index === activeSuggestionIndex ? 'active' : ''}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default CFormInputSearch;