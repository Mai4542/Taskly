import { getInitials } from '../../../utils/avatar';
import StatusBadge from './StatusBadge';
import type { TaskListItem } from '../../../services/tasks.service';

interface ListViewRowProps {
  task: TaskListItem;
}

const formatDueDate = (date: string | null) => {
  if (!date) return '-';
  return new Date(date)
    .toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
    .replace(',', '');
};

const ListViewRow = ({ task }: ListViewRowProps) => {
  return (
    <tr className="border-b border-surface-low last:border-b-0 hover:bg-[#F8FAFF]">
      <td className="px-4 py-3 text-[#003D9B] text-[13px] font-[600]">
        {task.task_id}
      </td>
      <td className="px-4 py-3 text-neutral-high text-[14px] font-[500]">
        {task.title}
      </td>
      <td className="px-4 py-3">
        <StatusBadge status={task.status} />
      </td>
      <td className="px-4 py-3 text-[#434654] text-[14px]">
        {formatDueDate(task.due_date)}
      </td>
      <td className="px-4 py-3">
        {task.assignee ? (
          <div className="flex items-center gap-2">
            {task.assignee.avatar_url ? (
              <img
                src={task.assignee.avatar_url}
                alt={task.assignee.name}
                className="h-6 w-6 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E0E8FF] text-[10px] font-[700] text-[#041B3C] p-4 ">
                {getInitials(task.assignee.name) || 'NA'}
              </div>
            )}
            <span className="text-[13px] text-neutral-high">
              {task.assignee.name || 'Not Assigned'}
            </span>
          </div>
        ) : (
          <span className="text-[13px] text-neutral-medium">Unassigned</span>
        )}
      </td>
    </tr>
  );
};

export default ListViewRow;
