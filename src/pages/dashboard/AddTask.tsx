import { Controller, useForm } from 'react-hook-form';
import Select, { type StylesConfig } from 'react-select';
import Breadcrumb from '../../components/common/Breadcrumb';
import { APP_ROUTES } from '../../constants/router';

const STATUS_OPTIONS = [
  { value: 'TO_DO', label: 'TO DO' },
  { value: 'IN_PROGRESS', label: 'IN PROGRESS' },
  { value: 'BLOCKED', label: 'BLOCKED' },
  { value: 'IN_REVIEW', label: 'IN REVIEW' },
  { value: 'READY_FOR_QA', label: 'READY FOR QA' },
  { value: 'REOPENED', label: 'REOPENED' },
  { value: 'READY_FOR_PRODUCTION', label: 'READY FOR PRODUCTION' },
  { value: 'DONE', label: 'DONE' },
];

const MEMBER_OPTIONS = [];

const EPIC_OPTIONS = [];

interface OptionType {
  value: string;
  label: string;
}

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
  valueContainer: (base) => ({
    ...base,
    padding: '0 16px',
  }),
  placeholder: (base) => ({
    ...base,
    color: '#434654',
  }),
  singleValue: (base) => ({
    ...base,
    color: '#1f2937',
  }),
  indicatorSeparator: () => ({ display: 'none' }),
  menu: (base) => ({
    ...base,
    zIndex: 20,
  }),
};

const AddTask = () => {
  const { control } = useForm({
    defaultValues: {
      status: 'TO_DO',
    },
  });
  const projectId = 'project-id-placeholder';

  return (
    <div className="pt-10 mx-12 ">
      <div className="mb-6">
        <Breadcrumb
          items={[
            { label: 'Projects', to: APP_ROUTES.dashboard.projects.root },
            { label: 'Project', to: `/project/${projectId}` },
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
        <form className="space-y-8">
          <div className="flex flex-col gap-2 items-start">
            <label className="label-sm text-neutral-medium block">
              TITLE <span className="text-error">*</span>
            </label>
            <div className="w-full">
              <input
                placeholder="e.g., Finalize structural schematics"
                className="input-default w-full"
              />
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
                    {...field}
                    options={STATUS_OPTIONS}
                    value={STATUS_OPTIONS.find(
                      (opt) => opt.value === field.value,
                    )}
                    onChange={(option) => field.onChange(option?.value ?? null)}
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
                    {...field}
                    options={MEMBER_OPTIONS}
                    value={MEMBER_OPTIONS.find(
                      (opt) => opt.value === field.value,
                    )}
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
                  {...field}
                  options={EPIC_OPTIONS}
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
              placeholder="Provide detailed context for this task..."
              className="input-default w-full h-[120px] resize-none pt-3"
              maxLength={500}
            />
          </div>

          <div className="flex flex-col-reverse lg:flex-row justify-end items-center gap-4 pt-6 border-t border-surface-low pb-6 mb-15 lg:mb-1">
            <button
              type="button"
              className="text-neutral-medium w-full lg:w-25 font-medium"
            >
              Back
            </button>
            <button
              type="submit"
              className="btn-primary w-full lg:w-39 rounded-sm px-8"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
