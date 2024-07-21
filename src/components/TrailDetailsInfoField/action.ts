'use server';

import { parseWithZod } from '@conform-to/zod';

import { trailInfoSchema } from './trailInfoSchema';

export async function updateTrailInfo(prevState: unknown, formData: FormData) {
    const submission = parseWithZod(formData, {
        schema: trailInfoSchema,
    });

    if (submission.status !== 'success') {
        return submission.reply();
    }
}