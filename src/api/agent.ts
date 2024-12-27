import { RequestInit } from 'next/dist/server/web/spec-extension/request';

import { ICreateTrail } from '@/components/CreateTrailForm/CreateTrailForm';

const baseUrl = process.env.NODE_ENV == 'production' ? `${process.env.API_URL}/api` : 'http://localhost:8080/api';

const request = async (url: string, method: string = 'GET', sessionToken?: string, body?: any, isUpload?: boolean) => {
    const headers: Record<string, string> = {};

    if (body && !isUpload) {
        headers['Content-Type'] = 'application/json';
    }

    if (sessionToken) {
        headers['Authorization'] = `Bearer ${sessionToken}`;
    }

    const options: RequestInit = {
        method,
        cache: 'no-store',
        headers,
    };

    if (body) {
        options.body = isUpload ? body : JSON.stringify(body);
    }

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            console.error('Something went wrong!');
        }

        const contentType = response.headers.get('Content-Type');
        let data;

        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            const text = await response.text();
            console.error('Unexpected response format:', text);
            throw new Error('Expected JSON, but got non-JSON response');
        }

        const token = response.headers.get('Authorization');

        return token ? { data, token } : data;
    } catch (err) {
        console.error('Request failed: ', err);
        throw err;
    }
};

const apiUsers = {
    getUserProfile: (userId: string) => request(`${baseUrl}/users/${userId}`),
    register: (data: Record<string, unknown>) => request(`${baseUrl}/users/register`, 'POST', undefined, data),
    login: (data: Record<string, unknown>) => request(`${baseUrl}/users/login`, 'POST', undefined, data),
    getMyProfile: (token: string) => request(`${baseUrl}/users/my-profile`, 'GET', token),
    getUserPhoto: (token: string) => request(`${baseUrl}/images/user`, 'GET', token),
    updateUserPhoto: (token: string, newData: FormData, isUpload: boolean) => request(`${baseUrl}/images/user`, 'PATCH', token, newData, isUpload),
    updateUsername: (token: string, newUsername: unknown) => request(`${baseUrl}/users/username`, 'PATCH', token, newUsername),
    updateEmail: (token: string, newEmail: unknown) => request(`${baseUrl}/users/email`, 'PATCH', token, newEmail),
    getGenderEnum: () => request(`${baseUrl}/utility/register-enums`),
    updateGender: (token: string, newData: unknown) => request(`${baseUrl}/users/gender`, 'PATCH', token, newData),
    updateBirthDate: (token: string, newData: unknown) => request(`${baseUrl}/users/birthdate`, 'PATCH', token, newData),
    updateUserInfo: (token: string, newData: unknown) => request(`${baseUrl}/users/user-info`, 'PATCH', token, newData),
    changePassword: (token: string, passData: unknown) => request(`${baseUrl}/users/password`, 'PATCH', token, passData)
};

const apiDestinations = {
    get4RandomDestinations: () => request(`${baseUrl}/destinations/random`),
    getAllDestinations: (query: string) => request(`${baseUrl}/destinations${query}`),
    getDestinationById: (destinationId: string) => request(`${baseUrl}/destinations/${destinationId}`)
};

const apiTrails = {
    get4RandomTrails: (token?: string) => request(`${baseUrl}/trails/random`, 'GET', token),
    getAllTrails: (query: string, token?: string) => request(`${baseUrl}/trails${query}`, 'GET', token),
    getTrailById: (trailId: string, token?: string) => request(`${baseUrl}/trails/${trailId}`, 'GET', token),
    getFormEnums: () => request(`${baseUrl}/utility/create/trail-enums`),
    getAvailableAccommodations: (token: string) => request(`${baseUrl}/accommodations/select`, 'GET', token),
    getAvailableDestinations: (token: string) => request(`${baseUrl}/destinations/select`, 'GET', token),
    createTrail: (token: string, trailData: ICreateTrail) => request(`${baseUrl}/trails`, 'POST', token, trailData),
    uploadPhotos: (trailId: number, token: string, photos: FormData, isUpload: boolean) => request(`${baseUrl}/images/entity/${trailId}`, 'PATCH', token, photos, isUpload),
    changeMainPhoto: (trailId: number, token: string, newMainPhotoId: { imageId: number }) => request(`${baseUrl}/trails/${trailId}/main-image`, 'PATCH', token, newMainPhotoId),
    deletePhotos: (trailId: number, token: string, photos: { folder: string, ids: number[] }) => request(`${baseUrl}/images/entity/${trailId}`, 'DELETE', token, photos),
    uploadGpxFile: (trailId: number, token: string, data: FormData, isUpload: boolean) => request(`${baseUrl}/gpx/trail/${trailId}`, 'PATCH', token, data, isUpload),
    removeGpxFile: (trailId: number, token: string) => request(`${baseUrl}/gpx/trail/${trailId}`, 'DELETE', token),
    createTrailComment: (trailId: number, token: string, trailComment: { message: unknown }) => request(`${baseUrl}/trails/${trailId}/comments`, 'POST', token, trailComment),
    updateTrailComment: (commentId: number, token: string, trailComment: { message: unknown }) => request(`${baseUrl}/comments/${commentId}`, 'PUT', token, trailComment),
    removeTrailComment: (trailId: number, commentId: number, token: string) => request(`${baseUrl}/trails/${trailId}/comments/${commentId}`, 'DELETE', token),
    updateStartPoint: (trailId: number, token: string, newData: { startPoint: unknown }) => request(`${baseUrl}/trails/${trailId}/start-point`, 'PATCH', token, newData),
    updateEndPoint: (trailId: number, token: string, newData: { endPoint: unknown }) => request(`${baseUrl}/trails/${trailId}/end-point`, 'PATCH', token, newData),
    updateTotalDistance: (trailId: number, token: string, newData: { totalDistance: unknown }) => request(`${baseUrl}/trails/${trailId}/total-distance`, 'PATCH', token, newData),
    updateElevationGained: (trailId: number, token: string, newData: { elevationGained: unknown }) => request(`${baseUrl}/trails/${trailId}/elevation-gained`, 'PATCH', token, newData),
    updateActivity: (trailId: number, token: string, newData: { activity: unknown }) => request(`${baseUrl}/trails/${trailId}/activity`, 'PATCH', token, newData),
    updateWaterAvailable: (trailId: number, token: string, newData: { waterAvailable: unknown }) => request(`${baseUrl}/trails/${trailId}/water-available`, 'PATCH', token, newData),
    updateTrailDifficulty: (trailId: number, token: string, newData: { trailDifficulty: unknown }) => request(`${baseUrl}/trails/${trailId}/trail-difficulty`, 'PATCH', token, newData),
    updateTrailInfo: (trailId: number, token: string, newData: { trailInfo: unknown }) => request(`${baseUrl}/trails/${trailId}/trail-info`, 'PATCH', token, newData),
    updateAvailableHuts: (trailId: number, token: string, newData: { availableHuts: { id: number }[] }) => request(`${baseUrl}/trails/${trailId}/available-huts`, 'PATCH', token, newData),
    updateDestinations: (trailId: number, token: string, newData: { destinations: { id: number }[] }) => request(`${baseUrl}/trails/${trailId}/destinations`, 'PATCH', token, newData),
    addToOrRemoveFromFavorite: (trailId: number, token: string, body: { like: boolean }) => request(`${baseUrl}/trails/${trailId}/like`, 'PATCH', token, body),
};

