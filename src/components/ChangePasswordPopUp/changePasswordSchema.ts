import { z } from 'zod';

import { passwordValidation } from '@/utils/validations';

export const changePasswordSchema = z.object({
    currentPass: z.string({ required_error: 'Current password is required!' }),
    newPass: passwordValidation,
    confirmNewPass: z.string({ required_error: 'Confirm new password is required!' }),
}).refine(data => data.newPass === data.confirmNewPass, {
    message: 'Passwords don\'t match!',
    path: ['confirmNewPass']
});