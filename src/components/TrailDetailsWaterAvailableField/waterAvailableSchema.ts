import { z } from 'zod';

export const waterAvailableSchema = z.object({
    waterAvailable: z.string()
});