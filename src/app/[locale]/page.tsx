import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

import './home.scss';
import IntersectionObserverComponent from '@/components/IntersectionObserverComponent';
import HomeSection from '@/components/homeSection/HomeSection';
import { dummyCardData, homeTopImages } from '@/utils/utils';

interface HomeProps {
    params: { locale: string }
}

const Home: React.FC<HomeProps> = ({ params: { locale }}) => {
    unstable_setRequestLocale(locale);

    const t = useTranslations('home');

    return (
        <main className="home">
            <section className="home__top">
                <h1>{t('section-top.h1')}</h1>
                <h2>{t('section-top.h2')}</h2>

                <figure className="home__top__images">
                    {homeTopImages.map((img) => (
                        <Image
                            key={img} src={img}
                            width={200} height={300}
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

            <HomeSection
                title='Hikes section title'
                name='hikes'
                data={dummyCardData}
                linkCreate='hike'
            />

            <section className="home__section-buffer"></section>

            <IntersectionObserverComponent />
        </main>
    );
};

export default Home;
