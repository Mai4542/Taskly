import { Controller } from 'react-hook-form';
import Select, { type StylesConfig } from 'react-select';
import Breadcrumb from '../../components/common/Breadcrumb';
import { APP_ROUTES } from '../../constants/router';
import { useProject } from '../../hooks/useProject';
import { useProjectMembers } from '../../hooks/useProjectMembers';
import { useEpics } from '../../hooks/useEpics';
import { useCreateTask } from '../../hooks/useCreateTask';
import type { TaskStatus } from '../../services/tasks.service';

interface OptionType {
  value: string;
  label: string;
}

const STATUS_VALUES: TaskStatus[] = [
  'TO_DO',
  'IN_PROGRESS',
  'BLOCKED',
  'IN_REVIEW',
  'READY_FOR_QA',
  'REOPENED',
  'READY_FOR_PRODUCTION',
  'DONE',
];

// TO_DO -> TO DO (عرض بدون underscore)
const formatStatusLabel = (status: string) => status.replace(/_/g, ' ');

const STATUS_OPTIONS: OptionType[] = STATUS_VALUES.map((value) => ({
  value,
  label: formatStatusLabel(value),
}));

const truncate = (text: string, max = 100) =>
  text.length > max ? `${text.slice(0, max)}...` : text;

const selectStyles: StylesConfig<OptionType, false> = {
  control: (base, state) => ({
    ...base,
    minHeight: '48px',
    backgroundColor: '#DCE4FA',
    border: 'none',
    borderRadius: '6px',
    boxShadow: state.isFocused ? '0 0 0 2px #2563eb33' : 'none',
    cursor: 'pointer',
    '&:hover': { border: 'none' },
  }),
  valueContainer: (base) => ({ ...base, padding: '0 16px' }),
  placeholder: (base) => ({ ...base, color: '#434654' }),
  singleValue: (base) => ({ ...base, color: '#1f2937' }),
  indicatorSeparator: () => ({ display: 'none' }),
  menu: (base) => ({ ...base, zIndex: 20 }),
};

const AddTask = () => {
  const {
    register,
    control,
    errors,
    isSubmitting,
    submitError,
    projectId,
    navigate,
    onSubmit,
  } = useCreateTask();

  const { project } = useProject(projectId);
  const { members } = useProjectMembers(projectId);
  const { epics } = useEpics(projectId);

  const memberOptions: OptionType[] = members.map((member) => ({
    value: member.id,
    label: member.name || member.email,
  }));

  const epicOptions: OptionType[] = epics.map((epic) => ({
    value: epic.id,
    label: `${epic.epic_id} ${truncate(epic.title, 100)}`,
  }));

  return (
    <div className="pt-10 mx-12">
      <div className="mb-6">
        <Breadcrumb
          items={[
            { label: 'Projects', to: APP_ROUTES.dashboard.projects.root },
            { label: project?.name ?? 'Project', to: `/project/${projectId}` },
            { label: 'Tasks', to: `/project/${projectId}/tasks` },
            { label: 'New Task' },
          ]}
        />
      </div>

      <h1 className="headline-lg text-neutral-high mb-2">Create New Task</h1>
      <p className="body-md text-[#434654] mb-8">
        Initialize a new work item within the Architectural Workspace ecosystem.
      </p>

      <div className="bg-white px-6 pt-4 rounded-lg shadow-sm border border-surface-low mb-10">
        <form className="space-y-8" onSubmit={onSubmit}>
          <div className="flex flex-col gap-2 items-start">
            <label className="label-sm text-neutral-medium block">
              TITLE <span className="text-error">*</span>
            </label>
            <div className="w-full">
              <input
                {...register('title', { required: 'Title is required' })}
                placeholder="e.g., Finalize structural schematics"
                className="input-default w-full"
              />
              {errors.title && (
                <span className="text-xs text-error mt-1 block">
                  {errors.title.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col xl:flex-row gap-8">
            <div className="flex-1">
              <label className="label-sm text-neutral-medium block mb-2">
                STATUS <span className="text-error">*</span>
              </label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    options={STATUS_OPTIONS}
                    value={STATUS_OPTIONS.find(
                      (opt) => opt.value === field.value,
                    )}
                    onChange={(option) => field.onChange(option?.value)}
                    placeholder="Select status..."
                    styles={selectStyles}
                    isSearchable={false}
                  />
                )}
              />
            </div>

            <div className="flex-1">
              <label className="label-sm text-neutral-medium block mb-2">
                ASSIGNEE
              </label>
              <Controller
                name="assignee_id"
                control={control}
                render={({ field }) => (
                  <Select
                    options={memberOptions}
                    value={
                      memberOptions.find((opt) => opt.value === field.value) ||
                      null
                    }
                    onChange={(option) => field.onChange(option?.value ?? null)}
                    placeholder="Select Team Member"
                    styles={selectStyles}
                    isClearable
                  />
                )}
              />
            </div>
          </div>

          <div>
            <label className="label-sm text-neutral-medium block mb-2">
              EPIC
            </label>
            <Controller
              name="epic_id"
              control={control}
              render={({ field }) => (
                <Select
                  options={epicOptions}
                  value={
                    epicOptions.find((opt) => opt.value === field.value) || null
                  }
                  onChange={(option) => field.onChange(option?.value ?? null)}
                  placeholder="Select Epic Link"
                  styles={selectStyles}
                  isClearable
                />
              )}
            />
          </div>

          <div>
            <label className="label-sm text-neutral-medium block mb-2">
              DUE DATE
            </label>
            <input type="date" className="input-default w-full" />
          </div>

          <div>
            <label className="label-sm text-neutral-medium block mb-2">
              DESCRIPTION
            </label>
            <textarea
              {...register('description')}
              placeholder="Provide detailed context for this task..."
              className="input-default w-full h-[120px] resize-none pt-3"
              maxLength={500}
            />
          </div>

          {submitError && (
            <div className="w-full text-error text-sm">{submitError}</div>
          )}

          <div className="flex flex-col-reverse lg:flex-row justify-end items-center gap-4 pt-6 border-t border-surface-low pb-6 mb-15 lg:mb-1">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="text-neutral-medium w-full lg:w-25 font-medium cursor-pointer hover:bg-black/20 h-12"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full lg:w-39 rounded-sm px-8"
            >
              {isSubmitting ? 'Creating...' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
