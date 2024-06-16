import { z } from 'zod';

export const usernameValidation = z
    .string({ required_error: 'err-username-require' })
    .regex(/^[A-Za-z]/, 'err-username-start-with')
    .regex(/^[A-Za-z_\d]+$/, 'err-username-contain')
    .min(3, 'err-username-min-length')
    .max(30, 'err-username-max-length');

export const emailValidation = z
    .string({ required_error: 'err-email-require' })
    .regex(/[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,4}/, 'err-email-invalid');

export const passwordValidation = z
    .string({ required_error: 'err-pass-require' })
    .regex(/[a-z]/, 'err-pass-lowercase')
    .regex(/[A-Z]/, 'err-pass-uppercase')
    .regex(/\d/, 'err-pass-number')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'err-pass-special-char')
    .regex(/^\S*$/, 'err-pass-interval')
    .min(5, 'err-pass-min-length')
    .max(24, 'err-pass-max-length');


export const passwordErrors = (errors: string[] | undefined) => {
    return errors != undefined ? errors[0] : errors;
};