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
    const formEnums = await agent.apiTrails.getFormEnums();

    return (
        <main className="form-container">
            <CSmallHeader />

            <h1>Create trail</h1>

            <CreateTrailForm session={Boolean(session)} formEnums={formEnums} />

            <CPhotoInfo imgInfo={t('photo-info')} />
            <CSmallFooter />
        </main>
    );
};

export default CreateTrail;