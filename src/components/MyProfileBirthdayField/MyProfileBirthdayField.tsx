'use client';

import React, { useState } from 'react';
import { useForm } from '@conform-to/react';
import { LiaBirthdayCakeSolid } from 'react-icons/lia';
import { FaEdit } from 'react-icons/fa';

import CSubmitButton from '../common/CSubmitButton/CSubmitButton';

interface MyProfileBirthdayFieldProps {
    birthday: string | null
    translate: string
}

export const MyProfileBirthdayField: React.FC<MyProfileBirthdayFieldProps> = ({ birthday, translate }) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [form, fields] = useForm({
        onSubmit(e) {
            e.preventDefault();

            console.log(e.currentTarget.birthday.value);

            setIsVisible(!isVisible);
        }
    });

    return (
        <div>
            <p style={{ display: (isVisible ? 'none' : 'block') }}>
                <LiaBirthdayCakeSolid /> {translate}: <strong>{birthday ?? '.....'}</strong> &nbsp;
                <FaEdit className="edit" onClick={() => setIsVisible(!isVisible)} />
            </p>

            <form
                id={form.id}
                onSubmit={form.onSubmit}
                // action={action}
                noValidate
                style={{ display: (isVisible ? 'flex' : 'none') }}
            >
                <input
                    type="date"
                    key={fields.birthday.key}
                    name={fields.birthday.name}
                    // defaultValue={fields.birthday.initialValue}
                    className='birthday-field'
                />

                <CSubmitButton buttonName='Change' />
                <button type='button' onClick={() => setIsVisible(!isVisible)}>Cancel</button>
            </form>
        </div>
    );
};

export default MyProfileBirthdayField;