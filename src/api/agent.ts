const baseUrl = 'http://localhost:8080/api';

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

export const agent = {
    apiTrails,
    apiHikes
};