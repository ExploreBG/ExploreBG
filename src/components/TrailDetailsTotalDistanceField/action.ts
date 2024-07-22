'use server';

import { parseWithZod } from '@conform-to/zod';

import { totalDistanceSchema } from './totalDistanceSchema';

export async function updateTotalDistance(prevState: unknown, formData: FormData) {
    const submission = parseWithZod(formData, {
        schema: totalDistanceSchema,
    });

    if (submission.status !== 'success') {
        return submission.reply();
    }
}