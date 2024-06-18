import { z } from 'zod';

import { passwordValidation } from '@/utils/validations';

export const changePasswordSchema = z.object({
    currentPassword: z.string({ required_error: 'err-current-pass-require' }),
    newPassword: passwordValidation,
    confirmNewPassword: z.string({ required_error: 'err-confirm-new-pass-require' }),
}).refine(data => data.newPassword === data.confirmNewPassword, {
    message: 'err-pass-mismatch',
    path: ['confirmNewPassword']
});