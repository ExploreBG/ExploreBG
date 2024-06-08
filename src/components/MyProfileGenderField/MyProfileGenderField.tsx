'use client';

import React, { useState } from 'react';
import { useForm } from '@conform-to/react';
import { FaEdit, FaMale } from 'react-icons/fa';

import CSubmitButton from '../common/CSubmitButton/CSubmitButton';

interface MyProfileGenderFieldProps {
    translate: string
}

export const MyProfileGenderField: React.FC<MyProfileGenderFieldProps> = ({ translate }) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [form, fields] = useForm({
        onSubmit(e) {
            e.preventDefault();

            console.log(e.currentTarget.gender.value);

            setIsVisible(!isVisible);
        }
    });

    return (
        <div>
            <p style={{ display: (isVisible ? 'none' : 'block') }}>
                <FaMale /> {translate}: <strong>male</strong> &nbsp;
                <FaEdit className="edit" onClick={() => setIsVisible(!isVisible)} />
            </p>
            {/* <FaFemale /> */}

            <form
                id={form.id}
                onSubmit={form.onSubmit}
                // action={action}
                noValidate
                style={{ display: (isVisible ? 'flex' : 'none') }}
            >
                <select
                    key={fields.gender.key}
                    name={fields.gender.name}
                    // defaultValue={fields.gender.initialValue}
                    className='gender-field'
                >
                    <option> </option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                </select>

                <CSubmitButton buttonName='Change' />
                <button type='button' onClick={() => setIsVisible(!isVisible)}>Cancel</button>
            </form>
        </div>
    );
};

export default MyProfileGenderField;