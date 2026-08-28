import { useEffect } from 'react';
import { useDroppable } from '@dnd-kit/react';
import { useTasksByStatus } from '../../../hooks/useTasksByStatus';
import TaskCard from './TaskCard';
import type { STATUS_COLUMNS } from '../../../constants/taskStatus';
import type { TaskListItem } from '../../../services/tasks.service';
import AddNewTaskButton from '../../common/AddNewTaskButton';

type StatusConfig = (typeof STATUS_COLUMNS)[number];

// Exposed to BoardView so it can move a task between columns' local
// state without each column knowing about the others.
export interface ColumnApi {
  addTaskLocally: (task: TaskListItem) => void;
  removeTaskLocally: (taskId: string) => TaskListItem | undefined;
}

interface StatusColumnProps {
  projectId: string;
  statusConfig: StatusConfig;
  onAddTask: (status: string) => void;
  onTaskClick: (taskId: string) => void;
  searchTerm?: string;
  registerColumnApi?: (status: string, api: ColumnApi | null) => void;
}

const StatusColumn = ({
  projectId,
  statusConfig,
  onAddTask,
  onTaskClick,
  searchTerm = '',
  registerColumnApi,
}: StatusColumnProps) => {
  const { tasks, status, retry, addTaskLocally, removeTaskLocally } =
    useTasksByStatus(projectId, statusConfig.value, searchTerm);

  const { ref: dropRef, isDropTarget } = useDroppable({
    id: statusConfig.value,
  });

  useEffect(() => {
    registerColumnApi?.(statusConfig.value, {
      addTaskLocally,
      removeTaskLocally,
    });
    return () => registerColumnApi?.(statusConfig.value, null);
  }, [
    registerColumnApi,
    statusConfig.value,
    addTaskLocally,
    removeTaskLocally,
  ]);

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
        <div
          ref={dropRef}
          className={`flex flex-col gap-3 rounded-lg transition-colors ${
            isDropTarget
              ? 'bg-[#E0E8FF66] outline-2 outline-dashed outline-[#003D9B]'
              : ''
          }`}
        >
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              status={statusConfig.value}
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
