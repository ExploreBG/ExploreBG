import { Pathnames } from 'next-intl/navigation';

export const locales = ['bg', 'en'] as const;

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
    '/destinations/all': {
        en: '/destinations/all',
        bg: '/mesta/vsichki'
    },
    '/destinations/[destinationId]': {
        en: '/destinations/[destinationId]',
        bg: '/mesta/[destinationId]'
    },
    '/trails/all': {
        en: '/trails/all',
        bg: '/marshruti/vsichki'
    },
    '/trails/create': {
        en: '/trails/create',
        bg: '/marshruti/dobavi-marshrut'
    },
    '/trails/[trailId]': {
        en: '/trails/[trailId]',
        bg: '/marshruti/[trailId]'
    },
    '/hikes/all': {
        en: '/hikes/all',
        bg: '/prehodi/vsichki'
    },
    '/hikes/[hikeId]': {
        en: '/hikes/[hikeId]',
        bg: '/prehodi/[hikeId]'
    },
    '/hikes/create': {
        en: '/hikes/create',
        bg: '/prehodi/dobavi-prehod'
    },
    '/accommodations/all': {
        en: '/accommodations/all',
        bg: '/mesta-za-nastaniavane/vsichki'
    },
    '/accommodations/[accommodationId]': {
        en: '/accommodations/[accommodationId]',
        bg: '/mesta-za-nastaniavane/[accommodationId]'
    },
    '/login-register': {
        en: '/login-register',
        bg: '/vhod-registratsia'
    },
    '/users/[userId]/my-profile': {
        en: '/users/[userId]/my-profile',
        bg: '/potrebiteli/[userId]/moia-profil'
    },
    '/users/[userId]/profile': {
        en: '/users/[userId]/profile',
        bg: '/potrebiteli/[userId]/profil'
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
} satisfies Pathnames<typeof locales>;

// Use the default: `always`
export const localePrefix = undefined;

export type AppPathnames = keyof typeof pathnames;