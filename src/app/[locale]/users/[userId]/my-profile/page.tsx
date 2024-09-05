import React from 'react';
import dynamic from 'next/dynamic';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { getSession } from '@/utils/userSession';
import { agent } from '@/api/agent';

import './myProfile.scss';
import AccessDenied from '@/components/AccessDenied/AccessDenied';
import Layout from '@/components/Layout/Layout';
import MyProfilePhotoField from '@/components/MyProfilePhotoField/MyProfilePhotoField';
import MyProfileUsernameField from '@/components/MyProfileUsernameField/MyProfileUsernameField';
import MyProfileEmailField from '@/components/MyProfileEmailField/MyProfileEmailField';
import MyProfileGenderField from '@/components/MyProfileGenderField/MyProfileGenderField';
import MyProfileBirthdayField from '@/components/MyProfileBirthdayField/MyProfileBirthdayField';
import MyProfileInfoField from '@/components/MyProfileInfoField/MyProfileInfoField';
import MyProfileButtons from '@/components/MyProfileButtons/MyProfileButtons';

const UserCreatedHikes = dynamic(() => import('@/components/UserCreatedHikes/UserCreatedHikes'), {
    loading: () => <p>Loading...</p>,
    ssr: false
});

interface MyProfileProps {
    params: { locale: string, userId: string }
}

export async function generateMetadata({
    params: { locale }
}: Omit<MyProfileProps, 'children'>) {
    const t = await getTranslations({ locale, namespace: 'my-profile' });

    return {
        title: t('metadata.tab-name'),
    };
}

const MyProfile: React.FC<MyProfileProps> = async ({ params: { locale, userId } }) => {
    unstable_setRequestLocale(locale);
    const t = await getTranslations('my-profile');

    const session = await getSession();
    const token = session?.token ?? '';

    const res = await agent.apiUsers.getMyProfile(token);

    const { username, email, gender, birthdate, imageUrl, userInfo, createdHikes } = !res.message && res.data;

    return (
        <>
            {res.message && <AccessDenied />}

            {!res.message && (
                <Layout>
                    <main className="my-profile-container">
                        <article>
                            <h1>{t('title')}</h1>

                            <section>
                                <MyProfilePhotoField initialImageUrl={imageUrl} session={session!} />

                                <MyProfileUsernameField initialUsername={username} userId={userId} />
                                <MyProfileEmailField initialEmail={email} userId={userId} />
                                <MyProfileGenderField gender={gender} userId={userId} />
                                <MyProfileBirthdayField birthday={birthdate} userId={userId} />

                                <MyProfileInfoField userInfo={userInfo} userId={userId} />

                                <MyProfileButtons userId={userId} />
                            </section>
                        </article>

                        {createdHikes.length > 0 && (
                            <UserCreatedHikes hikes={createdHikes} />
                        )}
                    </main>
                </Layout>
            )}
        </>
    );
};

export default MyProfile;