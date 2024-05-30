'use server';

import { parseWithZod } from '@conform-to/zod';
import { redirect } from '@/navigation';

import { registerSchema } from './registerSchema';

export async function register(prevState: unknown, formData: FormData) {
    const submission = parseWithZod(formData, {
        schema: registerSchema,
    });

    if (submission.status !== 'success') {
        return submission.reply();
    }

    redirect('/');
}