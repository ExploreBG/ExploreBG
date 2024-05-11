import React from 'react';
import { unstable_setRequestLocale } from 'next-intl/server';

import './about.scss';
import Layout from '@/components/Layout/Layout';

interface AboutProps {
    params: { locale: string }
}

const About: React.FC<AboutProps> = ({ params: { locale } }) => {
    unstable_setRequestLocale(locale);

    return (
        <Layout>
            <main>About page</main>
        </Layout>
    );
};

export default About;