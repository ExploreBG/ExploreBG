import { z } from 'zod';

import { emailValidation } from '@/utils/validations';

export const loginSchema = z.object({
    email: emailValidation,
    password: z.string({ required_error: 'Password is required!' }),
    remember: z.boolean().optional(),
});