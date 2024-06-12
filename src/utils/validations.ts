import { z } from 'zod';

export const usernameValidation = z
    .string({ required_error: 'Username is required!' })
    .min(3, 'Username must contain at least 3 characters!');

export const emailValidation = z.string({ required_error: 'Email is required!' }).email();

export const passwordValidation = z
    .string({ required_error: 'Password is required!' })
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter!')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter!')
    .regex(/\d/, 'Password must contain at least one number!')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character!')
    .min(5, 'Password must contain at least 5 characters!');


export const passwordErrors = (errors: string[] | undefined) => {
    return errors != undefined ? errors[0] : errors;
};