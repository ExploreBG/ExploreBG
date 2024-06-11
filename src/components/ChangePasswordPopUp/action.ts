'use server';

import { parseWithZod } from '@conform-to/zod';

import { changePasswordSchema } from './changePasswordSchema';

export async function changePassword(prevState: unknown, formData: FormData) {
    const submission = parseWithZod(formData, {
        schema: changePasswordSchema,
    });

    if (submission.status !== 'success') {
        return submission.reply();
    }
}