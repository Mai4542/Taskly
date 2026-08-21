import { getInitials } from '../../../utils/avatar';
import StatusBadge from './StatusBadge';
import type { TaskListItem } from '../../../services/tasks.service';

const formatDueDate = (date: string | null) => {
  if (!date) return '-';
  return new Date(date).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const TaskListCard = ({
  task,
  onClick,
}: {
  task: TaskListItem;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className="rounded-lg border border-surface-low bg-white p-4 flex flex-col gap-3"
    >
      <div className="flex items-start justify-between">
        <span className="text-[#43465480]/70 text-[11px] font-[700]">
          {task.task_id}
        </span>
        <StatusBadge status={task.status} />
      </div>

      <p className="text-neutral-high text-[18px] font-[500] leading-[24.75px]">
        {task.title}
      </p>

      <div className="flex items-center gap-2">
        {task.assignee?.avatar_url ? (
          <img
            src={task.assignee.avatar_url}
            alt={task.assignee.name}
            className="h-7 w-7 rounded-full object-cover shrink-0"
          />
        ) : (
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#DAE2FF] text-[10px] font-[700] text-[#001848] shrink-0">
            {getInitials(task.assignee?.name) || 'NA'}
          </div>
        )}
        <div className="flex flex-col leading-tight">
          <span className="text-[10px] text-[#434654B2] uppercase font-[700] tracking-wide">
            DUE DATE
          </span>
          <span className="text-[12px] font-[600] text-neutral-high">
            {formatDueDate(task.due_date)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskListCard;
