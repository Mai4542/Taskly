import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { createTask, type TaskStatus } from '../services/tasks.service';

export interface TaskFormValues {
  title: string;
  description?: string;
  epic_id?: string | null;
  assignee_id?: string | null;
  due_date?: string | null;
  status: TaskStatus;
}

interface LocationState {
  epicId?: string;
  status?: TaskStatus;
}

export function useCreateTask() {
  const { projectId } = useParams<{ projectId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const state = location.state as LocationState | null;
  const prefilledEpicId = state?.epicId ?? null;
  const prefilledStatus = state?.status ?? 'TO_DO';

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormValues>({
    defaultValues: {
      title: '',
      description: '',
      epic_id: prefilledEpicId,
      assignee_id: null,
      due_date: null,
      status: prefilledStatus,
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    if (!projectId) return;
    setSubmitError(null);

    try {
      await createTask({
        project_id: projectId,
        title: values.title,
        epic_id: values.epic_id || undefined,
        description: values.description || undefined,
        assignee_id: values.assignee_id || undefined,
        due_date: values.due_date || undefined,
        status: values.status,
      });

      navigate(`/project/${projectId}/tasks`);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Something went wrong',
      );
    }
  });

  return {
    register,
    control,
    errors,
    isSubmitting,
    submitError,
    projectId,
    navigate,
    onSubmit,
  };
}
