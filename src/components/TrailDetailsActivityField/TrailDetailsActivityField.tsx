'use client';

import React, { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { GiHiking } from 'react-icons/gi';
import { FaBiking, FaEdit } from 'react-icons/fa';
import { TbRun } from 'react-icons/tb';
import { toast } from 'react-toastify';

import { IFormEnums } from '@/interfaces/interfaces';
import { getSession } from '@/utils/userSession';
import { agent } from '@/api/agent';
import useCloseOnEscapeTabAndClickOutside from '@/hooks/useCloseOnEscapeTabAndClickOutside';

interface TrailDetailsActivityFieldProps {
    initialActivity: string[]
    trailId: number
    isTrailOwner: boolean
    formEnums: IFormEnums
}

const activityIconsEnum = {
    'hiking': <GiHiking />,
    'trail-running': <TbRun />,
    'mountain-biking': <FaBiking />
}

const TrailDetailsActivityField: React.FC<TrailDetailsActivityFieldProps> = ({
    initialActivity, trailId, isTrailOwner, formEnums
}) => {
    const t = useTranslations('trail-details');
    const t2 = useTranslations('trail-create');
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [activity, setActivity] = useState<string[]>(initialActivity);
    const [inputData, setInputData] = useState<string[]>(initialActivity);
    const formRef = useRef<HTMLDivElement>(null);

    useCloseOnEscapeTabAndClickOutside(formRef, () => setIsVisible(false));

    const onActivityClick = (choice: string) => {

        if (activity.includes(choice)) {
            setActivity(activity.filter(a => a !== choice));
        } else {
            setActivity([...activity, choice]);
        }
    }

    const onSubmitChanges = async () => {
        setInputData(activity);

        if (JSON.stringify(activity.sort()) === JSON.stringify(inputData.sort())) {
            setIsVisible(false);
            return;
        }

        const session = await getSession();
        const token = session?.token;
        const newData = { activity };

        try {
            const res = await agent.apiTrails.updateActivity(trailId, token!, newData);

            if (res.data) {
                setActivity(res.data.activity);
                toast.success(t('successful-update-activity'));
                setIsVisible(false);
            } else if (res.message) {
                toast.error(res.message);
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="trail__pair__field-wrapper">
            <div
                className="trail__pair__field-wrapper__ul"
                style={{ opacity: (isVisible ? '0' : '1') }}
            >
                {t('suitable-for')}:
                {isTrailOwner && (
                    <FaEdit
                        className="trail-edit-icon"
                        style={{ cursor: (isVisible ? 'none' : 'pointer') }}
                        onClick={() => setIsVisible(!isVisible)}
                    />
                )}
                <ul>
                    {inputData?.length > 0 && (
                        inputData.map((a: string, index: number) => (
                            // @ts-ignore
                            <li key={index}>{activityIconsEnum[a]} &nbsp; {t2(a)}</li>
                        ))
                    )}
                </ul>
            </div>

            <div ref={formRef} className="trail__pair__field-wrapper__form">
                <div
                    className="trail__pair__field-wrapper__form__checkbox"
                    style={{ display: (isVisible ? 'flex' : 'none') }}
                >
                    <p>{t('suitable-for')}:</p>
                    {formEnums.activity && formEnums.activity.map((a) => (
                        typeof a === 'string' && (
                            <div key={a}>
                                <input
                                    type="checkbox"
                                    value={a}
                                    checked={activity.includes(a)}
                                    onChange={() => onActivityClick(a)}
                                />
                                <label onClick={() => onActivityClick(a)}>{t2(a)}</label>
                            </div>
                        )
                    ))}
                    <div className="error-message">{activity.length === 0 && t2('err-activity')}</div>

                    <div className="trail__pair__field-wrapper__form__checkbox__buttons">
                        <button onClick={onSubmitChanges}>{t('change-btn')}</button>
                        <button
                            type='button'
                            onClick={() => setIsVisible(!isVisible)}>{t('cancel-btn')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrailDetailsActivityField;