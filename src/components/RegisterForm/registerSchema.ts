import { z } from 'zod';

import { usernameValidation, emailValidation, passwordValidation } from '@/utils/validations';

export const registerSchema = z.object({
    email: emailValidation,
    username: usernameValidation,
    password: passwordValidation,
    confirmPassword: z.string({ required_error: 'Confirm password is required!' }),
}).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords don\'t match!',
    path: ['confirmPassword']
});