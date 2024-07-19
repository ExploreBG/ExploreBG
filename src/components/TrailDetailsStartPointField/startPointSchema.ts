import { z } from 'zod';

import { startPointValidation } from '@/utils/validations';

export const startPointSchema = z.object({
    startPoint: startPointValidation
});