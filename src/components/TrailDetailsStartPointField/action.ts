'use server';

import { parseWithZod } from '@conform-to/zod';

import { startPointSchema } from './startPointSchema';

export async function updateStartPoint(prevState: unknown, formData: FormData) {
    const submission = parseWithZod(formData, {
        schema: startPointSchema,
    });

    if (submission.status !== 'success') {
        return submission.reply();
    }
}