import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import './home.scss';
import Layout from '@/components/Layout/Layout';
import IntersectionObserverComponent from '@/components/IntersectionObserverComponent';
import HomeDestinationsSection from '@/components/HomeDestinationsSection/HomeDestinationsSection';
import HomeTrailsSection from '@/components/HomeTrailsSection/HomeTrailsSection';
import HomeHikesSection from '@/components/HomeHikesSection/HomeHikesSection';
import HomeAccommodationsSection from '@/components/HomeAccommodationsSection/HomeAccommodationsSection';
import { homeTopImages } from '@/utils/utils';

interface HomeProps { }

const Home: React.FC<HomeProps> = () => {
    const t = useTranslations('home');

    return (
        <Layout>
            <main className="home">
                <IntersectionObserverComponent />

                <section className="home__top">
                    <h1>{t('section-top.h1')}</h1>
                    <h2>{t('section-top.h2')}</h2>

                    <figure className="home__top__images">
                        {homeTopImages.map((img) => (
                            <Image
                                key={img} src={img}
                                width={300} height={300}
                                loading="eager" alt="Explore BG home page image"
                                title="Explore BG" priority={true}
                            />
                        ))}
                    </figure>

                    <blockquote>
                        <p>{t('section-top.quote.text')}</p>
                        <span>- {t('section-top.quote.author')}</span>
                    </blockquote>
                </section>

                <section className="home__section-wrapper">
                    <h2 className="hidden">{t('section-2.title')}</h2>
                    <p className="hidden">{t('section-2.text')}</p>
                </section>

                <section className="home__section-buffer"></section>

                <HomeDestinationsSection />

                <HomeTrailsSection />

                <HomeHikesSection />

                <HomeAccommodationsSection />
            </main>
        </Layout>
    );
};

export default Home;
