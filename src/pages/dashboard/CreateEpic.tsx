import { Controller } from 'react-hook-form';
import { useCreateEpic } from '../../hooks/useCreateEpic';
import { useProjectMembers } from '../../hooks/useProjectMembers';
import { useProjects } from '../../hooks/useProjects';
import Breadcrumb from '../../components/common/Breadcrumb';
import { ErrorTip } from '../../components/icons/ErrorTip';
import { APP_ROUTES } from '../../constants/router';

const CreateEpic = () => {
  const {
    register,
    handleSubmit,
    control,
    errors,
    isSubmitting,
    descriptionValue,
    projectId,
    navigate,
  } = useCreateEpic();

  const { members } = useProjectMembers(projectId!);
  const { projects } = useProjects();
  const project = projects.find((p) => p.id === projectId);

  if (!projectId) return <div>Error: No Project ID provided</div>;

  return (
    <div className="p-8 max-w-[900px] mx-auto">
      <div className="mb-6">
        <Breadcrumb
          items={[
            { label: 'Projects', to: APP_ROUTES.dashboard.projects.root },
            {
              label: project?.name ?? 'Project',
              to: `/project/${projectId}`,
            },
            { label: 'Epics', to: `/project/${projectId}/epics` },
            { label: 'New Epic' },
          ]}
        />
      </div>

      <h1 className="headline-lg text-neutral-high mb-2">Create New Epic</h1>
      <p className="body-md text-[#434654] mb-8">
        Define a major project phase or high-level milestone to group related
        tasks and track architectural progress.
      </p>

      <div className="bg-white p-10 rounded-lg shadow-sm border border-surface-low mb-10">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-12 gap-4 items-start">
            <div className="col-span-3 pt-2">
              <label className="label-sm text-neutral-medium block">
                TITLE <span className="text-error">*</span>
              </label>
            </div>
            <div className="col-span-9">
              <input
                {...register('title')}
                placeholder="e.g. Structural Foundation Phase"
                className={`input-default w-full ${errors.title ? 'input-error' : ''}`}
              />
              {errors.title && (
                <div className="flex items-center gap-1 mt-2 text-error text-sm">
                  <ErrorTip size={14} color="#BA1A1A" />
                  <span className="text-semibold! uppercase  text-[11px] text-[#BA1A1A]">
                    {errors.title.message}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4 items-start">
            <div className="col-span-3 pt-2">
              <label className="label-sm text-neutral-medium block">
                DESCRIPTION
              </label>
              <span className="text-xs text-extra-grey font-normal block mt-1">
                Optional
              </span>
            </div>
            <div className="col-span-9">
              <div className="relative">
                <textarea
                  {...register('description')}
                  placeholder="Describe the scope and objectives of this epic..."
                  className="input-default w-full h-[120px] resize-none pt-3"
                  maxLength={500}
                />
                <div className="absolute  right-4 text-xs text-extra-grey">
                  {descriptionValue.length} / 500 characters
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="label-sm text-neutral-medium block mb-3">
                ASSIGNEE
              </label>
              <Controller
                name="assignee_id"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    value={field.value || ''}
                    onChange={(e) => field.onChange(e.target.value || null)}
                    className="input-default w-full appearance-none cursor-pointer"
                  >
                    <option value="">Select a member...</option>
                    {members?.map((member) => (
                      <option key={member.id} value={member.id}>
                        {member.name || member.email}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>

            <div className="flex-1">
              <label className="label-sm text-neutral-medium block mb-3">
                DEADLINE
              </label>
              <input
                type="date"
                {...register('deadline')}
                className="input-default w-full"
              />
            </div>
          </div>

          <div className="flex flex-col justify-end items-end gap-4 pt-6 border-t border-surface-low">
            {errors.root && (
              <div className="w-full text-error text-sm mb-2">
                {errors.root.message}
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn-ghost w-40 rounded-sm "
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-40 rounded-sm px-8 "
              >
                {isSubmitting ? 'Creating...' : 'Create Epic'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEpic;
