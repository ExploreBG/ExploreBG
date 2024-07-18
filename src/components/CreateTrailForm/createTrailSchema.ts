import { z } from 'zod';

const placeRegex = /^[A-Za-z]+(\s?[A-Za-z]+)*$/;

export const trailPlaceMinLength = 3;
export const trailPlaceMaxLength = 30;
export const trailInfoMaxLength = 3000;

export const createTrailSchema = z.object({
    startPoint: z
        .string({ required_error: 'err-start-point-required' })
        .regex(placeRegex, 'err-place-regex')
        .min(trailPlaceMinLength, 'err-place-length')
        .max(trailPlaceMaxLength, 'err-place-length'),
    endPoint: z
        .string({ required_error: 'err-end-point-required' })
        .regex(placeRegex, 'err-place-regex')
        .min(trailPlaceMinLength, 'err-place-length')
        .max(trailPlaceMaxLength, 'err-place-length'),
    totalDistance: z
        .number({ message: 'err-total-distance' })
        .positive({ message: 'err-total-distance' })
        .optional(),
    elevationGained: z
        .number({ message: 'err-total-elevation' })
        .positive({ message: 'err-total-elevation' })
        .optional(),
    seasonVisited: z.string(),
    // activity: z.array().optional(),
    waterAvailable: z.string(),
    trailDifficulty: z.string(),
    // availableHuts: z.array().optional(),
    // destinations: z.array().optional(),
    nextTo: z
        .string({ required_error: 'err-next-to-required' })
        .regex(placeRegex, 'err-place-regex')
        .min(trailPlaceMinLength, 'err-place-length')
        .max(trailPlaceMaxLength, 'err-place-length'),
    trailInfo: z
        .string({ required_error: 'err-trail-info-required' })
        .regex(/^[a-zA-Z0-9\-.,\s\n()'`:;?!]*$/, 'err-trail-info-regex')
        .max(trailInfoMaxLength, 'err-trail-info-max-length'),
});