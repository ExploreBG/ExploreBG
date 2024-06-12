'use client';

import React from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';

import './myProfilePhotoField.scss';
import { useTranslations } from 'next-intl';

interface MyProfilePhotoFieldProps { }

export const MyProfilePhotoField: React.FC<MyProfilePhotoFieldProps> = () => {
    const t = useTranslations('my-profile');

    const changePhoto = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const file = e.currentTarget.files && e.currentTarget.files[0];

        if (file) {
            console.log(file);

            toast.success(t('successful-update-photo'));
        }
    };

    return (
        <form className="image-wrapper">
            <label htmlFor="file-input">
                <Image
                    src={'/images/user-profile-pic.png'}
                    width={200} height={200} alt="User photo"
                    loading="eager"
                    title="User photo" priority={true}
                />
            </label>

            <input onChange={changePhoto} type="file" name="img" id="file-input" />
        </form>
    );
};

export default MyProfilePhotoField;