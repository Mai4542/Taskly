import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addProjectSchema } from '../../schemas/addProject.schema';
import type { AddProjectForm } from '../../schemas/addProject.schema';
import { useEditProject } from '../../hooks/useEditProject';
import { APP_ROUTES } from '../../constants/router';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorState from '../../components/common/ErrorState';
import edit from '../../assets/imgs/addproject.svg';
import tip from '../../assets/imgs/tip.svg';
import tiperror from '../../assets/imgs/errortip.svg';

export default function EditProject() {
  const navigate = useNavigate();
  const { project, fetchStatus, isSaving, saveProject, retry, cancel } =
    useEditProject();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AddProjectForm>({
    resolver: zodResolver(addProjectSchema),
    defaultValues: { name: '', description: '' },
    mode: 'onChange',
    values: project
      ? { name: project.name || '', description: project.description || '' }
      : undefined,
  });

  const descriptionValue = watch('description', '') ?? '';

  const onSubmit = (data: AddProjectForm) => {
    saveProject({
      name: data.name,
      description: data.description || undefined,
    });
  };

  if (fetchStatus === 'loading') {
    return (
      <div
        className="flex items-center justify-center"
        style={{ minHeight: 'calc(100vh - 120px)' }}
      >
        <LoadingSpinner />
      </div>
    );
  }

  if (fetchStatus === 'error') {
    return (
      <div
        className="flex items-center justify-center"
        style={{ minHeight: 'calc(100vh - 120px)' }}
      >
        <div className="flex flex-col items-center">
          <ErrorState
            title="Failed to load project"
            message="Could not load project details. Please try again."
            onRetry={retry}
          />
          <button
            type="button"
            onClick={cancel}
            className="mt-4 text-neutral-medium hover:text-neutral-high transition-colors"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  if (fetchStatus === 'success' && !project) {
    return (
      <div
        className="flex items-center justify-center"
        style={{ minHeight: 'calc(100vh - 120px)' }}
      >
        <div className="flex flex-col items-center">
          <h2 className="headline-md text-neutral-high mb-2">
            Project Not Found
          </h2>
          <p className="body-md text-neutral-medium mb-6">
            The project you're looking for doesn't exist or has been deleted.
          </p>
          <button type="button" onClick={cancel} className="btn-primary">
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-10">
      <nav className="flex items-center gap-1.5 label-sm text-neutral-low mb-2">
        <Link
          to={APP_ROUTES.dashboard.projects.root}
          className="hover:text-neutral-medium text-[12px]"
        >
          PROJECTS
        </Link>
        <span>›</span>
        <span>{project?.name}</span>
        <span>›</span>
        <span className="text-primary-container text-[12px]">EDIT</span>
      </nav>

      <h1 className="headline-lg text-neutral-high mb-6 ">Edit Project</h1>

      <div
        className="flex items-center justify-center"
        style={{ minHeight: 'calc(100vh - 120px)' }}
      >
        <div className="rounded-xl bg-white shadow-sm overflow-hidden max-w-[672px] w-full">
          <div className="flex items-start gap-3 p-6 border-b border-surface-highest">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#0052CC1A]/70 mt-1">
              <img src={edit} alt="edit" />
            </div>
            <div>
              <h2 className="title-md text-neutral-high">
                Edit Project Details
              </h2>
              <p className="body-md text-neutral-medium">
                Update the scope and foundational details of your project.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-6">
            <label
              htmlFor="name"
              className="label-sm text-neutral-medium mb-2 block"
            >
              PROJECT TITLE <span className="text-error">*</span>
            </label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id="name"
                  type="text"
                  placeholder="e.g. Redesign customer portal"
                  className={
                    errors.name ? 'input-error w-full' : 'input-default w-full'
                  }
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  disabled={isSaving}
                />
              )}
            />
            {errors.name && (
              <p
                id="name-error"
                role="alert"
                className="mt-1.5 text-sm text-error flex items-center gap-1.5"
              >
                <img src={tiperror} alt="tiperror" className="mt-1" />
                {errors.name.message}
              </p>
            )}

            <div className="mt-6 flex items-center justify-between mb-2">
              <label
                htmlFor="description"
                className="label-sm text-neutral-medium block"
              >
                DESCRIPTION
              </label>
              <span className="label-sm text-neutral-low">Optional</span>
            </div>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  id="description"
                  rows={4}
                  maxLength={500}
                  placeholder="Provide a high-level overview of the project's architectural objectives and key milestones..."
                  className={`w-full rounded-sm px-4 py-3 text-sm resize-none focus:outline-none focus:ring ${
                    errors.description
                      ? 'bg-[#FFDAD6] border border-[#FFDAD6] text-error'
                      : 'bg-surface-highest border border-surface-highest text-neutral-high'
                  }`}
                  disabled={isSaving}
                />
              )}
            />
            <div className="mt-1 text-right label-sm text-neutral-low">
              {descriptionValue.length} / 500 characters
            </div>
            {errors.description && (
              <p role="alert" className="mt-1 text-sm text-error">
                {errors.description.message}
              </p>
            )}

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn-ghost w-40 h-11"
                disabled={isSaving}
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="btn-primary w-40 h-11"
              >
                {isSaving ? 'Updating...' : 'Update Project'}
              </button>
            </div>
          </form>

          <div className="flex items-start gap-2 bg-surface-low px-4 py-3 sm:px-6">
            <img src={tip} alt="tip" className="mt-1" />
            <p className="body-md text-neutral-medium text-[12px]">
              <span className="font-bold text-neutral-high">Pro Tip:</span> You
              can manage project members and epics from the project dashboard
              after updating the details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
