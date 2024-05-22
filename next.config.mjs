import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'picsum.photos'
            },
            {
                protocol: 'https',
                hostname: 'www.svilengrad.bg'
            },
            {
                protocol: 'https',
                hostname: 'static.pochivka.bg'
            },
            {
                protocol: 'https',
                hostname: 'rila.ws'
            },
            {
                protocol: 'https',
                hostname: 'welcome.bg'
            }
        ]
    }
};

export default withNextIntl(nextConfig);
