import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { Link } from '@/navigation';

import './home.scss';
import Layout from '@/components/Layout/Layout';
import IntersectionObserverComponent from '@/components/IntersectionObserverComponent';
import HomeDestinationsSection from '@/components/HomeDestinationsSection/HomeDestinationsSection';
import HomeTrailsSection from '@/components/HomeTrailsSection/HomeTrailsSection';
import HomeHikesSection from '@/components/HomeHikesSection/HomeHikesSection';
import HomeAccommodationsSection from '@/components/HomeAccommodationsSection/HomeAccommodationsSection';
import { homeTopImages } from '@/utils/utils';

interface HomeProps {
    params: { locale: string }
}

const Home: React.FC<HomeProps> = ({ params: { locale } }) => {
    unstable_setRequestLocale(locale);

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
                                loading="eager" alt="Nature image"
                                title="Nature image" priority={true}
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

                <h2 className="home__section-title">{t('section-destinations.title')}</h2>
                <HomeDestinationsSection />
                <aside className="home__section-links">
                    <Link href={'/destinations/all'}>{t('section-destinations.btn-view-all')}</Link>
                </aside>

                <section className="home__section-buffer"></section>

                <h2 className="home__section-title">{t('section-trails.title')}</h2>
                <HomeTrailsSection />
                <aside className="home__section-links">
                    <Link href={'/trails/all'}>{t('section-trails.btn-view-all')}</Link>
                </aside>

                <section className="home__section-buffer"></section>

                <h2 className="home__section-title">{t('section-hikes.title')}</h2>
                <HomeHikesSection />
                <aside className="home__section-links">
                    <Link href={'/hikes/all'}>{t('section-hikes.btn-view-all')}</Link>
                    <Link href={'/hikes/create'}>{t('section-hikes.btn-create')}</Link>
                </aside>

                <section className="home__section-buffer"></section>

                <h2 className="home__section-title">{t('section-accommodations.title')}</h2>
                <HomeAccommodationsSection />
                <aside className="home__section-links">
                    <Link href={'/accommodations/all'}>{t('section-accommodations.btn-view-all')}</Link>
                </aside>

                <section className="home__section-buffer"></section>
            </main>
        </Layout>
    );
};

export default Home;
