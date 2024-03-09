import { Anek_Latin, Raleway } from 'next/font/google';

export const mainFont = Anek_Latin({
    subsets: ['latin'],
    variable: '--font-main',
    display: 'swap'
});

export const headingFont = Raleway({
    subsets: ['latin'],
    variable: '--font-heading',
    display: 'swap'
});