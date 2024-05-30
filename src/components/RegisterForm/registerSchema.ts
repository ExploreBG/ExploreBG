import { z } from 'zod';

const passwordSchema = z
    .string({ required_error: 'Password is required!' })
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter!')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter!')
    .regex(/\d/, 'Password must contain at least one number!')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character!')
    .min(5, 'Password must contain at least 5 characters!');

export const registerSchema = z.object({
    email: z.string({ required_error: 'Email is required!' }).email(),
    username: z.string({ required_error: 'Username is required!' }).min(3, 'Username must contain at least 3 characters!'),
    password: passwordSchema,
    confirmPassword: z.string({ required_error: 'Confirm password is required!' }),
}).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords don\'t match!',
    path: ['confirmPassword']
});