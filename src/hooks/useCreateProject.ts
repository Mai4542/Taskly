import { useState } from 'react';
import { toast } from 'sonner';
import { createProjectAPI } from '../services/projects.service';
import type { CreateProjectData } from '../services/projects.service';

export function useCreateProject() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function createProject(
    data: CreateProjectData,
    onSuccess?: () => void,
  ) {
    setIsSubmitting(true);
    try {
      await createProjectAPI(data);
      toast.success('Project created successfully');
      onSuccess?.();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      toast.error(`Failed to create project: ${message}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  return { isSubmitting, createProject };
}