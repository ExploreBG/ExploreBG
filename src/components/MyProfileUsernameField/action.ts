'use server';

import { parseWithZod } from '@conform-to/zod';

import { usernameSchema } from './usernameSchema';

export async function changeUsername(prevState: unknown, formData: FormData) {
    const submission = parseWithZod(formData, {
        schema: usernameSchema,
    });

    if (submission.status !== 'success') {
        return submission.reply();
    }
}