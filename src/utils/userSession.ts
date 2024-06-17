'use server';

import { JWTPayload, SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

import { IUserSession } from '@/interfaces/interfaces';

const key = new TextEncoder().encode(process.env.USER_SESSION_SECRET_KEY);
const expireTime = Date.now() + 3 * 24 * 60 * 60 * 1000;

const encrypt = async (payload: JWTPayload) => {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('3d')
        .sign(key);
};

const decrypt = async (input: string) => {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ['HS256']
    });
    return payload;
};

export const setSession = async (userData: IUserSession) => {
    const expires = new Date(expireTime);
    const session = await encrypt({ userData, expires });

    cookies().set('user-session', session, {
        expires,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/'
    });
};

export const getSession = async () => {
    const session = cookies().get('user-session')?.value;

    if (!session) {
        return null;
    }

    return await decrypt(session);
};

export const getUserId = async () => {
    const session = cookies().get('user-session')?.value;

    if (!session) {
        return null;
    }

    const res = await decrypt(session);
    // @ts-ignore
    return res.userData.userId;
};

export const getToken = async () => {
    const session = cookies().get('user-session')?.value;

    if (!session) {
        return null;
    }

    const res = await decrypt(session);
    // @ts-ignore
    return res.userData.token;
};

export const clearSession = async () => {
    cookies().set('user-session', '', { expires: new Date(0) });
};