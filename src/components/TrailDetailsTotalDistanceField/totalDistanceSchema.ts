import { z } from 'zod';

import { totalDistanceValidation } from '@/utils/validations';

export const totalDistanceSchema = z.object({
    totalDistance: totalDistanceValidation
});