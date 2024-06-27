import { z } from 'zod';

export const createTrailSchema = z.object({
    startPoint: z.string().optional(),
    endPoint: z.string().optional(),
    totalDistance: z.string().optional(),
    elevationGained: z.string().optional(),
    seasonVisited: z.string().optional(),
    activity: z.string().optional(),
    waterAvailable: z.string().optional(),
    trailDifficulty: z.string().optional(),
    availableHuts: z.string().optional(),
    destinations: z.string().optional(),
    nextTo: z.string().optional(),
    imageUrl: z.string().optional(),
    trailInfo: z.string().optional(),
});