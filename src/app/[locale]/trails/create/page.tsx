import React from 'react';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { getSession } from '@/utils/userSession';
import { agent } from '@/api/agent';

import './createTrail.scss';
import CSmallHeader from '@/components/common/CSmallHeader/CSmallHeader';
import CreateTrailForm from '@/components/CreateTrailForm/CreateTrailForm';
import CPhotoInfo from '@/components/common/CPhotoInfo/CPhotoInfo';
import CSmallFooter from '@/components/common/CSmallFooter/CSmallFooter';

interface CreateTrailProps {
    params: { locale: string }
}

export const CreateTrail: React.FC<CreateTrailProps> = async ({ params: { locale } }) => {
    unstable_setRequestLocale(locale);
    const t = await getTranslations('trail-create');

    const session = await getSession();
    // @ts-expect-error
    const token = session?.userData.token;
    // @ts-expect-error
    const userId = session?.userData.userId;

    const formEnums = await agent.apiTrails.getFormEnums();
    const availableAccommodations = await agent.apiTrails.getAvailableAccommodations(token);
    const availableDestinations = await agent.apiTrails.getAvailableDestinations(token);

    return (
        <main className="form-container">
            <CSmallHeader />

            <h1>{t('create-trail')}</h1>

            <CreateTrailForm
                token={token}
                formEnums={formEnums}
                availableAccommodations={availableAccommodations}
                availableDestinations={availableDestinations}
                userId={userId}
            />

            <CPhotoInfo imgInfo={t('photo-info')} />
            <CSmallFooter />
        </main>
    );
};

export default CreateTrail;