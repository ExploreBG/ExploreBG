import React from 'react';
import Image from 'next/image';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { FaUserNinja, FaMale } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { LiaBirthdayCakeSolid } from 'react-icons/lia';

import './profile.scss';
import Layout from '@/components/Layout/Layout';

interface UserProfileProps {
    params: { locale: string, userId: string }
}

export async function generateMetadata({
    params: { locale }
}: Omit<UserProfileProps, 'children'>) {
    const t = await getTranslations({ locale, namespace: 'user-profile' });

    return {
        title: t('metadata.tab-name'),
    };
}

export const UserProfile: React.FC<UserProfileProps> = async ({ params: { locale, userId } }) => {
    unstable_setRequestLocale(locale);
    const t = await getTranslations('user-profile');

    return (
        <Layout>
            <main className="profile-container">
                <article>
                    {locale === 'en'
                        ? <h1>Username{t('title')}</h1>
                        : <h1>{t('title')} Username</h1>
                    }

                    <section>
                        <aside>
                            <p><HiOutlineMail /> <strong>user-email@gmail.com</strong></p>
                            <p><FaMale /> {t('gender')}: <strong>male</strong></p>
                            {/* <FaFemale /> */}
                            <p><LiaBirthdayCakeSolid /> {t('birthday')}: <strong>03 feb 1990</strong></p>

                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, inventore reiciendis velit magni eum similique nesciunt, corrupti ipsum vitae error officia ut. Quo harum quam repudiandae quaerat rem, saepe fugit id. Ex nam deleniti sapiente at amet, doloremque rerum corrupti fugit non recusandae accusantium qui pariatur. Quas dicta nisi voluptatum necessitatibus optio quis, iste tempora animi recusandae, temporibus fugiat? Eos sint natus iure error modi fugiat qui ad aperiam quae, commodi ullam debitis sed facilis dolor ipsa ex nisi odio est voluptates corrupti placeat ea quod nesciunt? Enim, quam incidunt quae reprehenderit delectus vel modi perspiciatis saepe ratione deserunt corrupti?</p>
                        </aside>

                        <figure>
                            <Image
                                src={'/images/user-profile-pic.png'}
                                width={300} height={300} alt="User photo"
                                loading="eager"
                                title="User photo" priority={true}
                            />
                            <FaUserNinja />&nbsp;<figcaption>Username</figcaption>
                        </figure>
                    </section>
                </article>
            </main>
        </Layout>
    );
};

export default UserProfile;