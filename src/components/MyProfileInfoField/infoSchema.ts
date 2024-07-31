import { z } from 'zod';

export const userInfoMaxLength = 1500;

export const infoSchema = z.object({
    userInfo: z
        .string({ required_error: 'err-info-require' })
        .max(userInfoMaxLength, 'err-info-max-length')
});