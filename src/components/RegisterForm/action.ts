'use server';

import { parseWithZod } from '@conform-to/zod';
import { redirect } from '@/navigation';

import { registerSchema } from './registerSchema';
import { setSession } from '@/utils/userSession';

export async function register(prevState: unknown, formData: FormData) {
    const submission = parseWithZod(formData, {
        schema: registerSchema,
    });

    if (submission.status !== 'success') {
        return submission.reply();
    }

    const user = Object.fromEntries(formData);

    setSession(user);

    redirect({
        pathname: '/users/[userId]/my-profile',
        params: { userId: 8 }
    });
}