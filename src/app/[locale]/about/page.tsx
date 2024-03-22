import React from 'react';

import './about.scss';
import Layout from '@/components/Layout/Layout';

interface AboutProps { }

const About: React.FC<AboutProps> = () => {
    return (
        <Layout>
            <main>About page</main>
        </Layout>
    );
};

export default About;