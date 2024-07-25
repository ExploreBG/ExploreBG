'use server';

import { parseWithZod } from '@conform-to/zod';

import { commentsSchema } from './commentsSchema';

export async function validateComment(prevState: unknown, formData: FormData) {
    const submission = parseWithZod(formData, {
        schema: commentsSchema,
    });

    if (submission.status !== 'success') {
        return submission.reply();
    }
}