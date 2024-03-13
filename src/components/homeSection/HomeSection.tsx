import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { ICard } from '@/interfaces/interfaces';

interface HomeSectionProps {
    title: string
    name: string
    data: ICard[]
    linkCreate?: string
}

const HomeSection: React.FC<HomeSectionProps> = ({ title, name, data, linkCreate }) => {
    return (
        <>
            <h2 className="home__section-title">{title}</h2>
            <section className={`home__section-wrapper home__section-cards ${name}`}>
                {data.map((card) => (
                    <article key={card.id} className="card hidden">
                        <figure>
                            <Image
                                src={card.image}
                                width={200} height={200}
                                loading="lazy" alt={`${card.title} - photo`}
                                title={card.title} priority={false}
                            />
                        </figure>
                        <h3>{card.title}</h3>
                        <p>{card.description}</p>
                        <Link href="">Learn more</Link>
                    </article>
                ))}
            </section>
            <aside className="home__section-links">
                <Link href={''}>View all {name}</Link>
                {linkCreate && <Link href={''}>Create {linkCreate}</Link>}
            </aside>
        </>
    );
};

export default HomeSection;