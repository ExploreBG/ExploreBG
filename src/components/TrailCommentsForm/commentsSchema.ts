import { z } from 'zod';

import { commentValidation } from '@/utils/validations';

export const commentsSchema = z.object({
    comment: commentValidation
});