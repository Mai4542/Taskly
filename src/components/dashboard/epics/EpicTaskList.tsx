import { useEpicTasks } from '../../../hooks/useEpicTasks';
import { getInitials } from '../../../utils/avatar';

interface EpicTaskListProps {
  epicId: string;
}

const formatDueDate = (dateString: string | null) => {
  if (!dateString) return '—';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const EpicTaskList = ({ epicId }: EpicTaskListProps) => {
  const { tasks, status, retry } = useEpicTasks(epicId);

  if (status === 'loading') {
    return (
      <div className="flex flex-col gap-3 mt-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse h-16 rounded-lg bg-[#F1F3FF]" />
        ))}
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex flex-col items-center justify-center gap-3 min-h-40 md:h-62 bg-[#F1F3FF] rounded-sm p-4">
        <p className="text-error text-[14px] font-[500]">
          Failed to load tasks
        </p>
        <button onClick={retry} className="btn-primary px-4 py-2">
          Retry
        </button>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-40 md:h-62 bg-[#F1F3FF] rounded-sm p-4">
        <p className="text-neutral-medium text-[14px] font-[500]">
          No tasks found for this epic
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-surface-low overflow-hidden">
      {tasks.map((task, index) => (
        <div
          key={task.id}
          className={`flex flex-row items-center justify-between px-4 py-4 ${
            index !== tasks.length - 1 ? 'border-b border-surface-low' : ''
          }`}
        >
          <div className="flex flex-col gap-1.5 min-w-0">
            <p className="text-neutral-high text-[15px] font-[600] truncate">
              {task.title}
            </p>
            <div className="flex flex-row items-center gap-2">
              {task.assignee_avatar ? (
                <img
                  src={task.assignee_avatar}
                  alt={task.assignee_name ?? ''}
                  className="h-5 w-5 rounded-full object-cover shrink-0"
                />
              ) : task.assignee_name ? (
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#CDDDFF] font-[700] text-[10px] text-[#51617E] shrink-0">
                  {getInitials(task.assignee_name)}
                </div>
              ) : null}
              <p className="text-neutral-medium text-[13px] font-[500]">
                {task.assignee_name || 'Unassigned'}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1 shrink-0">
            <p className="text-[#041B3C66]/60 text-[10px] font-[700]">
              DUE DATE
            </p>
            <p className="text-neutral-high text-[13px] font-[500]">
              {formatDueDate(task.due_date)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EpicTaskList;
