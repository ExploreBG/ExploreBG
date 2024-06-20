'use server';

import { parseWithZod } from '@conform-to/zod';

import { birthDateSchema } from './birthDateSchema';

export async function changeBirthDate(prevState: unknown, formData: FormData) {
    const submission = parseWithZod(formData, {
        schema: birthDateSchema,
    });

    if (submission.status !== 'success') {
        return submission.reply();
    }
}