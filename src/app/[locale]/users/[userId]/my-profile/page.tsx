import React from 'react';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { redirect } from '@/navigation';

import { getSession } from '@/utils/userSession';
import { agent } from '@/api/agent';

import './myProfile.scss';
import Layout from '@/components/Layout/Layout';
import MyProfilePhotoField from '@/components/MyProfilePhotoField/MyProfilePhotoField';
import MyProfileUsernameField from '@/components/MyProfileUsernameField/MyProfileUsernameField';
import MyProfileEmailField from '@/components/MyProfileEmailField/MyProfileEmailField';
import MyProfileGenderField from '@/components/MyProfileGenderField/MyProfileGenderField';
import MyProfileBirthdayField from '@/components/MyProfileBirthdayField/MyProfileBirthdayField';
import MyProfileInfoField from '@/components/MyProfileInfoField/MyProfileInfoField';
import MyProfileButtons from '@/components/MyProfileButtons/MyProfileButtons';

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

export const MyProfile: React.FC<MyProfileProps> = async ({ params: { locale, userId } }) => {
    unstable_setRequestLocale(locale);
    const t = await getTranslations('my-profile');

    const session = await getSession();
    // @ts-expect-error
    const sessionToken = session?.userData?.token;

    const res = await agent.apiUsers.getMyProfile(userId, sessionToken);

    if (res.message) {
        redirect('/');
    }

    const { username, email, gender, birthday, imageUrl, userInfo, createdHikes } = res;

    return (
        <Layout>
            <main className="my-profile-container">
                <article>
                    <h1>{t('title')}</h1>

                    <section>
                        <MyProfilePhotoField imageUrl={imageUrl} />

                        <MyProfileUsernameField username={username} />
                        <MyProfileEmailField email={email} />
                        <MyProfileGenderField gender={gender} translate={t('gender')} />
                        <MyProfileBirthdayField birthday={birthday} translate={t('birthday')} />

                        <MyProfileInfoField userInfo={userInfo} />

                        <MyProfileButtons />
                    </section>
                </article>
            </main>
        </Layout>
    );
};

export default MyProfile;