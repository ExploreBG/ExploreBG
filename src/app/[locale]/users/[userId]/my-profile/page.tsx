import React from 'react';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { HiOutlineMail } from 'react-icons/hi';

import './myProfile.scss';
import Layout from '@/components/Layout/Layout';
import MyProfilePhotoField from '@/components/MyProfilePhotoField/MyProfilePhotoField';
import MyProfileUsernameField from '@/components/MyProfileUsernameField/MyProfileUsernameField';
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

    return (
        <Layout>
            <main className="my-profile-container">
                <article>
                    <h1>{t('title')}</h1>

                    <section>
                        <MyProfilePhotoField />

                        <MyProfileUsernameField />
                        <div><HiOutlineMail /> <strong>user-email@gmail.com</strong></div>
                        <MyProfileGenderField translate={t('gender')} />
                        <MyProfileBirthdayField translate={t('birthday')} />

                        <MyProfileInfoField />

                        <MyProfileButtons />
                    </section>
                </article>
            </main>
        </Layout>
    );
};

export default MyProfile;