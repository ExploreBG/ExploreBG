import { z } from 'zod';

import { passwordSchema } from '@/utils/passwordSchema';

export const changePasswordSchema = z.object({
    currentPass: z.string({ required_error: 'Current password is required!' }),
    newPass: passwordSchema,
    confirmNewPass: z.string({ required_error: 'Confirm new password is required!' }),
}).refine(data => data.newPass === data.confirmNewPass, {
    message: 'Passwords don\'t match!',
    path: ['confirmNewPass']
});