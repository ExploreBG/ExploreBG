import { z } from 'zod';

import { usernameValidation, emailValidation, passwordValidation } from '@/utils/validations';

export const registerSchema = z.object({
    email: emailValidation,
    username: usernameValidation,
    password: passwordValidation,
    confirmPassword: z.string({ required_error: 'err-pass-confirm-require' }),
}).refine(data => data.password === data.confirmPassword, {
    message: 'err-pass-mismatch',
    path: ['confirmPassword']
});