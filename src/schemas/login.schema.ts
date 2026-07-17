import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email('Please enter a valid email'),
  password: z.string().trim().min(1, "Password Can't be empty"),
});
export type LoginForm = z.infer<typeof loginSchema>;
