'use client';

import React, { useState } from 'react';
import { useForm } from '@conform-to/react';
import { FaEdit } from 'react-icons/fa';

import CSubmitButton from '../common/CSubmitButton/CSubmitButton';

interface MyProfileInfoFieldProps { }

export const MyProfileInfoField: React.FC<MyProfileInfoFieldProps> = () => {
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
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, inventore reiciendis velit magni eum similique nesciunt, corrupti ipsum vitae error officia ut. Quo harum quam repudiandae quaerat rem, saepe fugit id. Ex nam deleniti sapiente at amet, doloremque rerum corrupti fugit non recusandae accusantium qui pariatur. Quas dicta nisi voluptatum necessitatibus optio quis, iste tempora animi recusandae, temporibus fugiat? Eos sint natus iure error modi fugiat qui ad aperiam quae, commodi ullam debitis sed facilis dolor ipsa ex nisi odio est voluptates corrupti placeat ea quod nesciunt? Enim, quam incidunt quae reprehenderit delectus vel modi perspiciatis saepe ratione deserunt corrupti? &nbsp;
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