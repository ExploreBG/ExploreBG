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

const CreateTrail: React.FC<CreateTrailProps> = async ({ params: { locale } }) => {
    unstable_setRequestLocale(locale);
    const t = await getTranslations('trail-create');

    const session = await getSession();
    const token = session?.token;
    const isAdminOrModerator = (session?.userRoles.includes('ADMIN') || session?.userRoles.includes('MODERATOR')) ?? false;
    const itemForReviewId = session?.itemForReviewId;

    const trailDataForReview = (itemForReviewId && token) && await agent.apiAdmin.getCreatedTrailDataForReview(itemForReviewId, token);
    const formEnums = await agent.apiTrails.getFormEnums();
    const availableAccommodations = token ? await agent.apiTrails.getAvailableAccommodations(token) : [];
    const availableDestinations = token ? await agent.apiTrails.getAvailableDestinations(token) : [];

    return (
        <main className="form-container">
            <CSmallHeader />

            <CreateTrailForm
                userSession={session}
                formEnums={formEnums}
                availableAccommodations={availableAccommodations}
                availableDestinations={availableDestinations}
                isAdminOrModerator={isAdminOrModerator}
                trailDataForReview={trailDataForReview}
            />

            <CPhotoInfo imgInfo={t('photo-info')} />
            <CSmallFooter />
        </main>
    );
};

export default CreateTrail;