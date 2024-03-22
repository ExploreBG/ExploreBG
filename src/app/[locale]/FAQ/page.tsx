import React from 'react';

import './FAQ.scss';
import Layout from '@/components/Layout/Layout';

interface FAQProps { }

const FAQ: React.FC<FAQProps> = () => {
    return (
        <Layout>
            <main>FAQ page</main>
        </Layout>
    );
};

export default FAQ;