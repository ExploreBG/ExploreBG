'use client';

import React, { useState } from 'react';
import { useFormState } from 'react-dom';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { useRouter } from '@/navigation';
import { toast } from 'react-toastify';

import { IFormEnums, IHut, IPlace } from '@/interfaces/interfaces';
import { createTrail } from './action';
import { createTrailSchema } from './createTrailSchema';
import { agent } from '@/api/agent';
import { trailPlaceMinLength, trailPlaceMaxLength, trailInfoMaxLength } from '@/utils/validations';

import CCommonModal, { requireAuthChildren } from '../common/CCommonModal/CCommonModal';
import CCustomSelect from '../common/CCustomSelect/CCustomSelect';
import CFormFieldInfo from '../common/CFormFieldInfo/CFormFieldInfo';
import CSubmitButton from '../common/CSubmitButton/CSubmitButton';

const CFormInputSearch = dynamic(() => import('@/components/common/CFormInputSearch/CFormInputSearch'), { ssr: false });

export interface ICreateTrail {
    totalDistance: number | unknown
    trailDifficulty: number
    elevationGained: number | unknown
    activity: string[]
    availableHuts: { id: number }[]
    destinations: { id: number }[]
}

interface CreateTrailFormProps {
    token?: string
    formEnums: IFormEnums
    availableAccommodations: IHut[]
    availableDestinations: IPlace[]
    userId?: number
}

