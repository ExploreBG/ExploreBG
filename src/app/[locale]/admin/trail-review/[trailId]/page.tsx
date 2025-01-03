import React from 'react';

import { getSession } from '@/utils/userSession';
import { agent } from '@/api/agent';

import '@/app/[locale]/admin/admin.scss';
import AccessDenied from '@/components/AccessDenied/AccessDenied';
import AdminLayout from '@/components/AdminLayout/AdminLayout';
import ApproveTrailDetailsImagesAndGpx from '@/components/ApproveTrailDetailsImagesAndGpx/ApproveTrailDetailsImagesAndGpx';
import CSmallFooter from '@/components/common/CSmallFooter/CSmallFooter';

interface TrailReviewProps {
    params: { trailId: string }
}

const TrailReview: React.FC<TrailReviewProps> = async ({ params: { trailId } }) => {

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
                        <ApproveTrailDetailsImagesAndGpx
                            userSession={userSession}
                            formEnums={formEnums}
                            availableAccommodations={availableAccommodations}
                            availableDestinations={availableDestinations}
                            dataForReview={trailDataForReview.data}
                        />

                        <CSmallFooter />
                    </main>
                </AdminLayout>
            )}
        </>
    );
};

export default TrailReview;