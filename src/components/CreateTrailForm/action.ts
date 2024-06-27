'use server';

import { parseWithZod } from '@conform-to/zod';

import { createTrailSchema } from './createTrailSchema';

export async function createTrail(prevState: unknown, formData: FormData) {
    const submission = parseWithZod(formData, {
        schema: createTrailSchema,
    });

    if (submission.status !== 'success') {
        return submission.reply();
    }
}