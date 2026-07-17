import { z } from 'zod';

export const signUpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, 'Name must be 3 characters at least')
      .max(50, 'Name must not exceed 50 charcters')
      .regex(/^[\p{L}]+(?: [\p{L}]+)*$/u, {
        message: 'Only letters and single spaces are allowed',
      }),

    email: z.email('Please enter a valid email address'),

    jobTitle: z.string().trim().optional(),

    password: z
      .string()
      .trim()
      .min(8, 'Password must be at least 8 characters')
      .max(64, 'Password must not exceed 64 characters')
      .regex(/^\S+$/, {
        message: 'Password must not contain spaces',
      })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter',
      })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter',
      })
      .regex(/\d/, {
        message: 'Password must contain at least one number',
      })
      .regex(/[!@#$%^&*(),.?":{}|<>_\-+=\\[\]~/`]/, {
        message: 'Password must contain at least one special character',
      }),

    confirmPassword: z.string(),
  })

  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export type SignUpForm = z.infer<typeof signUpSchema>;
