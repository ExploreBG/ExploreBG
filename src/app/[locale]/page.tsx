import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { Link } from '@/navigation';

import './home.scss';
import Layout from '@/components/Layout/Layout';
import IntersectionObserverComponent from '@/components/IntersectionObserverComponent';
import HomeSection from '@/components/homeSection/HomeSection';
import HomeHikesSection from '@/components/HomeHikesSection/HomeHikesSection';
import { dummyCardData, homeTopImages } from '@/utils/utils';

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

                <HomeSection
                    title={t('section-destination.title')}
                    name='destinations'
                    data={dummyCardData}
                />

                <section className="home__section-buffer"></section>

                <HomeSection
                    title='Trails section title'
                    name='trails'
                    data={dummyCardData}
                    linkCreate='trail'
                />

                <section className="home__section-buffer"></section>

                <h2 className="home__section-title">{t('section-hikes.title')}</h2>
                <HomeHikesSection />
                <aside className="home__section-links">
                    <Link href={'/hikes/all'}>{t('buttons.view-all')}</Link>
                    <Link href={'/hikes/create'}>{t('buttons.create')}</Link>
                </aside>

                <section className="home__section-buffer"></section>
            </main>
        </Layout>
    );
};

export default Home;
