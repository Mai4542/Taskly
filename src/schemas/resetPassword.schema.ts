import { z } from 'zod';

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(64, 'Password must not exceed 64 characters')
      .regex(/^\S+$/, { message: 'Password must not contain spaces' })
      .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
      .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
      .regex(/\d/, { message: 'Password must contain at least one number' })
      .regex(/[!@#$%^&*(),.?":{}|<>_\-+=\\[\]~/`]/, { message: 'Password must contain at least one special character' }),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;