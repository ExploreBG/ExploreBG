import { z } from 'zod';

export const userInfoMaxLength = 800;

export const infoSchema = z.object({
    userInfo: z
        .string({ required_error: 'err-info-require' })
        .max(userInfoMaxLength, 'err-info-max-length')
});