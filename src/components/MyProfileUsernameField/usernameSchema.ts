import { z } from 'zod';

import { usernameValidation } from '@/utils/validations';

export const usernameSchema = z.object({
    username: usernameValidation
});