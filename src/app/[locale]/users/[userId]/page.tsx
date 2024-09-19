import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { FaUserNinja, FaMale, FaFemale } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { LiaBirthdayCakeSolid } from 'react-icons/lia';

import { agent } from '@/api/agent';
// import { formatDate } from '@/utils/utils';

import './profile.scss';
import '@/app/[locale]/users/users.scss';
import NotFound from '@/app/[locale]/not-found';
import Layout from '@/components/Layout/Layout';
import CLoadingSpinner from '@/components/common/CLoadingSpinner/CLoadingSpinner';

const UserCreatedHikes = dynamic(() => import('@/components/UserCreatedHikes/UserCreatedHikes'), {
    loading: () => <CLoadingSpinner />,
    ssr: false
});

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

const UserProfile: React.FC<UserProfileProps> = async ({ params: { locale, userId } }) => {
    unstable_setRequestLocale(locale);
    const t = await getTranslations('user-profile');

    const res = await agent.apiUsers.getUserProfile(userId);

    const {
        username, email, gender, birthdate, userInfo, imageUrl, createdHikes
    } = res.data != undefined && res.data;

    return (
        <>
            {res.message && (
                <NotFound />
            )}

            {res.data && (
                <Layout>
                    <main className="profile-container">
                        <article>
                            {locale === 'en'
                                ? <h1>{res.message ? `${res.message}` : `${username}${t('title')}`}</h1>
                                : <h1>{res.message ? `${res.message}` : `${t('title')} ${username}`}</h1>
                            }

                            <section>
                                <aside>
                                    <p><HiOutlineMail /> <strong>{email}</strong></p>
                                    <p>
                                        {gender == 'Male' && <FaMale /> || gender == 'Female' && <FaFemale />}
                                        {t('gender')}: {gender
                                            ? <strong>{gender}</strong>
                                            : <span>{t('not-available')}</span>
                                        }
                                    </p>

                                    {/* <p>
                                        <LiaBirthdayCakeSolid />
                                        {t('birthday')}: {birthdate
                                            ? <strong>{formatDate(birthdate)}</strong>
                                            : <span>{t('not-available')}</span>
                                        }
                                    </p> */}

                                    <p>{userInfo}</p>
                                </aside>

                                <figure>
                                    <Image
                                        src={imageUrl ?? '/images/user-profile-pic.png'}
                                        width={300} height={300}
                                        alt={imageUrl ? `${username}'s photo` : 'Default user image'}
                                        loading="eager"
                                        title={imageUrl ? `${username}'s photo` : 'Default user image'}
                                        priority={true}
                                    />
                                    {username && <><FaUserNinja />&nbsp;<figcaption>{username}</figcaption></>}
                                </figure>
                            </section>
                        </article>

                        {createdHikes?.length > 0 && (
                            <section className="user-profile-section">
                                <hr />

                                <h2>{t('created-hikes')}</h2>

                                <UserCreatedHikes hikes={createdHikes} />
                            </section>
                        )}
                    </main>
                </Layout>
            )}
        </>
    );
};

export default UserProfile;