const apiHikes = {
    get4RandomHikes: () => request(`${baseUrl}/hikes/random`),
    getAllHikes: (query: string) => request(`${baseUrl}/hikes${query}`),
    getHikeById: (hikeId: string) => request(`${baseUrl}/hikes/${hikeId}`)
};

const apiAccommodations = {
    get4RandomAccommodations: () => request(`${baseUrl}/accommodations/random`),
    getAllAccommodations: (query: string) => request(`${baseUrl}/accommodations${query}`),
    getAccommodationById: (accommodationId: string) => request(`${baseUrl}/accommodations/${accommodationId}`)
};

const apiAdmin = {
    getAllUsers: (query: string, token: string) => request(`${baseUrl}/super-users/users${query}`, 'GET', token),
    updateUserRole: (memberId: number, token: string, body: { moderator: boolean }) => request(`${baseUrl}/super-users/${memberId}/update-role`, 'PATCH', token, body),
    lockAccount: (memberId: number, token: string, body: { lockAccount: boolean }) => request(`${baseUrl}/super-users/${memberId}/lock-account`, 'PATCH', token, body),
    getWaitingApprovalCount: (token: string) => request(`${baseUrl}/super-users/entities/waiting-approval/count`, 'GET', token),
    getWaitingApprovalCollection: (collection: string, query: string, token: string) => request(`${baseUrl}/super-users/${collection}/waiting-approval${query}`, 'GET', token),
    getCreatedTrailDataForReview: (trailId: string, token: string) => request(`${baseUrl}/super-users/trails/${trailId}/review`, 'GET', token),
    claimForReviewTrailDetails: (trailId: number, token: string, body: { review: boolean }) => request(`${baseUrl}/super-users/trails/${trailId}/claim`, 'PATCH', token, body),
    claimForReviewTrailImages: (trailId: number, token: string, body: { review: boolean }) => request(`${baseUrl}/super-users/trails/${trailId}/images/claim`, 'PATCH', token, body),
    claimForReviewTrailGpx: (trailId: number, token: string, body: { review: boolean }) => request(`${baseUrl}/super-users/trails/${trailId}/gpx-file/claim`, 'PATCH', token, body),
    getTrailDetailsReviewer: (trailId: number, token: string) => request(`${baseUrl}/super-users/trails/${trailId}/reviewer`, 'GET', token),
    getTrailImagesReviewer: (imageId: number, token: string) => request(`${baseUrl}/super-users/images/${imageId}/reviewer`, 'GET', token),
    getTrailGpxReviewer: (gpxId: number, token: string) => request(`${baseUrl}/super-users/gpx/${gpxId}/reviewer`, 'GET', token),
    approveTrailDetails: (trailId: number, token: string, trailData: ICreateTrail) => request(`${baseUrl}/super-users/trails/${trailId}/approve`, 'PATCH', token, trailData),
    approveTrailImages: (trailId: number, token: string, body: { imageIds: number[] }) => request(`${baseUrl}/super-users/trails/${trailId}/images/approve`, 'PATCH', token, body),
    approveTrailGpx: (trailId: number, token: string, body: { approved: boolean }) => request(`${baseUrl}/super-users/trails/${trailId}/gpx-file/approve`, 'PATCH', token, body),
};

export const agent = {
    apiUsers,
    apiDestinations,
    apiTrails,
    apiHikes,
    apiAccommodations,
    apiAdmin
};