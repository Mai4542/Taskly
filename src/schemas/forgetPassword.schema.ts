import { z } from "zod";

export const forgetPasswordSchema = z.object({
    email : z.email('Please enter a valid email address'),
});

export type ForgetPasswordForm = z.infer<typeof forgetPasswordSchema>;