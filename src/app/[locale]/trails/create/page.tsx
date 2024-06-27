import React from 'react';
import { unstable_setRequestLocale } from 'next-intl/server';

import { getSession } from '@/utils/userSession';

import './createTrail.scss';
import CreateTrailForm from '@/components/CreateTrailForm/CreateTrailForm';

interface CreateTrailProps {
    params: { locale: string }
}

export const CreateTrail: React.FC<CreateTrailProps> = async ({ params: { locale } }) => {
    unstable_setRequestLocale(locale);

    const session = await getSession();

    return (
        <main className="form-container">
            <h1>Create trail</h1>

            <CreateTrailForm />
        </main>
    );
};

export default CreateTrail;