import { z } from 'zod';

import { startPointValidation, endPointValidation, totalDistanceValidation, elevationGainedValidation, nextToValidation, trailInfoValidation } from '@/utils/validations';

export const createTrailSchema = z.object({
    startPoint: startPointValidation,
    endPoint: endPointValidation,
    totalDistance: totalDistanceValidation,
    elevationGained: elevationGainedValidation,
    seasonVisited: z.string(),
    // activity: z.array().optional(),
    waterAvailable: z.string(),
    trailDifficulty: z.string(),
    // availableHuts: z.array().optional(),
    // destinations: z.array().optional(),
    nextTo: nextToValidation,
    trailInfo: trailInfoValidation,
});