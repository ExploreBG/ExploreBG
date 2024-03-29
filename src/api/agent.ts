const baseUrl = 'http://localhost:8080/api';

const request = async (url: string) => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        return response.json();
    } catch (err) {
        console.error(err);
    }
};

const apiHikes = {
    get4RandomHikes: () => request(`${baseUrl}/hikes/random`)
};

export const agent = {
    apiHikes
};