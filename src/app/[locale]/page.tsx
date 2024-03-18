'use client';

import React from 'react';
import Image from 'next/image';

import './home.scss';
import IntersectionObserverComponent from '@/components/IntersectionObserverComponent';
import HomeSection from '@/components/homeSection/HomeSection';
import { dummyCardData, homeTopImages } from '@/utils/utils';

interface HomeProps { }

const Home: React.FC<HomeProps> = () => {
    return (
        <main className="home">
            <section className="home__top">
                <h1>Looking for adventures or just want to visit a new place</h1>
                <h3>ExploreBG is the perfect choice</h3>

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
                    <p>If we were meant to stay in one place, we&apos;d have roots instead of feet.</p>
                    <span>- Rachel Wolchin</span>
                </blockquote>
            </section>

            <section className="home__section-wrapper">
                <h2 className="hidden">The Devil&apos;s bridge</h2>
                <p className="hidden">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur minima natus delectus temporibus, voluptatibus eveniet ut minus alias cumque soluta adipisci repudiandae at, vel quos quod impedit repellendus praesentium voluptatum.</p>
            </section>

            <section className="home__section-buffer"></section>

            <HomeSection
                title='Discover unforgettable destinations'
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
