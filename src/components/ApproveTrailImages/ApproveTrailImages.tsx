import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from '@/i18n/routing';
import { toast } from 'react-toastify';

import { IUserSession } from '@/interfaces/interfaces';
import { agent } from '@/api/agent';
import { useApproveTrailCtx } from '@/contexts/ApproveTrailContext';

import ZoomPhoto from '../ZoomPhoto/ZoomPhoto';

interface ApproveTrailImagesProps {
    userSession: IUserSession | null;
}

const ApproveTrailImages: React.FC<ApproveTrailImagesProps> = ({ userSession }) => {
    const [forReview, setForReview] = useState<boolean>(true);
    const [zoomPhoto, setZoomPhoto] = useState<{ imageUrl: string, index: number } | null>(null);
    const [approvedImages, setApprovedImages] = useState<number[]>([]);
    const { ctxDataForReview, setCtxDataForReview } = useApproveTrailCtx();
    const router = useRouter();

    useEffect(() => {
        if (ctxDataForReview?.images.length != undefined) {
            (async () => {
                const res = await agent.apiAdmin.getTrailImagesReviewer(ctxDataForReview?.images[0].id, userSession?.token!);

                if (res.reviewerId && userSession?.userId == res.reviewerId) {
                    setForReview(false);
                } else if (res.message) {
                    toast.error(res.message);
                }
            })();
        }
    }, [ctxDataForReview?.images, userSession?.token, userSession?.userId]);

    const handleReviewClick = async () => {
        const body = { review: forReview };

        const res = ctxDataForReview && await agent.apiAdmin.claimForReviewTrailImages(ctxDataForReview.id, userSession?.token!, body);

        if (res.data) {
            setForReview(!forReview);
        } else if (res.message) {
            toast.error(res.message);
        } else if (res.errors) {
            toast.error(res.errors[0]);
        }
    };

    const handleCheckboxClick = (id: number) => {
        approvedImages.includes(id)
            ? setApprovedImages(approvedImages.filter(p => p != id))
            : setApprovedImages([...approvedImages, id]);
    };

    const handleApproveClick = async () => {
        try {
            const body = { imageIds: approvedImages };

            const res = ctxDataForReview && await agent.apiAdmin.approveTrailImages(ctxDataForReview.id, userSession?.token!, body);

            if (res.trailStatus) {
                setCtxDataForReview(state => {
                    if (state) {
                        const approvedIds = new Set(approvedImages);

                        const updatedImagesStatus = state.images
                            .filter((i) => approvedIds.has(i.id))
                            .map((i) => ({ ...i, imageStatus: 'approved' }));

                        return {
                            ...state,
                            images: updatedImagesStatus
                        };
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
            {ctxDataForReview?.images.some((i) => i.imageStatus != 'approved') && (
                <button onClick={handleReviewClick} className="review-btn">
                    {forReview ? 'review' : 'cancel'}
                </button>
            )}

            {ctxDataForReview?.images.map((p, index) => (
                <div key={p.id}>
                    <input
                        type="checkbox"
                        onChange={() => handleCheckboxClick(p.id)}
                    />

                    <figure style={{ cursor: 'pointer' }}>
                        <Image
                            src={p.imageUrl}
                            onClick={() => setZoomPhoto({ imageUrl: p.imageUrl, index })}
                            width={150} height={150}
                            alt="Trail photo"
                        />
                    </figure>
                </div>
            ))}

            {!forReview && ctxDataForReview?.images.some((i) => i.imageStatus != 'approved') && (
                <button onClick={handleApproveClick}>Approve</button>
            )}

            {zoomPhoto && ctxDataForReview?.images != undefined && (
                <ZoomPhoto
                    photos={ctxDataForReview?.images}
                    zoomPhoto={zoomPhoto}
                    setZoomPhoto={setZoomPhoto}
                />
            )}
        </>
    );
};

export default ApproveTrailImages;