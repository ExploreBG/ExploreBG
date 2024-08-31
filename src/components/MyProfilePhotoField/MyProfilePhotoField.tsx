'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';

import { agent } from '@/api/agent';
import { getSession, setSession } from '@/utils/userSession';
import { eventEmitter } from '@/utils/utils';

import './myProfilePhotoField.scss';

interface MyProfilePhotoFieldProps {
    initialImageUrl: string | null
    userId: string
    username: string
}

const MyProfilePhotoField: React.FC<MyProfilePhotoFieldProps> = ({ initialImageUrl, userId, username }) => {
    const t = useTranslations('my-profile');
    const [userImage, setUserImage] = useState<string | null>(initialImageUrl);

    const changePhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files && e.currentTarget.files[0];

        if (file) {
            const data = { name: username, folder: "Users" }

            const formData = new FormData();

            formData.append('data', JSON.stringify(data));
            formData.append('file', file);

            const session = await getSession();
            const token = session?.token;
            const userRoles = session?.userRoles ?? [];
            const isUpload = true;

            try {
                const res = await agent.apiUsers.updateUserPhoto(token!, formData, isUpload);

                if (res.data.url && token) {
                    setUserImage(res.data.url);
                    eventEmitter.emit('userImageUpdated', res.data.url);

                    await setSession({ token, userId: Number(userId), userRoles, userImage: res.data.url });

                    toast.success(t('successful-update-photo'));
                } else if (res.message) {
                    toast.error(res.message);
                } else if (res.errors) {
                    toast.error(res.errors[0]);
                }
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <form className="image-wrapper">
            <label htmlFor="file-input">
                <Image
                    src={userImage ?? '/images/user-profile-pic.png'}
                    width={200} height={200} alt="User photo"
                    loading="eager"
                    title="User photo" priority={true}
                />
            </label>

            <input onChange={changePhoto} type="file" accept="image/*" name="img" id="file-input" />
        </form>
    );
};

export default MyProfilePhotoField;