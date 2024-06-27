import React, { useState } from 'react';

interface CFormInputSearchProps {
    suggestions: string[]
    key: string | undefined
    name: string | undefined
}

export const CFormInputSearch: React.FC<CFormInputSearchProps> = ({ suggestions, key, name }) => {
    const [search, setSearch] = useState<string>('');
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

    const onSearch = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;

        setSearch(value);

        if (value) {
            const filtered = suggestions.filter(s => s.toLowerCase().includes(value.toLowerCase()));

            setFilteredSuggestions(filtered);
        } else {
            setFilteredSuggestions([]);
        }
    };

    const onSuggestionClick = (submission: React.SetStateAction<string>) => {
        setSearch(submission);
        setFilteredSuggestions([]);
    };

    return (
        <>
            <input
                type="text"
                key={key}
                name={name}
                value={search}
                onChange={onSearch}
                placeholder="Type to search..."
            />
            {filteredSuggestions.length > 0 && (
                <ul className="form-container__form__pair__search__suggestions">
                    {filteredSuggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => onSuggestionClick(suggestion)}
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