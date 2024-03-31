export const dummyCardData = [
    {
        id: '1',
        image: '/images/2.avif',
        title: 'Hiking',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum tenetur, ipsa laboriosam porro vitae magnam consectetur earum tempora neque quaerat!'
    },
    {
        id: '2',
        image: '/images/3.avif',
        title: 'Some title',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum tenetur, ipsa laboriosam porro vitae magnam consectetur earum tempora neque quaerat!'
    },
    {
        id: '3',
        image: '/images/4.avif',
        title: 'Other title',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum tenetur, ipsa laboriosam porro vitae magnam consectetur earum tempora neque quaerat!'
    },
    {
        id: '4',
        image: '/images/5.avif',
        title: 'Title',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum tenetur, ipsa laboriosam porro vitae magnam consectetur earum tempora neque quaerat!'
    }
];


export const homeTopImages = [
    '/images/5.avif',
    '/images/2.avif',
    '/images/3.avif',
    '/images/6.avif',
    '/images/1.avif',
    '/images/4.avif'
];

export const formatDate = (inputDate: string) => {
    const [year, monthNumber, day] = inputDate.split('-');
    const date = new Date();
    date.setMonth(Number(monthNumber) - 1);
    const month = date.toDateString().split(' ')[1];

    return `${day} ${month} ${year}`;
};