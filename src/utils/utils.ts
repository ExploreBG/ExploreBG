import { EventEmitter } from 'events';
import imageCompression from 'browser-image-compression';

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

export const formatEntityLastUpdate = (date: string) => {
    const lastUpdateDateMonthYear = formatDate(date.slice(0, 10));
    const lastUpdateTime = date.slice(-5);
    const lastUpdateYear = lastUpdateDateMonthYear.slice(-4);
    const lastUpdateMonth = lastUpdateDateMonthYear.slice(3, 6);
    const lastUpdateDate = lastUpdateDateMonthYear.slice(0, 2);
    const dateNow = new Date(Date.now()).getDate();
    const currentYear = new Date(Date.now()).getFullYear();

    return lastUpdateDate == String(dateNow)
        ? lastUpdateTime
        : lastUpdateYear == String(currentYear)
            ? `${lastUpdateDate} ${lastUpdateMonth} ${lastUpdateTime}`
            : `${lastUpdateDateMonthYear} ${lastUpdateTime}`;
};

export const convertMetersToKmM = (meters: number) => {
    const km = Math.floor(meters / 1000);
    const remainingMeters = Math.floor(meters % 1000);

    return `${km} km ${remainingMeters} m`;
};

export const compressImage = async (file: File) => {
    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
    };

    try {
        const compressedFile = await imageCompression(file, options);

        return compressedFile;
    } catch (err) {
        console.error('Error compressing image: ', err);
    }
};

export const compressImages = async (files: File[]) => {
    const compressedFiles = await Promise.all(files.map(file => compressImage(file)));

    return compressedFiles;
};
