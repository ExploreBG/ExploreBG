import { EventEmitter } from 'events';
import { MONTH_NAMES } from "./constants";

export const eventEmitter = new EventEmitter();

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

export const formatFullDate = (input: string) => {
    const date = new Date(input);

    const year = date.getFullYear();
    const monthIndex = date.getMonth();
    const month = MONTH_NAMES[monthIndex];
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `
        ${day} ${month} ${year} --
        ${hours.toString().padStart(2, '0')}:
        ${minutes.toString().padStart(2, '0')}:
        ${seconds.toString().padStart(2, '0')}
    `
};