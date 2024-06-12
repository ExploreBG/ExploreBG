'use server';

import { parseWithZod } from '@conform-to/zod';

import { emailSchema } from './emailSchema';

export async function changeEmail(prevState: unknown, formData: FormData) {
    const submission = parseWithZod(formData, {
        schema: emailSchema,
    });

    if (submission.status !== 'success') {
        return submission.reply();
    }
}