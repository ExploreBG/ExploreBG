import { z } from 'zod';

import { emailValidation } from '@/utils/validations';

export const loginSchema = z.object({
    email: emailValidation,
    password: z.string({ required_error: 'err-pass-require' }),
    remember: z.boolean().optional(),
});