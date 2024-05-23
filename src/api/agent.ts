const baseUrl = process.env.NODE_ENV == 'production' ? `${process.env.API_URL}/api` : 'http://localhost:8080/api';

const request = async (url: string) => {
    try {
        const response = await fetch(url, { cache: 'no-cache' });

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        return response.json();
    } catch (err) {
        console.error(err);
    }
};

const apiDestinations = {
    get4RandomDestinations: () => request(`${baseUrl}/destinations/random`),
    getAllDestinations: (query: string) => request(`${baseUrl}/destinations/all${query}`)
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
    apiDestinations,
    apiTrails,
    apiHikes,
    apiAccommodations
};