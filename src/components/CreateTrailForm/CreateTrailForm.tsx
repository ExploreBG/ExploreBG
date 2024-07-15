'use client';

import React, { useState } from 'react';
import { useFormState } from 'react-dom';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { useRouter } from '@/navigation';
import { toast } from 'react-toastify';

import { createTrail } from './action';
import { createTrailSchema } from './createTrailSchema';

import CCommonModal, { requireAuthChildren } from '../common/CCommonModal/CCommonModal';
import CSubmitButton from '../common/CSubmitButton/CSubmitButton';

const CFormInputSearch = dynamic(() => import('@/components/common/CFormInputSearch/CFormInputSearch'), { ssr: false });

interface CreateTrailFormProps {
    session: boolean
    formEnums: { [key: string]: string[] | number[] }
    availableAccommodations: { id: number, accommodationName: string }[]
    availableDestinations: { id: number, destinationName: string }[]
}

export const CreateTrailForm: React.FC<CreateTrailFormProps> = ({
    session, formEnums, availableAccommodations, availableDestinations
}) => {
    // const t = useTranslations('create-trail');
    const tPopUp = useTranslations('pop-up');
    const router = useRouter();
    const [activity, setActivity] = useState<string[]>([]);
    const [availableHuts, setAvailableHuts] = useState<{ id: number }[]>([]);
    const [destinations, setDestinations] = useState<{ id: number }[]>([]);
    const [lastResult, action] = useFormState(createTrail, undefined);
    const [form, fields] = useForm({
        lastResult,
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',

        onValidate({ formData }) {
            return parseWithZod(formData, { schema: createTrailSchema });
        },

        async onSubmit(event, context) {
            const formData = context.submission?.payload;

            const totalDistance = Number(formData?.totalDistance);
            const trailDifficulty = Number(formData?.trailDifficulty);
            const elevationGained = Number(formData?.elevationGained);

            const data = {
                ...formData,
                totalDistance,
                trailDifficulty,
                elevationGained,
                activity,
                availableHuts,
                destinations
            }

            console.log(data);
        }
    });

    const translatePopUp = {
        requireAuthMessage: tPopUp('require-auth-message'),
        loginBtn: tPopUp('login-btn')
    };

    const onActivityClick = (e: React.FormEvent<HTMLInputElement>) => {
        const current = e.currentTarget.value;

        if (activity.includes(current)) {
            setActivity(activity.filter(a => a !== current));
        } else {
            setActivity([...activity, current]);
        }
    }

    return (
        <>
            {!session && <CCommonModal children={requireAuthChildren(translatePopUp)} />}

            <form
                id={form.id}
                onSubmit={form.onSubmit}
                action={action}
                noValidate
                className="form-container__form"
            >
                <div className="form-container__form__pair">
                    <div>
                        <label htmlFor="startPoint">Start point</label>
                        <input
                            type="text"
                            key={fields.startPoint.key}
                            name={fields.startPoint.name}
                            placeholder="Karlovo"
                        />
                        {/* <div className="error-message">{fields.startPoint.errors && t(fields.startPoint.errors[0])}</div> */}
                    </div>

                    <div>
                        <label htmlFor="endPoint">End point</label>
                        <input
                            type="text"
                            key={fields.endPoint.key}
                            name={fields.endPoint.name}
                            placeholder="Botev peak"
                        />
                        {/* <div className="error-message">{fields.endPoint.errors && t(fields.endPoint.errors[0])}</div> */}
                    </div>
                </div>

                <div className="form-container__form__pair">
                    <div>
                        <label htmlFor="totalDistance">Total distance in km</label>
                        <input
                            type="text"
                            key={fields.totalDistance.key}
                            name={fields.totalDistance.name}
                            placeholder="17.25"
                        />
                        {/* <div className="error-message">{fields.totalDistance.errors && t(fields.totalDistance.errors[0])}</div> */}
                    </div>

                    <div>
                        <label htmlFor="elevationGained">Elevation in metres</label>
                        <input
                            type="text"
                            key={fields.elevationGained.key}
                            name={fields.elevationGained.name}
                            placeholder="1867"
                        />
                        {/* <div className="error-message">{fields.elevationGained.errors && t(fields.elevationGained.errors[0])}</div> */}
                    </div>
                </div>

                <div className="form-container__form__pair">
                    <div>
                        <label htmlFor="seasonVisited">Visited in ( season )</label>
                        <select
                            key={fields.seasonVisited.key}
                            name={fields.seasonVisited.name}
                        >
                            {formEnums && formEnums.seasonVisited.map(s => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                        {/* <div className="error-message">{fields.seasonVisited.errors && t(fields.seasonVisited.errors[0])}</div> */}
                    </div>

                    <div className="form-container__form__pair__checkbox">
                        <p>Suitable for</p>
                        {formEnums && formEnums.activity.map(a => (
                            <div key={a}>
                                <label>{a}</label>
                                <input type="checkbox" value={a} onClick={onActivityClick} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="form-container__form__pair">
                    <div>
                        <label htmlFor="waterAvailable">Water sources</label>
                        <select
                            key={fields.waterAvailable.key}
                            name={fields.waterAvailable.name}
                        >
                            {formEnums && formEnums.waterAvailable.map(v => (
                                <option key={v} value={v}>{v}</option>
                            ))}
                        </select>
                        {/* <div className="error-message">{fields.waterAvailable.errors && t(fields.waterAvailable.errors[0])}</div> */}
                    </div>

                    <div>
                        <label htmlFor="trailDifficulty">Trail difficulty ( from 1 to 6 )</label>
                        <select
                            key={fields.trailDifficulty.key}
                            name={fields.trailDifficulty.name}
                        >
                            {formEnums && formEnums.trailDifficulty.map(v => (
                                <option key={v} value={v}>{v}</option>
                            ))}
                        </select>
                        {/* <div className="error-message">{fields.trailDifficulty.errors && t(fields.trailDifficulty.errors[0])}</div> */}
                    </div>
                </div>

                <div className="form-container__form__pair">
                    <div className="form-container__form__pair__search">
                        <label htmlFor="availableHuts">Lodges in the area</label>
                        <CFormInputSearch
                            suggestions={availableAccommodations}
                            key={fields.availableHuts.key}
                            name={fields.availableHuts.name}
                            onAddSelection={(selectedValue) => setAvailableHuts([...availableHuts, selectedValue])}
                            onRemoveSelection={(id) => setAvailableHuts(availableHuts.filter(h => h.id !== id))}
                            getSuggestionLabel={(suggestion) => suggestion.accommodationName}
                        />
                        {/* <div className="error-message">{fields.availableHuts.errors && t(fields.availableHuts.errors[0])}</div> */}
                    </div>

                    <div className="form-container__form__pair__search">
                        <label htmlFor="destinations">Destinations in the area</label>
                        <CFormInputSearch
                            suggestions={availableDestinations}
                            key={fields.destinations.key}
                            name={fields.destinations.name}
                            onAddSelection={(selectedValue) => setDestinations([...destinations, selectedValue])}
                            onRemoveSelection={(id) => setDestinations(destinations.filter(d => d.id !== id))}
                            getSuggestionLabel={(suggestion) => suggestion.destinationName}
                        />
                        {/* <div className="error-message">{fields.destinations.errors && t(fields.destinations.errors[0])}</div> */}
                    </div>
                </div>

                <label htmlFor="nextTo">Next to</label>
                <input
                    type="text"
                    key={fields.nextTo.key}
                    name={fields.nextTo.name}
                />
                {/* <div className="error-message">{fields.nextTo.errors && t(fields.nextTo.errors[0])}</div> */}

                <label htmlFor="trailInfo">Trail info</label>
                <textarea
                    key={fields.trailInfo.key}
                    name={fields.trailInfo.name}
                    // cols={30} rows={10}
                    placeholder="........."
                />
                {/* <div className="error-message">{fields.trailInfo.errors && t(fields.trailInfo.errors[0])}</div> */}

                <CSubmitButton buttonName='Create' />
            </form>
        </>
    );
};

export default CreateTrailForm;