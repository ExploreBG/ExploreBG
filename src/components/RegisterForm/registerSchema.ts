import { z } from 'zod';

import { passwordSchema } from '@/utils/passwordSchema';

export const registerSchema = z.object({
    email: z.string({ required_error: 'Email is required!' }).email(),
    username: z.string({ required_error: 'Username is required!' }).min(3, 'Username must contain at least 3 characters!'),
    password: passwordSchema,
    confirmPassword: z.string({ required_error: 'Confirm password is required!' }),
}).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords don\'t match!',
    path: ['confirmPassword']
});