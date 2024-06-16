'use client';

import React, { useState } from 'react';
import { useForm } from '@conform-to/react';
import { FaEdit } from 'react-icons/fa';

import CSubmitButton from '../common/CSubmitButton/CSubmitButton';

interface MyProfileInfoFieldProps {
    userInfo: string | null
}

export const MyProfileInfoField: React.FC<MyProfileInfoFieldProps> = ({ userInfo }) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [form, fields] = useForm({
        onSubmit(e) {
            e.preventDefault();

            console.log(e.currentTarget.info.value);

            setIsVisible(!isVisible);
        }
    });

    return (
        <div>
            <p
                style={{ display: (isVisible ? 'none' : 'block') }}
                className="info-text"
            >
                {userInfo ?? <><span>My info: </span><strong>.........</strong></>} &nbsp;
                <FaEdit className="edit" onClick={() => setIsVisible(!isVisible)} />
            </p>

            <form
                id={form.id}
                onSubmit={form.onSubmit}
                // action={action}
                noValidate
                style={{ display: (isVisible ? 'flex' : 'none') }}
                className="form-info"
            >
                <textarea
                    key={fields.info.key}
                    name={fields.info.name}
                    // defaultValue={fields.info.initialValue}
                    // cols={30} rows={10}
                    className='info-field'
                    placeholder=' ........'
                ></textarea>

                <div>
                    <CSubmitButton buttonName='Change' />
                    <button type='button' onClick={() => setIsVisible(!isVisible)}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default MyProfileInfoField;