import React from 'react';
// import { unstable_setRequestLocale } from 'next-intl/server';
// import { routing } from '@/i18n/routing';

import './about.scss';
import Layout from '@/components/Layout/Layout';

interface AboutProps {
    params: { locale: string }
}

// export function generateStaticParams() {
//     return routing.locales.map((locale) => ({ locale }));
// }

const About: React.FC<AboutProps> = () => {
    // Enable static rendering
    // unstable_setRequestLocale(locale);

    return (
        <Layout>
            <main>About page</main>
        </Layout>
    );
};

export default About;