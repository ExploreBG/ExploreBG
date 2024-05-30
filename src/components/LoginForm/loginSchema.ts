import { z } from 'zod';

export const loginSchema = z.object({
    usernameOrEmail: z.string({ required_error: 'This field is required!' }),
    password: z.string({ required_error: 'Password is required!' }),
    remember: z.boolean().optional(),
});