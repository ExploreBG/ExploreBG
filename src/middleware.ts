import { NextRequest } from 'next/server';

import createMiddleware from 'next-intl/middleware';
import { pathnames, locales, localePrefix } from './config';

const intlMiddleware = createMiddleware({
    locales,
    defaultLocale: 'bg',
    pathnames,
    localePrefix
});

export function middleware(request: NextRequest) {    
    console.log('Custom middleware is running');

    const res = intlMiddleware(request);

    res.headers.set('x-middleware-check', 'middleware-is-working');
    
    return res;
}

export const config = {
    matcher: [
        // Enable a redirect to a matching locale at the root
        '/',

        // Set a cookie to remember the previous locale for
        // all requests that have a locale prefix
        '/(bg|en)/:path*',

        // Enable redirects that add missing locales
        // (e.g. `/pathnames` -> `/en/pathnames`)
        '/((?!api|_next|.*\\..*).*)'
    ]
};