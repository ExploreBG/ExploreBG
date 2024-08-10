import { RequestInit } from 'next/dist/server/web/spec-extension/request';
import { decodeJwt } from 'jose';

import { setSession, getSession } from '@/utils/userSession';

import { ICreateTrail } from '@/components/CreateTrailForm/CreateTrailForm';

interface IHeader { [key: string]: string }
interface IDecodedToken { exp: number; iat: number; iss: string; roles: string[] }

const baseUrl = process.env.NODE_ENV == 'production' ? `${process.env.API_URL}/api` : 'http://localhost:8080/api';

const headers = {
    appJSON: { 'Content-Type': 'application/json' },
    multipart: { 'Content-Type': 'multipart/form-data' }
};

const request = async (url: string, method: string = 'GET', headers?: IHeader, sessionToken?: string, body?: any, isUpload?: boolean) => {
    const options: RequestInit = {
        method,
        headers,
        cache: 'no-cache'
    };

    if (sessionToken) {
        options.headers = {
            ...options.headers,
            'Authorization': `Bearer ${sessionToken}`
        };
    }

    if (body && !isUpload) {
        options.body = JSON.stringify(body);
    } else if (body && isUpload) {
        options.body = body
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
    getUserProfile: (userId: string) => request(`${baseUrl}/users/${userId}/profile`),
    register: (data: Record<string, unknown>) => request(`${baseUrl}/users/register`, 'POST', headers.appJSON, undefined, data),
    login: (data: Record<string, unknown>) => request(`${baseUrl}/users/login`, 'POST', headers.appJSON, undefined, data),
    getMyProfile: (userId: string, token: string) => request(`${baseUrl}/users/${userId}/my-profile`, 'GET', {}, token),
    updateUserPhoto: (userId: string, token: string, newData: FormData, isUpload: boolean) => request(`${baseUrl}/images/upload/${userId}`, 'POST', {}, token, newData, isUpload),
    updateUsername: (userId: string, token: string, newUsername: unknown) => request(`${baseUrl}/users/${userId}/update-username`, 'PATCH', headers.appJSON, token, newUsername),
    updateEmail: (userId: string, token: string, newEmail: unknown) => request(`${baseUrl}/users/${userId}/update-email`, 'PATCH', headers.appJSON, token, newEmail),
    getGenderEnum: () => request(`${baseUrl}/utility/register-enums`),
    updateGender: (userId: string, token: string, newData: unknown) => request(`${baseUrl}/users/${userId}/update-gender`, 'PATCH', headers.appJSON, token, newData),
    updateBirthDate: (userId: string, token: string, newData: unknown) => request(`${baseUrl}/users/${userId}/update-birthdate`, 'PATCH', headers.appJSON, token, newData),
    updateUserInfo: (userId: string, token: string, newData: unknown) => request(`${baseUrl}/users/${userId}/update-user-info`, 'PATCH', headers.appJSON, token, newData),
    changePassword: (userId: string, token: string, passData: unknown) => request(`${baseUrl}/users/${userId}/update-password`, 'PATCH', headers.appJSON, token, passData)
};

const apiDestinations = {
    get4RandomDestinations: () => request(`${baseUrl}/destinations/random`),
    getAllDestinations: (query: string) => request(`${baseUrl}/destinations/all${query}`),
    getDestinationById: (destinationId: string) => request(`${baseUrl}/destinations/${destinationId}`)
};

const apiTrails = {
    get4RandomTrails: () => request(`${baseUrl}/trails/random`),
    getAllTrails: (query: string) => request(`${baseUrl}/trails/all${query}`),
    getTrailById: (trailId: string) => request(`${baseUrl}/trails/${trailId}`),
    getFormEnums: () => request(`${baseUrl}/utility/create/trail-enums`),
    getAvailableAccommodations: (token: string) => request(`${baseUrl}/accommodations/select`, 'GET', {}, token),
    getAvailableDestinations: (token: string) => request(`${baseUrl}/destinations/select`, 'GET', {}, token),
    createTrail: (userId: number, token: string, trailData: ICreateTrail) => request(`${baseUrl}/trails/create/${userId}`, 'POST', headers.appJSON, token, trailData),
    createTrailComment: (userId: number, trailId: number, token: string, trailComment: { message: unknown }) => request(`${baseUrl}/trails/create/${userId}/comment/${trailId}`, 'POST', headers.appJSON, token, trailComment),
    updateTrailComment: (commentId: number, token: string, trailComment: { message: unknown }) => request(`${baseUrl}/comments/update/${commentId}`, 'PUT', headers.appJSON, token, trailComment),
    removeTrailComment: (commentId: number, trailId: number, token: string) => request(`${baseUrl}/trails/delete/${commentId}/comment/${trailId}`, 'DELETE', headers.appJSON, token),
    updateStartPoint: (trailId: number, token: string, newData: { startPoint: unknown }) => request(`${baseUrl}/trails/${trailId}/update-start-point`, 'PATCH', headers.appJSON, token, newData),
    updateEndPoint: (trailId: number, token: string, newData: { endPoint: unknown }) => request(`${baseUrl}/trails/${trailId}/update-end-point`, 'PATCH', headers.appJSON, token, newData),
    updateTotalDistance: (trailId: number, token: string, newData: { totalDistance: unknown }) => request(`${baseUrl}/trails/${trailId}/update-total-distance`, 'PATCH', headers.appJSON, token, newData),
    updateElevationGained: (trailId: number, token: string, newData: { elevationGained: unknown }) => request(`${baseUrl}/trails/${trailId}/update-elevation-gained`, 'PATCH', headers.appJSON, token, newData),
    updateActivity: (trailId: number, token: string, newData: { activity: unknown }) => request(`${baseUrl}/trails/${trailId}/update-activity`, 'PATCH', headers.appJSON, token, newData),
    updateWaterAvailable: (trailId: number, token: string, newData: { waterAvailable: unknown }) => request(`${baseUrl}/trails/${trailId}/update-water-available`, 'PATCH', headers.appJSON, token, newData),
    updateTrailDifficulty: (trailId: number, token: string, newData: { trailDifficulty: unknown }) => request(`${baseUrl}/trails/${trailId}/update-trail-difficulty`, 'PATCH', headers.appJSON, token, newData),
    updateTrailInfo: (trailId: number, token: string, newData: { trailInfo: unknown }) => request(`${baseUrl}/trails/${trailId}/update-trail-info`, 'PATCH', headers.appJSON, token, newData),
    updateAvailableHuts: (trailId: number, token: string, newData: { availableHuts: { id: number }[] }) => request(`${baseUrl}/trails/${trailId}/update-available-huts`, 'PATCH', headers.appJSON, token, newData),
    updateDestinations: (trailId: number, token: string, newData: { destinations: { id: number }[] }) => request(`${baseUrl}/trails/${trailId}/update-destinations`, 'PATCH', headers.appJSON, token, newData),
};

const apiHikes = {
    get4RandomHikes: () => request(`${baseUrl}/hikes/random`),
    getAllHikes: (query: string) => request(`${baseUrl}/hikes/all${query}`),
    getHikeById: (hikeId: string) => request(`${baseUrl}/hikes/${hikeId}`)
};

const apiAccommodations = {
    get4RandomAccommodations: () => request(`${baseUrl}/accommodations/random`),
    getAllAccommodations: (query: string) => request(`${baseUrl}/accommodations/all${query}`),
    getAccommodationById: (accommodationId: string) => request(`${baseUrl}/accommodations/${accommodationId}`)
};

const apiAdmin = {
    getAllUsers: (query: string, token: string) => request(`${baseUrl}/super-users/users${query}`, 'GET', {}, token),
    updateUserRole: (memberId: number, token: string, body: { moderator: boolean }) => request(`${baseUrl}/super-users/${memberId}/update-role`, 'PATCH', headers.appJSON, token, body),
    getWaitingApprovalCount: (token: string) => request(`${baseUrl}/super-users/waiting-approval/count`, 'GET', {}, token),
    getWaitingApprovalCollection: (collection: string, query: string, token: string) => request(`${baseUrl}/super-users/waiting-approval/${collection}${query}`, 'GET', {}, token),
    getCreatedTrailDataForReview: (trailId: string, token: string) => request(`${baseUrl}/super-users/review/trail/${trailId}`, 'GET', {}, token),
    claimForReviewCreatedTrail: (trailId: number, token: string, body: { review: boolean }) => request(`${baseUrl}/super-users/review/trail/${trailId}/claim`, 'PATCH', headers.appJSON, token, body),
};

export const agent = {
    apiUsers,
    apiDestinations,
    apiTrails,
    apiHikes,
    apiAccommodations,
    apiAdmin
};