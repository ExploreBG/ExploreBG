import { z } from 'zod';

export const loginSchema = z.object({
    usernameOrEmail: z.string(),
    password: z.string().min(5, 'Password must contain at least 5 characters'),
    remember: z.boolean().optional(),
});