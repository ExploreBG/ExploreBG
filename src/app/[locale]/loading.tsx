import React from 'react';
import { useTranslations } from 'next-intl';

interface LoadingProps { }

const Loading: React.FC<LoadingProps> = () => {
    const t = useTranslations('loading');
    const text = t('text');

    return (
        <main className="loading">
            {/* <h1>
                {text.split('').map((l, index) => (
                    <span key={index}>{l}</span>
                ))}
                <span>.</span>
                <span>.</span>
                <span>.</span>
            </h1> */}
        </main>
    );
};

export default Loading;