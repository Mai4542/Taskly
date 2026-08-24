import { getInitials } from '../../../utils/avatar';
import { NotAssigned } from '../../../components/icons/NotAssigned';
import type { TaskDetailsProps } from './TaskDetailsModal';
import { formatDate } from './TaskDetailsUtils';
import { Circlee } from '../../../components/icons/Circlee';
import { ColoredCalendar } from '../../../components/icons/ColoredCalendar';
import { Epic } from '../../../components/icons/Epic';

const TaskDetailsMobile = ({
  task,
  statusStyle,
  onClose,
}: TaskDetailsProps) => {
  return (
    <div
      className="relative w-full max-w-[390px] max-h-[92vh] bg-white/70 backdrop-blur-[10px] rounded-t-3xl border-t border-white/40 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden"
      onClick={(e) => e.stopPropagation()}
      style={{ animation: 'none', transition: 'none' }}
    >
      <div className="flex flex-col items-center px-0 pt-3 pb-2 shrink-0">
        <div className="w-10 h-1 bg-neutral-low/50 rounded-xl mb-2" />
        <div className="flex flex-row justify-between items-center px-6 w-full h-[30px]">
          <span className="label-xs text-neutral-medium uppercase tracking-[1.1px]">
            Task Details
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="cursor-pointer p-2 rounded-xl hover:bg-surface-low"
            style={{ transition: 'none' }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 1L1 13M1 1L13 13"
                stroke="#434654"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pt-2 pb-[118.75px] flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center gap-3 w-full">
            <span className="tag-sm inline-flex items-center px-2 py-0.5 bg-surface-high rounded-xs text-primary shrink-0">
              {task.task_id}
            </span>

            {task.epic && (
              <div className="flex flex-row items-center px-2 py-1 gap-1.5 border border-surface-highest rounded-lg min-w-0">
                <Epic size={11} color="#374763" className="w-3 h-3 shrink-0" />
                <span className="body-name-regular text-neutral-medium-alt truncate text-[12px]">
                  {task.epic.epic_id} ({task.epic.title})
                </span>
              </div>
            )}
          </div>

          <h2 className="text-[24px] leading-[30px] font-semibold text-neutral-high">
            {task.title}
          </h2>

          <div className="flex flex-row gap-2">
            {statusStyle && (
              <div
                className="flex flex-row items-center px-3 py-1 rounded-xl gap-1.5"
                style={{ backgroundColor: statusStyle?.bg }}
              >
                <svg
                  width="11.67"
                  height="11.67"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="6" cy="6" r="5" fill={statusStyle?.text} />
                </svg>
                <span
                  className="label-plain"
                  style={{ color: statusStyle?.text }}
                >
                  {statusStyle?.label}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-[11.5px]">
          <div className="flex flex-col p-4 bg-surface-low rounded-lg gap-1">
            <span className="label-xs text-extra-grey">Assignee</span>
            <div className="flex flex-row items-center gap-2 pt-1">
              <div className="flex w-6 h-6 items-center justify-center rounded-full bg-surface-high">
                {task.assignee?.name ? (
                  task.assignee.avatar_url ? (
                    <img
                      src={task.assignee.avatar_url}
                      alt={task.assignee.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  ) : (
                    <span className="label-plain text-primary">
                      {getInitials(task.assignee.name)}
                    </span>
                  )
                ) : (
                  <NotAssigned
                    size={12}
                    color="#4F5F7B"
                    className="w-3.5 h-3.5"
                  />
                )}
              </div>
              <span className="body-name text-neutral-high truncate">
                {task.assignee?.name || 'Unassigned'}
              </span>
            </div>
          </div>

          <div className="flex flex-col p-4 pb-5 bg-surface-low rounded-lg gap-1">
            <span className="label-xs text-extra-grey">Due Date</span>
            <div className="flex flex-row items-center gap-2 pt-1">
              <ColoredCalendar
                size={14}
                color="#003D9B"
                className="w-[10.5px] h-[11.67px]"
              />
              <span className="body-name-regular text-neutral-high">
                {formatDate(task.due_date)}
              </span>
            </div>
          </div>

          <div className="flex flex-col p-4 bg-surface-low rounded-lg gap-1">
            <span className="label-xs text-extra-grey">Created By</span>
            <div className="flex flex-row items-center gap-2 pt-1">
              <div className="flex w-6 h-6 items-center justify-center rounded-full bg-surface-high">
                <span className="label-plain text-neutral-medium">
                  {getInitials(task.created_by?.name || 'Unknown')}
                </span>
              </div>
              <span className="body-name-regular text-neutral-high truncate">
                {task.created_by?.name || 'Unknown'}
              </span>
            </div>
          </div>

          <div className="flex flex-col p-4 pb-5 bg-surface-low rounded-lg gap-1">
            <span className="label-xs text-extra-grey">Created At</span>
            <div className="flex flex-row items-center gap-2 pt-1">
              <Circlee
                size={11}
                color="#4F5F7B"
                className="w-[10.5px] h-[10.5px]"
              />
              <span className="body-name-regular text-neutral-high">
                {formatDate(task.created_at)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="body-name text-extra-grey uppercase">Description</h3>
          <div className="flex flex-col p-5 bg-white border border-neutral-low/10 rounded-lg shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
            <p className="body-regular text-neutral-medium-alt">
              {task.description || 'No description provided.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsMobile;
