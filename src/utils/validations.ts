import { z } from 'zod';

const placeRegex = /^[A-Za-z]+(\s?[A-Za-z]+)*$/;

export const trailPlaceMinLength = 3;
export const trailPlaceMaxLength = 30;
export const trailInfoMaxLength = 3000;

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

export const startPointValidation = z
    .string({ required_error: 'err-start-point-required' })
    .regex(placeRegex, 'err-place-regex')
    .min(trailPlaceMinLength, 'err-place-length')
    .max(trailPlaceMaxLength, 'err-place-length')

export const endPointValidation = z
    .string({ required_error: 'err-end-point-required' })
    .regex(placeRegex, 'err-place-regex')
    .min(trailPlaceMinLength, 'err-place-length')
    .max(trailPlaceMaxLength, 'err-place-length')

export const totalDistanceValidation = z
    .number({ message: 'err-total-distance' })
    .positive({ message: 'err-total-distance' })
    .optional()

export const elevationGainedValidation = z
    .number({ message: 'err-total-elevation' })
    .positive({ message: 'err-total-elevation' })
    .optional()

export const nextToValidation = z
    .string({ required_error: 'err-next-to-required' })
    .regex(placeRegex, 'err-place-regex')
    .min(trailPlaceMinLength, 'err-place-length')
    .max(trailPlaceMaxLength, 'err-place-length')

export const trailInfoValidation = z
    .string({ required_error: 'err-trail-info-required' })
    .regex(/^[a-zA-Z0-9\-.,\s\n()'`:;?!]*$/, 'err-trail-info-regex')
    .max(trailInfoMaxLength, 'err-trail-info-max-length')