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
}

const StatusColumn = ({
  projectId,
  statusConfig,
  onAddTask,
  onTaskClick,
}: StatusColumnProps) => {
  const { tasks, status, retry } = useTasksByStatus(
    projectId,
    statusConfig.value,
  );

  return (
    <div className="flex flex-col gap-3 w-72 shrink-0">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: statusConfig.dot }}
          />
          <span className="text-neutral-high text-[12px] font-[700] uppercase tracking-wide">
            {statusConfig.label}
          </span>
          <span className="text-[#64748B] text-[11px] font-[700] bg-[#F1F3FF] rounded-full px-2 py-0.5">
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
              className="animate-pulse h-20 rounded-lg bg-[#F1F3FF]"
            />
          ))}
        </div>
      )}

      {status === 'error' && (
        <div className="flex flex-col items-center gap-2 rounded-lg bg-[#F1F3FF] p-4">
          <p className="text-error text-[12px] font-[500]">Failed to load</p>
          <button
            onClick={retry}
            className="text-[#003D9B] text-[12px] font-[600] underline"
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
        </div>
      )}
    </div>
  );
};

export default StatusColumn;
