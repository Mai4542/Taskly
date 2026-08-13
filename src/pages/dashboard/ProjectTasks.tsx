import Breadcrumb from '../../components/common/Breadcrumb';
import { APP_ROUTES } from '../../constants/router';
import { useCreateTask } from '../../hooks/useCreateTask';
import { useProject } from '../../hooks/useProject';
import searchIcon from '../../assets/imgs/search.svg';
import boardIcon from '../../assets/imgs/board.svg';
import listIcon from '../../assets/imgs/listview.svg';
import Select, { type StylesConfig } from 'react-select';
import { Controller } from 'react-hook-form';

interface OptionType {
  value: string;
  label: string;
  icon?: string;
}

const selectStyles: StylesConfig<OptionType, false> = {
  control: (base, state) => ({
    ...base,
    minHeight: '49px',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: '6px',
    boxShadow: state.isFocused ? '0 0 0 2px #2563eb33' : 'none',
    cursor: 'pointer',
    '&:hover': { border: '1px solid #CBD5E1' },
  }),
  valueContainer: (base) => ({ ...base, padding: '0 16px' }),
  placeholder: (base) => ({ ...base, color: '#434654' }),
  singleValue: (base) => ({ ...base, color: '#1f2937' }),
  indicatorSeparator: () => ({ display: 'none' }),
  menu: (base) => ({ ...base, zIndex: 20 }),
  option: (base) => ({
    ...base,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
  }),
};

const VIEW_OPTIONS: OptionType[] = [
  { value: 'board', label: 'Board View', icon: boardIcon },
  { value: 'list', label: 'List View', icon: listIcon },
];

export default function ProjectTasks() {
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

  const formatOptionLabel = (option: OptionType) => (
    <div className="flex items-center gap-2">
      {option.icon && (
        <img src={option.icon} alt={option.label} className="w-4 h-4" />
      )}
      <span>{option.label}</span>
    </div>
  );

  return (
    <div className="pt-10 mx-12">
      <div className="mb-6">
        <Breadcrumb
          items={[
            { label: 'Projects', to: APP_ROUTES.dashboard.projects.root },
            { label: project?.name ?? 'Project', to: `/project/${projectId}` },
            { label: 'TASKS' },
          ]}
        />
      </div>
      <div className="flex flex-row justify-between items-end min-h-15">
        <div className="flex flex-col justify-between">
          <h1 className="text-neutral-high font-[600] text-[30px] leading-[1.2]">
            Active Workboard
          </h1>
          <p className="text-[#64748B] text-[14px] leading-[1.4]">
            Curating Project Alpha's production pipeline and milestones.
          </p>
        </div>
        <div className="flex flex-row items-end gap-2">
          <div className="relative">
            <img
              src={searchIcon}
              alt="search"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search tasks..."
              className="input-default !w-64 pl-9"
            />
          </div>

          <Controller
            name="view"
            defaultValue="board"
            control={control}
            render={({ field }) => (
              <Select
                options={VIEW_OPTIONS}
                value={VIEW_OPTIONS.find((opt) => opt.value === field.value)}
                onChange={(option) => field.onChange(option?.value)}
                placeholder="Select view..."
                styles={selectStyles}
                isSearchable={false}
                formatOptionLabel={formatOptionLabel}
                className="w-48"
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}
