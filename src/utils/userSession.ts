'use server';

import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

const key = new TextEncoder().encode(process.env.USER_SESSION_SECRET_KEY);
const expireTime = Date.now() + 3 * 24 * 60 * 60 * 1000;

const encrypt = async (payload: any) => {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('3 days from now')
        .sign(key);
};

export const setSession = async (userData: any) => {
    const expires = new Date(expireTime);
    const session = await encrypt({ userData, expires });

    cookies().set('user-session', session, {
        expires,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    });
};
