import { z } from 'zod';

export const loginSchema = z.object({
  identifier: z
    .string()
    .min(3, 'Please enter your student email or phone number'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(80, 'Full name is too long'),
  email: z
    .string()
    .email('Please enter a valid university email address'),
  phone: z
    .string()
    .regex(/^[0-9+]{10,14}$/, 'Please enter a valid phone number (e.g. 08012345678)'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Must contain at least one number'),
  campusId: z
    .string()
    .min(1, 'Please select your university campus'),
  acceptTerms: z
    .boolean()
    .refine((val) => val === true, 'You must accept the terms of service'),
});

export const otpSchema = z.object({
  code: z
    .string()
    .length(6, 'Verification code must be 6 digits')
    .regex(/^\d{6}$/, 'Code must contain numbers only'),
});

export const studentVerificationSchema = z.object({
  matricNumber: z
    .string()
    .min(4, 'Matriculation/Student ID number is required')
    .max(30, 'Matric number is too long'),
  documentUrl: z
    .string()
    .min(1, 'Please upload a photo of your Student ID card or admission letter'),
  consent: z
    .boolean()
    .refine((val) => val === true, 'You must consent to student status verification'),
});

export const bookingRequestSchema = z.object({
  variantId: z.string().min(1, 'Service variant is required'),
  scheduledAt: z.string().min(1, 'Date and time are required'),
  locationType: z.enum(['PROVIDER_LOCATION', 'CLIENT_LOCATION', 'CAMPUS_LANDMARK'], {
    required_error: 'Please select a meeting location type',
  }),
  locationDetails: z
    .string()
    .min(3, 'Please describe where on campus (e.g., Hall 3 Block B, Student Union Center)'),
  notes: z.string().max(300, 'Notes cannot exceed 300 characters').optional(),
});

export const pinVerificationSchema = z.object({
  pin: z
    .string()
    .length(6, 'Completion PIN must be 6 digits')
    .regex(/^\d{6}$/, 'PIN must contain numbers only'),
});

export const reviewSchema = z.object({
  rating: z
    .number()
    .min(1, 'Please select a rating')
    .max(5, 'Rating cannot exceed 5 stars'),
  comment: z
    .string()
    .min(5, 'Review comment must be at least 5 characters')
    .max(500, 'Comment cannot exceed 500 characters'),
});
