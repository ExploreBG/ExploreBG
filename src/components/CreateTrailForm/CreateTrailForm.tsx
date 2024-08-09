'use client';

import React, { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { useRouter } from '@/navigation';
import { toast } from 'react-toastify';

import { IFormEnums, IHut, IPlace, ITrail, IUserSession } from '@/interfaces/interfaces';
import { createTrail } from './action';
import { createTrailSchema } from './createTrailSchema';
import { agent } from '@/api/agent';
import { setSession } from '@/utils/userSession';
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
    userSession: IUserSession | null
    formEnums: IFormEnums
    availableAccommodations: IHut[]
    availableDestinations: IPlace[]
    isAdminOrModerator: boolean
    trailDataForReview: ITrail
}

const CreateTrailForm: React.FC<CreateTrailFormProps> = ({
    userSession,
    formEnums,
    availableAccommodations,
    availableDestinations,
    isAdminOrModerator,
    trailDataForReview,
}) => {
    const t = useTranslations('trail-create');
    const tPopUp = useTranslations('pop-up');
    const router = useRouter();
    const [dataForReview] = useState<ITrail>(trailDataForReview);
    const [forReview, setForReview] = useState<boolean>(true);
    const [seasonVisited, setSeasonVisited] = useState<string>('spring');
    const [activity, setActivity] = useState<string[]>(dataForReview?.activity ?? ['hiking']);
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
                if (isAdminOrModerator && dataForReview) {
                    console.log('adm or modr');
                } else {
                    const res = await agent.apiTrails.createTrail(userSession?.userId!, userSession?.token!, data);

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
                }
            } catch (err) {
                console.error(err);
            }
        }
    });

    useEffect(() => {
        if (userSession) {
            (async () => {
                await setSession({ ...userSession, itemForReviewId: undefined });
            })();
        }
    }, []);

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
    };

    const handleReviewClick = async () => {
        const request = { review: forReview };

        console.log(request);

        setForReview(!forReview);
    };

    return (
        <>
            {!userSession && <CCommonModal>{requireAuthChildren(translatePopUp)}</CCommonModal>}

            <h1>{!dataForReview
                ? t('create-trail')
                : <button onClick={handleReviewClick}>{forReview ? 'review' : 'cancel'}</button>}
            </h1>

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
                            defaultValue={dataForReview?.startPoint}
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
                            defaultValue={dataForReview?.endPoint}
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
                            defaultValue={dataForReview?.totalDistance}
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
                            defaultValue={dataForReview?.elevationGained}
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
                            initialValue={dataForReview?.seasonVisited ?? undefined}
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
                            initialValue={dataForReview?.waterAvailable ?? undefined}
                        />
                    </div>

                    <div>
                        <label htmlFor="trailDifficulty">{t('trail-difficulty')}</label>
                        <CCustomSelect
                            options={formEnums.trailDifficulty}
                            translateKey='trail-create'
                            onChange={(value) => setTrailDifficulty(Number(value))}
                            initialValue={dataForReview?.trailDifficulty ?? undefined}
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
                            initialValues={dataForReview?.availableHuts}
                        />
                    </div>

                    <div className="form-container__form__pair__search">
                        <label htmlFor="destinations">{t('destinations-in-the-area')}</label>
                        <CFormInputSearch
                            suggestions={availableDestinations}
                            onAddSelection={(selectedValue) => setDestinations([...destinations, selectedValue])}
                            onRemoveSelection={(id) => setDestinations(destinations.filter(d => d.id !== id))}
                            getSuggestionLabel={(suggestion) => suggestion.destinationName}
                            initialValues={dataForReview?.destinations}
                        />
                    </div>
                </div>

                <div className="form-container__form__single">
                    <label htmlFor="nextTo">{t('next-to')}</label>
                    <input
                        type="text"
                        key={fields.nextTo.key}
                        name={fields.nextTo.name}
                        defaultValue={dataForReview?.nextTo}
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
                        defaultValue={dataForReview?.trailInfo}
                        // cols={30} rows={10}
                        placeholder="........."
                    />
                    {fields.trailInfo.errors && (
                        <div className="error-message">
                            {t(fields.trailInfo.errors[0], { maxLength: trailInfoMaxLength })}
                        </div>
                    )}
                </div>

                {!isAdminOrModerator && <p style={{ color: 'black' }}>* {t('photos-message')}</p>}

                {(!isAdminOrModerator || (isAdminOrModerator && !forReview) || (isAdminOrModerator && !dataForReview)) && (
                    <CSubmitButton buttonName={(isAdminOrModerator && !forReview) ? 'Approve' : t('btn-create')} />
                )}
            </form>
        </>
    );
};

export default CreateTrailForm;