import React from 'react';
import { unstable_setRequestLocale } from 'next-intl/server';

import { getSession } from '@/utils/userSession';
import { agent } from '@/api/agent';

import '@/app/[locale]/admin/admin.scss';
import AccessDenied from '@/components/AccessDenied/AccessDenied';
import AdminLayout from '@/components/AdminLayout/AdminLayout';
import CreateTrailForm from '@/components/CreateTrailForm/CreateTrailForm';
import CSmallFooter from '@/components/common/CSmallFooter/CSmallFooter';

interface TrailReviewProps {
    params: { locale: string, trailId: string }
}

const TrailReview: React.FC<TrailReviewProps> = async ({ params: { locale, trailId } }) => {
    unstable_setRequestLocale(locale);

    const userSession = await getSession();
    const isAdminOrModerator = userSession?.isAdminOrModerator;
    const token = userSession?.token;

    const trailDataForReview = token && await agent.apiAdmin.getCreatedTrailDataForReview(trailId, token);
    const formEnums = await agent.apiTrails.getFormEnums();
    const availableAccommodations = token ? await agent.apiTrails.getAvailableAccommodations(token) : [];
    const availableDestinations = token ? await agent.apiTrails.getAvailableDestinations(token) : [];

    return (
        <>
            {!isAdminOrModerator && <AccessDenied token={token} />}

            {isAdminOrModerator && (
                <AdminLayout>
                    <main className="admin-forms form-container">
                        <CreateTrailForm
                            userSession={userSession}
                            formEnums={formEnums}
                            availableAccommodations={availableAccommodations}
                            availableDestinations={availableDestinations}
                            dataForReview={trailDataForReview.data}
                            errMessage={trailDataForReview.message}
                        />

                        <CSmallFooter />
                    </main>
                </AdminLayout>
            )}
        </>
    );
};

export default TrailReview;