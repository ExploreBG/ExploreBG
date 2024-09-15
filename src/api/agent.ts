import { RequestInit } from 'next/dist/server/web/spec-extension/request';
import { decodeJwt } from 'jose';

import { setSession, getSession } from '@/utils/userSession';

import { ICreateTrail } from '@/components/CreateTrailForm/CreateTrailForm';

interface IDecodedToken { exp: number; iat: number; iss: string; roles: string[] }

const baseUrl = process.env.NODE_ENV == 'production' ? `${process.env.API_URL}/api` : 'http://localhost:8080/api';

const request = async (url: string, method: string = 'GET', sessionToken?: string, body?: any, isUpload?: boolean) => {
    const options: RequestInit = {
        method,
        cache: 'no-cache'
    };

    if (body && !isUpload) {
        options.headers = {
            'Content-Type': 'application/json'
        }
    }

    if (sessionToken && !isUpload) {
        options.headers = {
            ...options.headers,
            'Authorization': `Bearer ${sessionToken}`
        };
    } else if (sessionToken || isUpload) {
        options.headers = {
            'Authorization': `Bearer ${sessionToken}`
        };
    }

    if (body && !isUpload) {
        options.body = JSON.stringify(body);
    } else if (body && isUpload) {
        options.body = body;
    }

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            console.error('Something went wrong!');
        }

        const data = await response.json();

        const token = response.headers.get('Authorization');
        const userId = data.id;

        if (token && userId) {
            const decodedToken = decodeJwt<IDecodedToken>(token);
            const userRoles = decodedToken.roles;

            setSession({ token, userId, userRoles });
        } else if (token) {
            const session = await getSession();
            const userId = session?.userId;
            const decodedToken = decodeJwt<IDecodedToken>(token);
            const userRoles = decodedToken.roles;

            userId && setSession({ token, userId, userRoles });
        }

        return data;
    } catch (err) {
        console.error(err);
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
    get4RandomTrails: () => request(`${baseUrl}/trails/random`),
    getAllTrails: (query: string) => request(`${baseUrl}/trails${query}`),
    getTrailById: (trailId: string) => request(`${baseUrl}/trails/${trailId}`),
    getTrailByIdFromAuthUser: (trailId: string, token: string) => request(`${baseUrl}/trails/${trailId}/auth`, 'GET', token),
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
    getWaitingApprovalCount: (token: string) => request(`${baseUrl}/super-users/waiting-approval/count`, 'GET', token),
    getWaitingApprovalCollection: (collection: string, query: string, token: string) => request(`${baseUrl}/super-users/waiting-approval/${collection}${query}`, 'GET', token),
    getCreatedTrailDataForReview: (trailId: string, token: string) => request(`${baseUrl}/super-users/review/trail/${trailId}`, 'GET', token),
    claimForReviewCreatedTrail: (trailId: number, token: string, body: { review: boolean }) => request(`${baseUrl}/super-users/review/trail/${trailId}/claim`, 'PATCH', token, body),
    getReviewer: (trailId: number, token: string) => request(`${baseUrl}/trails/${trailId}/reviewer`, 'GET', token),
    approveTrail: (trailId: number, token: string, trailData: ICreateTrail) => request(`${baseUrl}/super-users/approve/trail/${trailId}`, 'PATCH', token, trailData),
};

export const agent = {
    apiUsers,
    apiDestinations,
    apiTrails,
    apiHikes,
    apiAccommodations,
    apiAdmin
};