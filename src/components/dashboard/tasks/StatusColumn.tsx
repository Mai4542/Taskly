import { useTasksByStatus } from '../../../hooks/useTasksByStatus';
import TaskCard from './TaskCard';
import type { STATUS_COLUMNS } from '../../../constants/taskStatus';
import AddNewTaskButton from '../../common/AddNewTaskButton';

type StatusConfig = (typeof STATUS_COLUMNS)[number];

interface StatusColumnProps {
  projectId: string;
  statusConfig: StatusConfig;
  onAddTask: (status: string) => void;
  onTaskClick: (taskId: string) => void;
  searchTerm?: string;
}

const StatusColumn = ({
  projectId,
  statusConfig,
  onAddTask,
  onTaskClick,
  searchTerm = '',
}: StatusColumnProps) => {
  const { tasks, status, retry } = useTasksByStatus(
    projectId,
    statusConfig.value,
    searchTerm,
  );

  return (
    <div className="flex flex-col gap-3 w-72 shrink-0">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: statusConfig.dot }}
          />
          <span className="text-neutral-high text-[12px] font-bold uppercase tracking-wide">
            {statusConfig.label}
          </span>
          <span className="text-[#64748B] text-[11px] font-bold bg-surface-low rounded-full px-2 py-0.5">
            {tasks.length}
          </span>
        </div>
        <button
          type="button"
          onClick={() => onAddTask(statusConfig.value)}
          className="text-[#64748B] hover:text-neutral-high w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer"
          aria-label={`Add task to ${statusConfig.label}`}
        >
          +
        </button>
      </div>

      <AddNewTaskButton onClick={() => onAddTask(statusConfig.value)} />

      {status === 'loading' && (
        <div className="flex flex-col gap-3">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="animate-pulse h-20 rounded-lg bg-surface-low"
            />
          ))}
        </div>
      )}

      {status === 'error' && (
        <div className="flex flex-col items-center gap-2 rounded-lg bg-surface-low p-4">
          <p className="text-error text-[12px] font-medium">Failed to load</p>
          <button
            onClick={retry}
            className="text-primary text-[12px] font-semibold underline"
          >
            Retry
          </button>
        </div>
      )}

      {status === 'success' && (
        <div className="flex flex-col gap-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={() => onTaskClick(task.id)}
            />
          ))}
          {tasks.length === 0 && (
            <div className="text-center py-4 text-[#64748B] text-[12px]">
              {searchTerm ? 'No matching tasks' : 'No tasks'}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StatusColumn;
