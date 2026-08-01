import { z } from 'zod';

export const createEpicSchema = z.object({
  title: z.string().min(2, 'Title is required (minimum 2 characters)'),
  description: z.string().optional(),
  assignee_id: z.string().optional().nullable(),
  deadline: z.string().optional().nullable(),
});

export type CreateEpicFormValues = z.infer<typeof createEpicSchema>;
