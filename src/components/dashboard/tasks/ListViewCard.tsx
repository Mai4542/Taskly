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

const ListViewCard = ({ task }: { task: TaskListItem }) => {
  return (
    <div className="rounded-lg border border-surface-low bg-white p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <span className="text-[#003D9B] text-[12px] font-[700]">{task.id}</span>
        <StatusBadge status={task.status} />
      </div>

      <p className="text-neutral-high text-[14px] font-[600] leading-snug">
        {task.title}
      </p>

      <div className="flex items-center gap-2">
        {task.assignee?.avatar_url ? (
          <img
            src={task.assignee.avatar_url}
            alt={task.assignee.name}
            className="h-6 w-6 rounded-full object-cover"
          />
        ) : task.assignee?.name ? (
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E0E8FF] text-[10px] font-[700] text-[#041B3C]">
            {getInitials(task.assignee.name)}
          </div>
        ) : (
          <div className="h-6 w-6" />
        )}
        <div className="flex flex-col leading-tight">
          <span className="text-[10px] text-neutral-medium uppercase">
            Due Date
          </span>
          <span className="text-[12px] font-[600] text-neutral-high">
            {formatDueDate(task.due_date)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ListViewCard;
