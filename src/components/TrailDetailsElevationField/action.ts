'use server';

import { parseWithZod } from '@conform-to/zod';

import { elevationSchema } from './elevationSchema';

export async function updateElevation(prevState: unknown, formData: FormData) {
    const submission = parseWithZod(formData, {
        schema: elevationSchema,
    });

    if (submission.status !== 'success') {
        return submission.reply();
    }
}