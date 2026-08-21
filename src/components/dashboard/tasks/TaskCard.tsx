import { getInitials } from '../../../utils/avatar';
import calendar from '../../../assets/imgs/coloredcalendar.svg';
import type { TaskListItem } from '../../../services/tasks.service';
import errorIcon from '../../../assets/imgs/errorsIcon.svg';

interface TaskCardProps {
  task: TaskListItem;
  onClick?: () => void;
}

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const getDueMeta = (task: TaskListItem) => {
  if (!task.due_date) return null;

  const due = new Date(task.due_date);
  const today = new Date();

  if (isSameDay(due, today)) {
    return { label: 'TODAY', variant: 'today' as const };
  }

  if (due < today && task.status !== 'DONE') {
    return { label: 'DELAYED', variant: 'delayed' as const };
  }

  const formatted = due.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  return { label: formatted.toUpperCase(), variant: 'normal' as const };
};

const TaskCard = ({ task, onClick }: TaskCardProps) => {
  const dueMeta = getDueMeta(task);
  const isBlockedOrDelayed = dueMeta?.variant === 'delayed';
  const isToday = dueMeta?.variant === 'today';

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-lg p-4 flex flex-col gap-3 h-27 ${
        isBlockedOrDelayed
          ? 'bg-[#FFDAD633] border border-[#BA1A1A1A]'
          : isToday
            ? 'bg-white border border-transparent border-l-4 border-l-[#003D9B]'
            : 'border-surface-low bg-white'
      }`}
    >
      <p className="text-neutral-high text-[14px] font-[600] leading-snug">
        {task.title}
      </p>

      <div className="flex flex-row items-center justify-between">
        {dueMeta ? (
          dueMeta.variant === 'delayed' ? (
            <div className="flex flex-row items-center mt-4 gap-1 ">
              <img src={errorIcon} alt="error icon" />
              <span className="text-[#DC2626] text-[11px] font-[700] uppercase">
                Delayed
              </span>
            </div>
          ) : dueMeta.variant === 'today' ? (
            <div className="flex flex-row items-center mt-4 gap-2">
              <img src={calendar} alt="Calendar" className="w-3.5 h-3.5" />
              <span className="text-[#003D9B] text-[11px] font-[700] uppercase">
                Today
              </span>
            </div>
          ) : (
            <div className="flex flex-row items-center mt-4 gap-2">
              <img src={calendar} alt="Calendar" className="w-3.5 h-3.5" />
              <span className="text-neutral-medium text-[11px] font-[600] uppercase">
                {dueMeta.label}
              </span>
            </div>
          )
        ) : (
          <span />
        )}

        {task.assignee?.avatar_url ? (
          <img
            src={task.assignee.avatar_url}
            alt={task.assignee.name}
            className="h-6 w-6 rounded-full object-cover shrink-0"
          />
        ) : task.assignee?.name ? (
          <div className="flex h-7 w-7 items-center justify-center rounded-full mt-3 border-2 border-white bg-[#E0E8FF] font-[700] text-[10px] p text-[#041B3C] shrink-0">
            {getInitials(task.assignee.name)}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TaskCard;
