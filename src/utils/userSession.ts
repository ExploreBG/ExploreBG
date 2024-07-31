'use server';

import { JWTPayload, SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

import { IUserSession } from '@/interfaces/interfaces';

interface SessionPayload extends JWTPayload {
    userData: IUserSession;
    expires: Date;
}

const key = new TextEncoder().encode(process.env.USER_SESSION_SECRET_KEY);
const expireTime = Date.now() + 3 * 24 * 60 * 60 * 1000;

const encrypt = async (payload: SessionPayload) => {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('3d')
        .sign(key);
};

const decrypt = async (input: string): Promise<SessionPayload> => {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ['HS256']
    });
    return payload as SessionPayload;
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

export const getSession = async (): Promise<IUserSession | null> => {
    const session = cookies().get('user-session')?.value;

    if (!session) {
        return null;
    }

    const res = await decrypt(session);

    return res?.userData;
};

export const clearSession = async () => {
    cookies().set('user-session', '', { expires: new Date(0) });
};