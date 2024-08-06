'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from '@conform-to/react';
import { FaEdit, FaMale, FaFemale } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { agent } from '@/api/agent';
import { getSession } from '@/utils/userSession';
import useCloseOnEscapeTabAndClickOutside from '@/hooks/useCloseOnEscapeTabAndClickOutside';

import CSubmitButton from '../common/CSubmitButton/CSubmitButton';

interface MyProfileGenderFieldProps {
    gender: string | null
    userId: string
}

const MyProfileGenderField: React.FC<MyProfileGenderFieldProps> = ({ gender, userId }) => {
    const t = useTranslations('my-profile');
    const [genderFields, setGenderFields] = useState<string[]>([]);
    const [genderValue, setGenderValue] = useState<string | null>(gender);
    const [tempGenderValue, setTempGenderValue] = useState<string | null>(gender);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [form, fields] = useForm({
        async onSubmit(e) {
            e.preventDefault();

            if (tempGenderValue == genderValue) {
                setIsVisible(false);
                return;
            }

            const newData = { gender: e.currentTarget.gender.value }

            const session = await getSession();
            const token = session?.token;

            try {
                const res = await agent.apiUsers.updateGender(userId, token!, newData);

                if (res.data) {
                    setGenderValue(res.data.gender);
                    setTempGenderValue(res.data.gender);
                    toast.success(t('successful-update-gender'));
                    setIsVisible(!isVisible);
                } else if (res.message) {
                    toast.error(res.message);
                } else if (res.errors) {
                    toast.error(t(res.errors[0]));
                }
            } catch (err) {
                console.error(err);
            }
        }
    });

    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        const getGenderFields = async () => {
            const res = await agent.apiUsers.getGenderEnum();

            setGenderFields(res.gender);
        }
        getGenderFields();
    }, []);

    useCloseOnEscapeTabAndClickOutside(formRef, () => setIsVisible(false));

    return (
        <div>
            <p style={{ opacity: (isVisible ? '0' : '1') }}>
                {genderValue == 'Male' && <FaMale /> || genderValue == 'Female' && <FaFemale />}
                {t('gender')}:&nbsp; <strong>{genderValue ?? '.....'}</strong>
                <FaEdit className="edit" onClick={() => setIsVisible(!isVisible)} />
            </p>

            <form
                id={form.id}
                onSubmit={form.onSubmit}
                noValidate
                ref={formRef}
                style={{ display: (isVisible ? 'flex' : 'none') }}
            >
                <select
                    key={fields.gender.key}
                    name={fields.gender.name}
                    value={tempGenderValue || ''}
                    onChange={(e) => setTempGenderValue(e.target.value)}
                    className='gender-field'
                >
                    {genderFields.map(f => (
                        <option key={f} value={f} >{f}</option>
                    ))}
                </select>

                <CSubmitButton buttonName={t('change-btn')} />
                <button type='button' onClick={() => setIsVisible(!isVisible)}>{t('cancel-btn')}</button>
            </form>
        </div>
    );
};

export default MyProfileGenderField;