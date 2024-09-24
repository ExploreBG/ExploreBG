import React from 'react';
import { useLocale } from 'next-intl';

import { locales } from '@/i18n/config';

import './localeSwitcher.scss';
import LocaleSwitcherSelect from '../LocaleSwitcherSelect/LocaleSwitcherSelect';

interface LocaleSwitcherProps { }

const LocaleSwitcher: React.FC<LocaleSwitcherProps> = () => {
    const locale = useLocale();

    return (
        <LocaleSwitcherSelect defaultValue={locale}>
            {locales.map((l) => (
                <option key={l} value={l}>
                    {l}
                </option>
            ))}
        </LocaleSwitcherSelect>
    );
};

export default LocaleSwitcher;