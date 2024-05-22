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