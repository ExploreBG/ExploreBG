import { z } from 'zod';

import { elevationGainedValidation } from '@/utils/validations';

export const elevationSchema = z.object({
    elevationGained: elevationGainedValidation
});