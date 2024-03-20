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
    '/destination': {
        en: '/destination',
        bg: '/mesta'
    },
    '/trails': {
        en: '/trails',
        bg: '/marshruti'
    },
    '/hikes': {
        en: '/hikes',
        bg: '/prehodi'
    },
    '/accommodation': {
        en: '/accommodation',
        bg: '/mesta-za-nastaniavane'
    },
    '/user/[userId]': {
        en: '/user/[userId]',
        bg: '/potrebitel/[userId]'
    },
    '/user/[userId]/favorite': {
        en: '/user/[userId]/favorite',
        bg: '/potrebitel/[userId]/lubimi'
    },
    '/user/[userId]/hikes': {
        en: '/user/[userId]/hikes',
        bg: '/potrebitel/[userId]/prehodi'
    }
} satisfies Pathnames<typeof locales>;

// Use the default: `always`
export const localePrefix = undefined;

export type AppPathnames = keyof typeof pathnames;