import { z } from 'zod';

import { trailInfoValidation } from '@/utils/validations';

export const trailInfoSchema = z.object({
    trailInfo: trailInfoValidation
});