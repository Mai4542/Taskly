import { useState } from 'react';
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import Breadcrumb from '../../components/common/Breadcrumb';
import { APP_ROUTES } from '../../constants/router';
import { useProject } from '../../hooks/useProject';
import { Search } from '../../components/icons/Search';
import { Board } from '../../components/icons/Board';
import { ListView as ListViewIcon } from '../../components/icons/ListView';
import Select, { type StylesConfig } from 'react-select';
import BoardView from '../../components/dashboard/tasks/BoardView';
import ListView from '../../components/dashboard/tasks/ListView';
import MobileTaskList from '../../components/dashboard/tasks/MobileTaskList';
import TaskDetailsModal from '../../components/dashboard/tasks/TaskDetailsModal';

interface OptionType {
  value: string;
  label: string;
  icon?: React.ComponentType<{
    size?: number;
    color?: string;
    className?: string;
  }>;
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
  { value: 'board', label: 'Board View', icon: Board },
  { value: 'list', label: 'List View', icon: ListViewIcon },
];

export default function ProjectTasks() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { project } = useProject(projectId);
  const [searchParams, setSearchParams] = useSearchParams();

  const initialView =
    VIEW_OPTIONS.find((o) => o.value === searchParams.get('view')) ??
    VIEW_OPTIONS[0];

  const [view, setView] = useState<OptionType>(initialView);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const handleViewChange = (option: OptionType) => {
    setView(option);
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('view', option.value);
      return params;
    });
  };

  const formatOptionLabel = (option: OptionType) => {
    const Icon = option.icon;
    return (
      <div className="flex items-center gap-2">
        {Icon && <Icon size={14} color="#041B3C" className="w-4 h-4" />}
        <span>{option.label}</span>
      </div>
    );
  };

  const handleAddTask = (status: string) => {
    if (!projectId) return;
    navigate(APP_ROUTES.dashboard.createTask(projectId), { state: { status } });
  };

  const handleAddTaskFromList = () => {
    if (!projectId) return;
    navigate(APP_ROUTES.dashboard.createTask(projectId));
  };

  return (
    <div className="pt-10 pb-16 px-4 md:mx-12 ">
      <div className="hidden md:block mb-6">
        <Breadcrumb
          items={[
            { label: 'Projects', to: APP_ROUTES.dashboard.projects.root },
            { label: project?.name ?? 'Project', to: `/project/${projectId}` },
            { label: 'TASKS' },
          ]}
        />
      </div>

      <div className="flex flex-col md:flex-row md:justify-between md:items-end min-h-15 mb-6 gap-4">
        <div className="flex flex-col justify-between">
          <h1 className="text-neutral-high font-[600] text-[30px] leading-[1.2]">
            Active Workboard
          </h1>
          <p className="hidden md:block text-[#64748B] text-[14px] leading-[1.4]">
            {project?.description ??
              `Curating ${project?.name ?? 'this project'}'s production pipeline and milestones.`}
          </p>
        </div>

        <div className="flex flex-row items-end gap-2">
          <div className="relative flex-1 md:flex-none">
            <Search
              size={14}
              color="#94A3B8"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search tasks..."
              className="input-default w-full md:!w-64 pl-9"
            />
          </div>

          <div className="hidden md:block">
            <Select
              options={VIEW_OPTIONS}
              value={view}
              onChange={(option) => option && handleViewChange(option)}
              placeholder="Select view..."
              styles={selectStyles}
              isSearchable={false}
              formatOptionLabel={formatOptionLabel}
              className="w-48"
            />
          </div>
        </div>
      </div>

      {projectId && (
        <MobileTaskList
          projectId={projectId}
          onAddTask={handleAddTaskFromList}
          onTaskClick={setSelectedTaskId}
        />
      )}

      {view.value === 'board' && projectId && (
        <BoardView
          projectId={projectId}
          onAddTask={handleAddTask}
          onTaskClick={setSelectedTaskId}
        />
      )}

      {view.value === 'list' && projectId && (
        <div className="hidden md:block ">
          <ListView
            projectId={projectId}
            onAddTask={handleAddTaskFromList}
            onTaskClick={setSelectedTaskId}
          />
        </div>
      )}
      <TaskDetailsModal
        projectId={projectId}
        taskId={selectedTaskId}
        onClose={() => setSelectedTaskId(null)}
      />
    </div>
  );
}
