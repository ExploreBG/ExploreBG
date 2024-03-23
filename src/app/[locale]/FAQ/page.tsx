import React from 'react';

import './FAQ.scss';
import Layout from '@/components/Layout/Layout';
import QA from '@/components/QA/QA';

interface FAQProps { }

const FAQ: React.FC<FAQProps> = () => {
    return (
        <Layout>
            <main className="faq">
                <section className="faq__qa">
                    <section className="faq__qa__top">
                        <h3>Got a question?</h3>
                        <h3>Get your answer</h3>
                    </section>

                    <h1>Frequently asked questions</h1>

                    <QA />
                </section>
            </main>
        </Layout>
    );
};

export default FAQ;