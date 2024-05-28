'use server';

import { parseWithZod } from '@conform-to/zod';
import { redirect } from '@/navigation';

import { loginSchema } from './loginSchema';

export async function login(prevState: unknown, formData: FormData) {
    const submission = parseWithZod(formData, {
        schema: loginSchema,
    });

    if (submission.status !== 'success') {
        return submission.reply();
    }

    redirect('/');
}