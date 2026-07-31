import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { createEpicSchema } from '../schemas/createEpic.schema';
import type { CreateEpicFormValues } from '../schemas/createEpic.schema';
import { createEpic } from '../services/epics.service';

export const useCreateEpic = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    watch,
    setError,
  } = useForm<CreateEpicFormValues>({
    resolver: zodResolver(createEpicSchema),
    defaultValues: {
      title: '',
      description: '',
      assignee_id: null,
      deadline: null,
    },
  });

  const descriptionValue = watch('description') || '';

  const onSubmit = async (data: CreateEpicFormValues) => {
    if (!projectId) return;

    try {
      const deadline =
        data.deadline && data.deadline !== '' ? data.deadline : null;

      await createEpic({
        ...data,
        project_id: projectId,
        deadline: deadline,
      });

      navigate(`/project/${projectId}/epics`);
    } catch (error: any) {
      setError('root', {
        type: 'manual',
        message: error.message || 'Failed to create epic. Please try again.',
      });
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    control,
    errors,
    isSubmitting,
    descriptionValue,
    projectId,
    navigate,
  };
};
