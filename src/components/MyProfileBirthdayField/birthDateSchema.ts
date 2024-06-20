import { z } from 'zod';

export const birthDateSchema = z.object({
    birthday: z.string({ required_error: 'err-birthday-require'})
});