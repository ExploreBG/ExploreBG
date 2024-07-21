'use server';

import { parseWithZod } from '@conform-to/zod';

import { endPointSchema } from './endPointSchema';

export async function updateEndPoint(prevState: unknown, formData: FormData) {
    const submission = parseWithZod(formData, {
        schema: endPointSchema,
    });

    if (submission.status !== 'success') {
        return submission.reply();
    }
}