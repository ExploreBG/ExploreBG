import { routing } from "./routing";

export const locales = ['bg', 'en'] as const;
export const defaultLocale = 'en';

export const localePrefix = 'always';

export type AppPathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const pathnames = {
    '/': '/',
    '/about': {
        en: '/about',
        bg: '/za-nas'
    },
    '/FAQ': {
        en: '/FAQ',
        bg: '/vuprosi'
    },
    '/destinations': {
        en: '/destinations',
        bg: '/mesta'
    },
    '/destinations/[destinationId]': {
        en: '/destinations/[destinationId]',
        bg: '/mesta/[destinationId]'
    },
    '/trails': {
        en: '/trails',
        bg: '/marshruti'
    },
    '/trails/create': {
        en: '/trails/create',
        bg: '/marshruti/dobavi-marshrut'
    },
    '/trails/[trailId]': {
        en: '/trails/[trailId]',
        bg: '/marshruti/[trailId]'
    },
    '/hikes': {
        en: '/hikes',
        bg: '/prehodi'
    },
    '/hikes/[hikeId]': {
        en: '/hikes/[hikeId]',
        bg: '/prehodi/[hikeId]'
    },
    '/hikes/create': {
        en: '/hikes/create',
        bg: '/prehodi/dobavi-prehod'
    },
    '/accommodations': {
        en: '/accommodations',
        bg: '/mesta-za-nastaniavane'
    },
    '/accommodations/[accommodationId]': {
        en: '/accommodations/[accommodationId]',
        bg: '/mesta-za-nastaniavane/[accommodationId]'
    },
    '/login-register': {
        en: '/login-register',
        bg: '/vhod-registratsia'
    },
    '/users/my-profile': {
        en: '/users/my-profile',
        bg: '/potrebiteli/moia-profil'
    },
    '/users/[userId]': {
        en: '/users/[userId]',
        bg: '/potrebiteli/[userId]'
    },
    '/user/[userId]/favorite': {
        en: '/user/[userId]/favorite',
        bg: '/potrebitel/[userId]/lubimi'
    },
    '/user/[userId]/hikes': {
        en: '/user/[userId]/hikes',
        bg: '/potrebitel/[userId]/prehodi'
    },
    '/admin/users': {
        en: '/admin/users',
        bg: '/admin/potrebiteli'
    },
    '/admin/waiting-approval': {
        en: '/admin/waiting-approval',
        bg: '/admin/chakashti-odobrenie'
    },
    '/admin/trail-review/[trailId]': {
        en: '/admin/trail-review/[trailId]',
        bg: '/admin/marshrut-pregled/[trailId]'
    },
};
