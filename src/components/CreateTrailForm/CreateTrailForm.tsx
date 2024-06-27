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

import CSubmitButton from '../common/CSubmitButton/CSubmitButton';

const CFormInputSearch = dynamic(() => import('@/components/common/CFormInputSearch/CFormInputSearch'), { ssr: false });

interface CreateTrailFormProps { }

export const CreateTrailForm: React.FC<CreateTrailFormProps> = () => {
    // const t = useTranslations('create-trail');
    const router = useRouter();
    const [activity, setActivity] = useState<string[]>([]);
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

            console.log(formData);
        }
    });

    const onActivityClick = (e: React.FormEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value);
    }

    const suggestions = ['Vazov', 'Kumata', 'Kamen del', 'Blue arrow', 'Red hat'];

    return (
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
                        <option value="Spring">Spring</option>
                        <option value="Summer">Summer</option>
                        <option value="Autumn">Autumn</option>
                        <option value="Winter">Winter</option>
                    </select>
                    {/* <div className="error-message">{fields.seasonVisited.errors && t(fields.seasonVisited.errors[0])}</div> */}
                </div>

                <div className="form-container__form__pair__checkbox">
                    <p>Suitable for</p>
                    <div>
                        <label>Trail running</label>
                        <input type="checkbox" value="Trail running" onClick={onActivityClick} />
                    </div>
                    <div>
                        <label>Mountain biking</label>
                        <input type="checkbox" value="Mountain biking" onClick={onActivityClick} />
                    </div>
                    <div>
                        <label>Hiking</label>
                        <input type="checkbox" value="Hiking" onClick={onActivityClick} />
                    </div>
                </div>
            </div>

            <div className="form-container__form__pair">
                <div>
                    <label htmlFor="waterAvailable">Water sources</label>
                    <select
                        key={fields.waterAvailable.key}
                        name={fields.waterAvailable.name}
                    >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                        <option value="know">Don't know</option>
                    </select>
                    {/* <div className="error-message">{fields.waterAvailable.errors && t(fields.waterAvailable.errors[0])}</div> */}
                </div>

                <div>
                    <label htmlFor="trailDifficulty">Trail difficulty ( from 1 to 6 )</label>
                    <select
                        key={fields.trailDifficulty.key}
                        name={fields.trailDifficulty.name}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                    {/* <div className="error-message">{fields.trailDifficulty.errors && t(fields.trailDifficulty.errors[0])}</div> */}
                </div>
            </div>

            <div className="form-container__form__pair">
                <div className="form-container__form__pair__search">
                    <label htmlFor="availableHuts">Lodges in the area</label>
                    <CFormInputSearch
                        suggestions={suggestions}
                        key={fields.availableHuts.key}
                        name={fields.availableHuts.name}
                    />
                    {/* <div className="error-message">{fields.availableHuts.errors && t(fields.availableHuts.errors[0])}</div> */}
                </div>

                <div className="form-container__form__pair__search">
                    <label htmlFor="destinations">Destinations in the area</label>
                    <CFormInputSearch
                        suggestions={suggestions}
                        key={fields.destinations.key}
                        name={fields.destinations.name}
                    />
                    {/* <div className="error-message">{fields.destinations.errors && t(fields.destinations.errors[0])}</div> */}
                </div>
            </div>

            <div className="form-container__form__pair">
                <div>
                    <label htmlFor="nextTo">Next to</label>
                    <input
                        type="text"
                        key={fields.nextTo.key}
                        name={fields.nextTo.name}
                    />
                    {/* <div className="error-message">{fields.nextTo.errors && t(fields.nextTo.errors[0])}</div> */}
                </div>

                <div>
                    <label htmlFor="imageUrl">Image</label>
                    <input
                        type="file"
                        key={fields.imageUrl.key}
                        name={fields.imageUrl.name}
                    />
                    {/* <div className="error-message">{fields.imageUrl.errors && t(fields.imageUrl.errors[0])}</div> */}
                </div>
            </div>

            <label htmlFor="trailInfo">Trail info</label>
            <textarea
                key={fields.trailInfo.key}
                name={fields.trailInfo.name}
                cols={30} rows={10}
                placeholder="........."
            />
            {/* <div className="error-message">{fields.trailInfo.errors && t(fields.trailInfo.errors[0])}</div> */}

            <CSubmitButton buttonName='Create' />
        </form>
    );
};

export default CreateTrailForm;