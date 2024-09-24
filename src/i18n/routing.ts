import { defineRouting } from 'next-intl/routing';
import { createLocalizedPathnamesNavigation } from 'next-intl/navigation';

import { locales, defaultLocale, pathnames, localePrefix } from './config';

export const routing = defineRouting({
    locales: locales,
    defaultLocale,
    localePrefix,
    pathnames,
});

export const { Link, getPathname, redirect, usePathname, useRouter } =
    createLocalizedPathnamesNavigation(routing);