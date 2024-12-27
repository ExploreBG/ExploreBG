import React from 'react';
import { getTranslations } from 'next-intl/server';

import { getSession } from '@/utils/userSession';
import { agent } from '@/api/agent';

import './createTrail.scss';
import CSmallHeader from '@/components/common/CSmallHeader/CSmallHeader';
import CreateTrailClient from '@/components/CreateTrailClient/CreateTrailClient';
import CPhotoInfo from '@/components/common/CPhotoInfo/CPhotoInfo';
import CSmallFooter from '@/components/common/CSmallFooter/CSmallFooter';

interface CreateTrailProps {
    params: { locale: string }
}

const CreateTrail: React.FC<CreateTrailProps> = async () => {
    const t = await getTranslations('trail-create');

    const session = await getSession();
    const token = session?.token;

    const formEnums = await agent.apiTrails.getFormEnums();
    const availableAccommodations = token ? await agent.apiTrails.getAvailableAccommodations(token) : [];
    const availableDestinations = token ? await agent.apiTrails.getAvailableDestinations(token) : [];

    return (
        <main className="form-container trail-form">
            <CSmallHeader />

            <h1>{t('create-trail')}</h1>

            {formEnums && (
                <CreateTrailClient
                    userSession={session}
                    formEnums={formEnums}
                    availableAccommodations={availableAccommodations}
                    availableDestinations={availableDestinations}
                />
            )}

            <CPhotoInfo imgInfo={t('photo-info')} />
            <CSmallFooter />
        </main>
    );
};

export default CreateTrail;