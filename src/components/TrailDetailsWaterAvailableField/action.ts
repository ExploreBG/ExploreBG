'use server';

import { parseWithZod } from '@conform-to/zod';

import { waterAvailableSchema } from './waterAvailableSchema';

export async function updateWaterAvailable(prevState: unknown, formData: FormData) {
    const submission = parseWithZod(formData, {
        schema: waterAvailableSchema,
    });

    if (submission.status !== 'success') {
        return submission.reply();
    }
}