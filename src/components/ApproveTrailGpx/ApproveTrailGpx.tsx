import React, { useState, useEffect } from 'react';
import { useRouter } from '@/i18n/routing';
import { toast } from 'react-toastify';

import { IUserSession, ITrackInfo } from '@/interfaces/interfaces';
import { agent } from '@/api/agent';
import { useApproveTrailCtx } from '@/contexts/ApproveTrailContext';

import Map from '../Map/Map';

interface ApproveTrailGpxProps {
    userSession: IUserSession | null;
}

const ApproveTrailGpx: React.FC<ApproveTrailGpxProps> = ({ userSession }) => {
    const [forReview, setForReview] = useState<boolean>(true);
    const [, setTrackInfo] = useState<ITrackInfo | null>(null);
    const { ctxDataForReview, setCtxDataForReview } = useApproveTrailCtx();
    const router = useRouter();

    useEffect(() => {
        if (ctxDataForReview?.gpxFile != null) {
            (async () => {
                const res = await agent.apiAdmin.getTrailGpxReviewer(ctxDataForReview?.gpxFile?.id!, userSession?.token!);

                if (res.reviewerId && userSession?.userId == res.reviewerId) {
                    setForReview(false);
                } else if (res.message) {
                    toast.error(res.message);
                }
            })();
        }
    }, [ctxDataForReview?.gpxFile, userSession?.token, userSession?.userId]);

    const handleReviewClick = async () => {
        const body = { review: forReview };

        const res = ctxDataForReview && await agent.apiAdmin.claimForReviewTrailGpx(ctxDataForReview.id, userSession?.token!, body);

        if (res.data) {
            setForReview(!forReview);
        } else if (res.message) {
            toast.error(res.message);
        } else if (res.errors) {
            toast.error(res.errors[0]);
        }
    };

    const handleApproveClick = async () => {
        try {
            const body = { approved: true };

            const res = ctxDataForReview && await agent.apiAdmin.approveTrailGpx(ctxDataForReview.id, userSession?.token!, body);

            if (res.trailStatus) {
                setCtxDataForReview(state => {
                    if (state) {
                        return { ...state, gpxFile: { ...state.gpxFile!, gpxStatus: 'approved' } };
                    }
                });
                toast.success('successful approve');

                if (res.trailStatus == 'approved') {
                    router.push('/admin/waiting-approval');
                }
            } else if (res.message) {
                toast.error(res.message);
            } else if (res.errors) {
                toast.error(res.errors[0]);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            {ctxDataForReview?.gpxFile?.gpxStatus != 'approved' && (
                <button onClick={handleReviewClick} className="review-btn">
                    {forReview ? 'review' : 'cancel'}
                </button>
            )}

            <Map gpxUrl={ctxDataForReview?.gpxFile?.gpxUrl} setTrackInfo={setTrackInfo} />

            {!forReview && (ctxDataForReview?.gpxFile?.gpxStatus != 'approved') && (
                <button onClick={handleApproveClick}>Approve</button>
            )}
        </>
    );
};

export default ApproveTrailGpx;