const CreateTrailForm: React.FC<CreateTrailFormProps> = ({
    token, formEnums, availableAccommodations, availableDestinations, userId
}) => {
    const t = useTranslations('trail-create');
    const tPopUp = useTranslations('pop-up');
    const router = useRouter();
    const [seasonVisited, setSeasonVisited] = useState<string>('spring');
    const [activity, setActivity] = useState<string[]>(['hiking']);
    const [waterAvailable, setWaterAvailable] = useState<string>('no-information');
    const [trailDifficulty, setTrailDifficulty] = useState<number>(1);
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
            if (activity.length === 0) {
                return;
            }

            const formData = context.submission?.payload;

            const totalDistance = formData?.totalDistance && Number(formData?.totalDistance);
            const elevationGained = formData?.elevationGained && Number(formData?.elevationGained);

            const data = {
                ...formData,
                totalDistance,
                trailDifficulty,
                elevationGained,
                seasonVisited,
                activity,
                waterAvailable,
                availableHuts,
                destinations
            }

            try {
                const res = await agent.apiTrails.createTrail(userId!, token!, data);

                if (res.data) {
                    toast.success(t('successful-create'));
                    router.push({
                        pathname: '/trails/[trailId]',
                        params: { trailId: res.data.id }
                    });
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

    const translatePopUp = {
        requireAuthMessage: tPopUp('require-auth-message'),
        loginBtn: tPopUp('login-btn')
    };

    const onActivityClick = (choice: string) => {

        if (activity.includes(choice)) {
            setActivity(activity.filter(a => a !== choice));
        } else {
            setActivity([...activity, choice]);
        }
    }

    return (
        <>
            {!token && <CCommonModal>{requireAuthChildren(translatePopUp)}</CCommonModal>}

            <form
                id={form.id}
                onSubmit={form.onSubmit}
                action={action}
                noValidate
                className="form-container__form"
            >
                <div className="form-container__form__pair">
                    <div>
                        <label htmlFor="startPoint">{t('start-point')}</label>
                        <input
                            type="text"
                            key={fields.startPoint.key}
                            name={fields.startPoint.name}
                            placeholder={t('start-point-placeholder')}
                        />
                        {fields.startPoint.errors && (
                            <div className="error-message">
                                {t(fields.startPoint.errors[0], {
                                    minLength: trailPlaceMinLength, maxLength: trailPlaceMaxLength
                                })}
                            </div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="endPoint">{t('end-point')}</label>
                        <input
                            type="text"
                            key={fields.endPoint.key}
                            name={fields.endPoint.name}
                            placeholder={t('end-point-placeholder')}
                        />
                        {fields.endPoint.errors && (
                            <div className="error-message">
                                {t(fields.endPoint.errors[0], {
                                    minLength: trailPlaceMinLength, maxLength: trailPlaceMaxLength
                                })}
                            </div>
                        )}
                    </div>
                </div>

                <div className="form-container__form__pair">
                    <div>
                        <label htmlFor="totalDistance">{t('total-distance')}</label>
                        <input
                            type="text"
                            key={fields.totalDistance.key}
                            name={fields.totalDistance.name}
                            placeholder="17.25"
                        />
                        {fields.totalDistance.errors && (
                            <div className="error-message">{t(fields.totalDistance.errors[0])}</div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="elevationGained">{t('elevation')}</label>
                        <input
                            type="text"
                            key={fields.elevationGained.key}
                            name={fields.elevationGained.name}
                            placeholder="1867"
                        />
                        {fields.elevationGained.errors && (
                            <div className="error-message">{t(fields.elevationGained.errors[0])}</div>
                        )}
                    </div>
                </div>

                <div className="form-container__form__pair">
                    <div>
                        <label htmlFor="seasonVisited">{t('visited-in')}</label>
                        <CCustomSelect
                            options={formEnums.seasonVisited}
                            translateKey='trail-create'
                            onChange={(value) => setSeasonVisited(String(value))}
                        />
                    </div>

                    <div className="form-container__form__pair__checkbox">
                        <p>{t('suitable-for')} :</p>
                        {formEnums && formEnums.activity.map((a) => (
                            typeof a === 'string' && (
                                <div key={a}>
                                    <input
                                        type="checkbox"
                                        value={a}
                                        checked={activity.includes(a)}
                                        onChange={() => onActivityClick(a)}
                                    />
                                    <label onClick={() => onActivityClick(a)}>{t(a)}</label>
                                </div>
                            )
                        ))}
                        {activity.length === 0 && <div className="error-message">{t('err-activity')}</div>}
                    </div>
                </div>

                <div className="form-container__form__pair">
                    <div className="water-available">
                        <label htmlFor="waterAvailable">{t('water-sources')}</label>
                        <CCustomSelect
                            options={formEnums.waterAvailable}
                            translateKey='trail-create'
                            onChange={(value) => setWaterAvailable(String(value))}
                        />
                    </div>

                    <div>
                        <label htmlFor="trailDifficulty">{t('trail-difficulty')}</label>
                        <CCustomSelect
                            options={formEnums.trailDifficulty}
                            translateKey='trail-create'
                            onChange={(value) => setTrailDifficulty(Number(value))}
                        />
                    </div>
                </div>

                <div className="form-container__form__pair">
                    <div className="form-container__form__pair__search">
                        <label htmlFor="availableHuts">{t('lodges-in-the-area')}</label>
                        <CFormInputSearch
                            suggestions={availableAccommodations}
                            onAddSelection={(selectedValue) => setAvailableHuts([...availableHuts, selectedValue])}
                            onRemoveSelection={(id) => setAvailableHuts(availableHuts.filter(h => h.id !== id))}
                            getSuggestionLabel={(suggestion) => suggestion.accommodationName}
                        />
                    </div>

                    <div className="form-container__form__pair__search">
                        <label htmlFor="destinations">{t('destinations-in-the-area')}</label>
                        <CFormInputSearch
                            suggestions={availableDestinations}
                            onAddSelection={(selectedValue) => setDestinations([...destinations, selectedValue])}
                            onRemoveSelection={(id) => setDestinations(destinations.filter(d => d.id !== id))}
                            getSuggestionLabel={(suggestion) => suggestion.destinationName}
                        />
                    </div>
                </div>

                <div className="form-container__form__single">
                    <label htmlFor="nextTo">{t('next-to')}</label>
                    <input
                        type="text"
                        key={fields.nextTo.key}
                        name={fields.nextTo.name}
                        placeholder={t('next-to-placeholder')}
                    />
                    {fields.nextTo.errors && (
                        <div className="error-message">
                            {t(fields.nextTo.errors[0], {
                                minLength: trailPlaceMinLength, maxLength: trailPlaceMaxLength
                            })}
                        </div>
                    )}
                </div>

                <div className="form-container__form__single">
                    <label htmlFor="trailInfo">
                        {t('trail-info')} &nbsp;
                        <CFormFieldInfo infoText={t('trail-info-info')} />
                    </label>
                    <textarea
                        key={fields.trailInfo.key}
                        name={fields.trailInfo.name}
                        // cols={30} rows={10}
                        placeholder="........."
                    />
                    {fields.trailInfo.errors && (
                        <div className="error-message">
                            {t(fields.trailInfo.errors[0], { maxLength: trailInfoMaxLength })}
                        </div>
                    )}
                </div>

                <p style={{ color: 'black' }}>* {t('photos-message')}</p>

                <CSubmitButton buttonName={t('btn-create')} />
            </form>
        </>
    );
};

export default CreateTrailForm;