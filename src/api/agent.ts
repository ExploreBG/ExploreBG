import { RequestInit } from 'next/dist/server/web/spec-extension/request';
import { setSession } from '@/utils/userSession';

const baseUrl = process.env.NODE_ENV == 'production' ? `${process.env.API_URL}/api` : 'http://localhost:8080/api';

const headers = {
    appJSON: { 'Content-Type': 'application/json' },
    multipart: { 'Content-Type': 'multipart/form-data' }
};

const request = async (url: string, method: string = 'GET', headers?: any, sessionToken?: string, body?: any) => {
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

    if (body) {
        options.body = JSON.stringify(body);
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
            setSession({ token, userId });
        }

        return data;
    } catch (err) {
        console.error(err);
    }
};

const apiUsers = {
    register: (data: Record<string, unknown>) => request(`${baseUrl}/users/register`, 'POST', headers.appJSON, undefined, data),
    login: (data: Record<string, unknown>) => request(`${baseUrl}/users/login`, 'POST', headers.appJSON, undefined, data),
    getMyProfile: (userId: string, token: string) => request(`${baseUrl}/users/${userId}/my-profile`, 'GET', {}, token)
};

const apiDestinations = {
    get4RandomDestinations: () => request(`${baseUrl}/destinations/random`),
    getAllDestinations: (query: string) => request(`${baseUrl}/destinations/all${query}`),
    getDestinationById: (destinationId: string) => request(`${baseUrl}/destinations/${destinationId}`)
};

const apiTrails = {
    get4RandomTrails: () => request(`${baseUrl}/trails/random`),
    getAllTrails: (query: string) => request(`${baseUrl}/trails/all${query}`),
    getTrailById: (trailId: string) => request(`${baseUrl}/trails/${trailId}`)
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

export const agent = {
    apiUsers,
    apiDestinations,
    apiTrails,
    apiHikes,
    apiAccommodations
};