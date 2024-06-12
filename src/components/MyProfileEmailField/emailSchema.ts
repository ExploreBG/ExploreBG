import { z } from 'zod';

import { emailValidation } from '@/utils/validations';

export const emailSchema = z.object({
    email: emailValidation
});