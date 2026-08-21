import { components } from 'react-select';
import Select from 'react-select';
import { getInitials } from '../../../utils/avatar';
import exit from '../../../assets/imgs/exit.svg';
import link from '../../../assets/imgs/link.svg';
import epicIcon from '../../../assets/imgs/epicIcon.svg';
import calendar from '../../../assets/imgs/calender.svg';
import userIcon from '../../../assets/imgs/notAssigned.svg';
import type { TaskDetailsProps } from './TaskDetailsModal';
import { formatDate, ChevronDown, customStyles } from './TaskDetailsUtils';

const TaskDetailsDesktop = ({
  task,
  statusStyle,
  isViewingAssignees,
  setIsViewingAssignees,
  membersStatus,
  assigneeOptions,
  onClose,
  onCopyLink,
}: TaskDetailsProps) => {
  const AssigneeOptionLabel = (props: any) => {
    const { data } = props;
    return (
      <components.Option {...props}>
        <div className="flex flex-row items-center gap-2">
          {data.avatar_url ? (
            <img
              src={data.avatar_url}
              alt={data.label}
              className="h-6 w-6 rounded-full object-cover shrink-0"
            />
          ) : (
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-surface-high label-plain text-avatar-text shrink-0">
              {getInitials(data.label)}
            </div>
          )}
          <span className="truncate">{data.label}</span>
        </div>
      </components.Option>
    );
  };

  return (
    <div
      className="relative w-full max-w-[95%] sm:max-w-[420px] md:max-w-[85%] lg:max-w-[896px] max-h-[92vh] md:h-[870px] bg-white shadow-2xl rounded-lg flex flex-col md:flex-row overflow-hidden"
      onClick={(e) => e.stopPropagation()}
      style={{ animation: 'none', transition: 'none' }}
    >
      <div className="w-full md:w-[576px] h-full flex flex-col overflow-hidden">
        <div className="flex flex-col items-start px-5 py-4 md:px-8 md:py-6 gap-2 border-b border-border shrink-0">
          <div className="flex flex-row items-center gap-3 w-full">
            <span className="tag-sm inline-flex items-center px-2 py-0.5 bg-surface-high rounded-xs text-primary shrink-0">
              {task.task_id}
            </span>

            {task.epic && (
              <div className="flex flex-row items-center px-2 py-2 gap-1.5 border border-surface-highest rounded-lg min-w-0">
                <img src={epicIcon} alt="Epic" className="w-3 h-3 shrink-0" />
                <span className="body-name-regular text-neutral-medium-alt truncate">
                  {task.epic.epic_id} ({task.epic.title})
                </span>
                <ChevronDown />
              </div>
            )}

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="cursor-pointer ml-auto p-1.5 rounded-full hover:bg-surface-low shrink-0"
            >
              <img src={exit} alt="close" className="w-3 h-3" />
            </button>
          </div>

          <h2 className="title-lg text-neutral-high">{task.title}</h2>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6 md:px-8 md:py-8">
          <div className="flex flex-col gap-3">
            <p className="label-xs text-neutral-medium-alt">Description</p>
            <div className="border border-surface-highest rounded-xl p-3 min-h-[220px] md:min-h-[472px] overflow-y-auto">
              <p className="body-regular text-neutral-high whitespace-pre-wrap">
                {task.description || 'No description provided.'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between items-center px-5 py-4 md:px-8 bg-surface-low shrink-0">
          <button
            type="button"
            onClick={onCopyLink}
            className="cursor-pointer flex flex-row items-center gap-2 px-3 py-1.5 rounded-xs hover:bg-white body-name-regular text-neutral-medium-alt"
          >
            <img src={link} alt="link" className="w-3.5 h-3.5" />
            Copy link
          </button>

          <button
            type="button"
            onClick={onClose}
            className="btn-secondary text-neutral-high bg-surface-highest hover:bg-primary hover:text-white cursor-pointer"
            style={{ transition: 'none' }}
          >
            Close
          </button>
        </div>
      </div>

      <div className="w-full md:w-[320px] h-full bg-surface-low md:border-l border-border p-5 md:p-8 flex flex-col gap-6 overflow-y-auto">
        <div className="flex flex-col gap-4">
          <p className="label-md text-neutral-medium-alt">Status</p>
          <div
            className="flex flex-row justify-between items-center px-4 py-2.5 rounded"
            style={{ backgroundColor: statusStyle?.bg }}
          >
            <span className="label-plain" style={{ color: statusStyle?.text }}>
              {statusStyle?.label}
            </span>
            <span style={{ color: statusStyle?.text }}>
              <ChevronDown />
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <p className="label-md text-neutral-medium-alt">Assignee</p>

            {isViewingAssignees ? (
              <Select
                autoFocus
                defaultMenuIsOpen
                isLoading={membersStatus === 'loading'}
                noOptionsMessage={() =>
                  membersStatus === 'error'
                    ? 'Failed to load members'
                    : 'No members found'
                }
                options={assigneeOptions}
                value={
                  task.assignee
                    ? {
                        value: task.assignee.id,
                        label: task.assignee.name,
                      }
                    : null
                }
                onChange={() => setIsViewingAssignees(false)}
                onBlur={() => setIsViewingAssignees(false)}
                placeholder="View assignees..."
                components={{
                  Option: AssigneeOptionLabel,
                  IndicatorSeparator: () => null,
                  DropdownIndicator: (props) => (
                    <components.DropdownIndicator {...props}>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ display: 'block' }}
                      >
                        <path
                          d="M6 9L12 15L18 9"
                          stroke="#6B7280"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </components.DropdownIndicator>
                  ),
                }}
                styles={customStyles}
                className="w-full"
              />
            ) : (
              <button
                type="button"
                onClick={() => setIsViewingAssignees(true)}
                className="cursor-pointer flex flex-row justify-between items-center p-2 bg-white border border-surface-highest rounded-lg h-10 hover:bg-surface-low"
                style={{ transition: 'none' }}
              >
                <div className="flex flex-row items-center gap-2 min-w-0">
                  {task.assignee?.name ? (
                    task.assignee.avatar_url ? (
                      <img
                        src={task.assignee.avatar_url}
                        alt={task.assignee.name}
                        className="h-6 w-6 rounded-full object-cover shrink-0"
                      />
                    ) : (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-surface-high label-plain text-avatar-text shrink-0">
                        {getInitials(task.assignee.name)}
                      </div>
                    )
                  ) : (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-surface-low shrink-0">
                      <img src={userIcon} alt="User" className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <span className="body-name text-neutral-high truncate">
                    {task.assignee?.name || 'Unassigned'}
                  </span>
                </div>
                <span className="text-neutral-medium">
                  <ChevronDown />
                </span>
              </button>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <p className="label-md text-neutral-medium-alt">Reporter</p>
            <div className="flex flex-row items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-reporter-bg label-plain text-reporter-text shrink-0">
                {getInitials(task.created_by?.name || 'Unknown')}
              </div>
              <span className="body-name-regular text-neutral-high truncate">
                {task.created_by?.name || 'Unknown'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-4 border-t border-neutral-low/20">
          <div className="flex flex-col gap-3">
            <p className="label-plain text-neutral-medium-alt">Due Date</p>
            <div className="flex flex-row justify-between items-center p-2 bg-white border border-surface-highest rounded-lg h-10">
              <div className="flex flex-row items-center gap-2 min-w-0">
                <img
                  src={calendar}
                  alt="Calendar"
                  className="w-3.5 h-3.5 shrink-0"
                />
                <span className="body-name-regular text-neutral-high">
                  {formatDate(task.due_date)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-between items-center">
            <p className="label-plain text-neutral-medium-alt">Created At</p>
            <span className="body-name-regular text-neutral-high">
              {formatDate(task.created_at)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsDesktop;
