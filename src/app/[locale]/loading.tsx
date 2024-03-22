import React from 'react';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

interface LoadingProps {
    params: { locale: string }
}

const Loading: React.FC<LoadingProps> = ({ params }) => {
    const locale = params?.locale;
    unstable_setRequestLocale(locale);
    
    const t = useTranslations('loading');
    const text = t('text');

    return (
        <main className="loading">
            <h1>
                {text.split('').map((l, index) => (
                    <span key={index}>{l}</span>
                ))}
                <span>.</span>
                <span>.</span>
                <span>.</span>
            </h1>
        </main>
    );
};

export default Loading;