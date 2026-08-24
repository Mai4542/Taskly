import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addProjectSchema } from '../../schemas/addProject.schema';
import type { AddProjectForm } from '../../schemas/addProject.schema';
import { useCreateProject } from '../../hooks/useCreateProject';
import { APP_ROUTES } from '../../constants/router';
import { AddProject as AddProjectIcon } from '../../components/icons/AddProject';
import { Tip } from '../../components/icons/Tip';
import { ErrorTip } from '../../components/icons/ErrorTip';

export default function AddProject() {
  const navigate = useNavigate();
  const { isSubmitting, createProject } = useCreateProject();

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<AddProjectForm>({
    resolver: zodResolver(addProjectSchema),
    defaultValues: { name: '', description: '' },
    mode: 'onChange',
  });

  const descriptionValue = watch('description', '') ?? '';

  const onSubmit = (data: AddProjectForm) => {
    createProject(
      { name: data.name, description: data.description || undefined },
      () => reset(),
    );
  };

  return (
    <div className="mb-10">
      <nav className="flex items-center gap-1.5 label-sm text-neutral-low mb-2">
        <Link
          to={APP_ROUTES.dashboard.projects.root}
          className="hover:text-neutral-medium"
        >
          PROJECTS
        </Link>
        <span>›</span>
        <span className="text-primary-container">ADD NEW PROJECT</span>
      </nav>

      <h1 className="headline-lg text-neutral-high mb-6">Add New Project</h1>

      <div
        className="flex items-center justify-center"
        style={{ minHeight: 'calc(100vh - 120px)' }}
      >
        <div className="rounded-xl bg-white shadow-sm overflow-hidden max-w-[672px] w-full">
          <div className="flex items-start gap-3 p-6 border-b border-surface-highest">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#0052CC1A]/70 mt-1">
              <AddProjectIcon size={22} color="#0052CC" />
            </div>
            <div>
              <h2 className="title-md text-neutral-high">
                Initialize New Project
              </h2>
              <p className="body-md text-neutral-medium">
                Define the scope and foundational details of your project.
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
                />
              )}
            />
            {errors.name && (
              <p
                id="name-error"
                role="alert"
                className="mt-1.5 text-sm text-error flex items-center gap-1.5"
              >
                <ErrorTip size={14} color="#BA1A1A" className="mt-1" />
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
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-40 h-11"
              >
                {isSubmitting ? 'Creating...' : 'Create Project'}
              </button>
            </div>
          </form>

          <div className="flex items-start gap-2 bg-surface-low px-4 py-3 sm:px-6">
            <Tip size={12} color="#4F5F7B" className="mt-1" />
            <p className="body-md text-neutral-medium text-[12px]">
              <span className="font-bold text-neutral-high">Pro Tip:</span> You
              can invite project members and assign epics immediately after the
              initial creation process.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
