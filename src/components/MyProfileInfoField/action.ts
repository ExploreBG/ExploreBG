'use server';

import { parseWithZod } from '@conform-to/zod';

import { infoSchema } from './infoSchema';

export async function changeUserInfo(prevState: unknown, formData: FormData) {
    const submission = parseWithZod(formData, {
        schema: infoSchema,
    });

    if (submission.status !== 'success') {
        return submission.reply();
    }
}