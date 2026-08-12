import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import exit from '../../../assets/imgs/exit.svg';
import link from '../../../assets/imgs/link.svg';
import epicIcon from '../../../assets/imgs/epicIcon.svg';
import calendar from '../../../assets/imgs/calender.svg';
import { getInitials } from '../../../utils/avatar';
import Select, { type SingleValue } from 'react-select';
import { components } from 'react-select';
import type { CSSObjectWithLabel } from 'react-select';
import { useEpicDetails } from '../../../hooks/useEpicDetails';
import { useProjectMembers } from '../../../hooks/useProjectMembers';
import type { ProjectMember } from '../../../services/members.service';
import type { Epic, EpicUser } from '../../../services/epics.service';
import userIcon from '../../../assets/imgs/notAssigned.svg';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../../../constants/router';
import EpicTaskList from './EpicTaskList';
import { useEpicTasks } from '../../../hooks/useEpicTasks';

interface EpicDetailsPopupProps {
  projectId: string;
  epicId: string;
  onClose: () => void;
  onUpdated?: (epic: Epic) => void;
}

interface AssigneeOption {
  value: string | null;
  label: string;
  avatar_url?: string | null;
}

const customStyles = {
  control: (provided: CSSObjectWithLabel) => ({
    ...provided,
    border: '1px solid #D7E2FF',
    borderRadius: '0.5rem',
    width: '100%',
    minWidth: '120px',
    boxShadow: 'none',
    '&:hover': {
      border: '1px solid #D7E2FF',
    },
  }),
  indicatorSeparator: (provided: CSSObjectWithLabel) => ({
    ...provided,
    display: 'none',
  }),
  dropdownIndicator: (provided: CSSObjectWithLabel) => ({
    ...provided,
    color: '#6B7280',
    padding: '8px',
    cursor: 'pointer',
  }),
  menu: (provided: CSSObjectWithLabel) => ({
    ...provided,
    width: '100%',
    zIndex: 20,
  }),
};

const EpicDetailsPopup = ({
  projectId,
  epicId,
  onClose,
  onUpdated,
}: EpicDetailsPopupProps) => {
  const {
    epic,
    loading,
    error,
    fetchEpicDetails,
    resetEpicDetails,
    updateEpic,
  } = useEpicDetails();
  const { members, status: membersStatus } = useProjectMembers(projectId);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isEditingAssignee, setIsEditingAssignee] = useState(false);
  const {
    tasks,
    status: tasksStatus,
    retry: retryTasks,
  } = useEpicTasks(epicId, projectId);
  useEffect(() => {
    if (projectId && epicId) {
      fetchEpicDetails(projectId, epicId);
    }
    return () => {
      resetEpicDetails();
    };
  }, [projectId, epicId]);

  useEffect(() => {
    if (epic) {
      setTitle(epic.title || '');
      setDescription(epic.description || '');
    }
  }, [epic]);

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const toInputDate = (dateString: string | null | undefined) => {
    if (!dateString) return '';
    return new Date(dateString).toISOString().split('T')[0];
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
  };

  const handleAddTask = () => {
    navigate(APP_ROUTES.dashboard.createTask(projectId), {
      state: { epicId },
    });
  };

  const handleTitleBlur = async () => {
    const trimmed = title.trim();
    if (!epic) return;

    if (!trimmed) {
      setTitle(epic.title);
      toast.error('Title cannot be empty.');
      return;
    }
    if (trimmed === epic.title) return;

    const updated = await updateEpic({ title: trimmed });
    if (updated) onUpdated?.(updated);
  };

  const handleDescriptionBlur = async () => {
    if (!epic) return;
    const trimmed = description.trim();
    if (trimmed === (epic.description || '')) return;

    const updated = await updateEpic({ description: trimmed || null });
    if (updated) onUpdated?.(updated);
  };

  const handleAssigneeChange = async (option: SingleValue<AssigneeOption>) => {
    if (!epic) return;
    setIsEditingAssignee(false);

    const newAssigneeId = option?.value ?? null;
    if (newAssigneeId === (epic.assignee?.sub ?? null)) return;

    const optimisticAssignee: EpicUser | null = option?.value
      ? { sub: option.value, name: option.label, email: '', department: '' }
      : null;

    const updated = await updateEpic(
      { assignee_id: newAssigneeId },
      { assignee: optimisticAssignee || undefined },
    );
    if (updated) onUpdated?.(updated);
  };

  const handleDeadlineChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!epic) return;
    const newDeadline = e.target.value || null;
    if (newDeadline === epic.deadline) return;

    const updated = await updateEpic({ deadline: newDeadline });
    if (updated) onUpdated?.(updated);
  };

  const assigneeOptions: AssigneeOption[] = [
    { value: null, label: 'Unassigned' },
    ...members.map((m: ProjectMember) => ({
      value: m.id,
      label: m.name,
      avatar_url: m.avatar_url,
    })),
  ];

  const AssigneeOptionLabel = (props: any) => {
    const { data } = props;
    return (
      <components.Option {...props}>
        <div className="flex flex-row items-center gap-2">
          {data.value === null ? (
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F1F3FF] shrink-0">
              <img src={userIcon} alt="User" className="w-3.5 h-3.5" />
            </div>
          ) : data.avatar_url ? (
            <img
              src={data.avatar_url}
              alt={data.label}
              className="h-6 w-6 rounded-full object-cover shrink-0"
            />
          ) : (
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#CDDDFF] font-[700] text-[11px] text-[#51617E] shrink-0">
              {getInitials(data.label)}
            </div>
          )}
          <span className="truncate">{data.label}</span>
        </div>
      </components.Option>
    );
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#041B3C33] bg-opacity-20 w-full h-full p-4 overflow-y-auto">
        <div className="relative w-full max-w-[95%] sm:max-w-[420px] md:max-w-[85%] lg:max-w-[70%] xl:max-w-[900px] max-h-[85vh] rounded-lg bg-white p-4 md:p-6 shadow-lg flex items-center justify-center">
          <p className="text-neutral-high text-[16px]">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#041B3C33] bg-opacity-20 w-full h-full p-4 overflow-y-auto">
        <div className="relative w-full max-w-[95%] sm:max-w-[420px] md:max-w-[85%] lg:max-w-[70%] xl:max-w-[900px] max-h-[85vh] rounded-lg bg-white p-4 md:p-6 shadow-lg flex flex-col items-center justify-center gap-4">
          <p className="text-red-500 text-[16px] text-center">{error}</p>
          <button
            onClick={() => fetchEpicDetails(projectId, epicId)}
            className="btn-primary px-4 py-2"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!epic) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#041B3C33] bg-opacity-20 w-full h-full p-2 sm:p-4 md:p-8 overflow-y-auto">
      <div
        className="relative w-full max-w-[95%] sm:max-w-[420px] md:max-w-[85%] lg:max-w-[70%] xl:max-w-[900px]
        max-h-[92vh] rounded-lg bg-white p-3 sm:p-4 md:p-6 shadow-lg overflow-y-auto"
      >
        <div className="flex w-full justify-between items-center gap-2">
          <div className="flex flex-row items-center gap-2 min-w-0">
            <img
              src={epicIcon}
              alt="Epic Icon"
              className="w-5 h-3.5 shrink-0"
            />
            <p className="text-[#041B3C99]/60 text-[11px] md:text-[12px] font-[700] truncate">
              {epic.epic_id || 'EPIC-101'}
            </p>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={handleCopyLink}
              className="p-1.5 md:px-3 md:py-2 flex flex-row items-center gap-1.5 md:gap-2 rounded-full hover:bg-gray-100 cursor-pointer"
            >
              <img
                src={link}
                alt="link"
                className="w-3.5 h-3.5 md:w-4 md:h-4"
              />
              <p className="text-[11px] md:text-[14px] text-[#434654] font-[500]">
                Copy link
              </p>
            </button>

            <button
              className="p-1.5 md:p-2 rounded-full hover:bg-gray-200 cursor-pointer flex items-center justify-center"
              onClick={onClose}
              aria-label="Close"
            >
              <img
                src={exit}
                alt="exit"
                className="w-3 h-3 md:w-3.5 md:h-3.5"
              />
            </button>
          </div>
        </div>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleTitleBlur}
          className="mt-3 md:mt-4 w-full border border-[#D7E2FF] p-2 md:p-3 rounded-lg text-[15px] md:text-[20px] font-[700] text-[#041B3C] outline-none focus:border-[#0052CC]"
          placeholder="Epic title"
        />

        <p className="md:hidden mt-4 text-[#041B3C66]/60 text-[10px] font-[700]">
          DESCRIPTION
        </p>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={handleDescriptionBlur}
          placeholder="No description provided"
          className="mt-2 md:mt-6 w-full border border-[#D7E2FF] rounded-lg p-3 md:p-4 min-h-20 md:min-h-24 max-h-32 md:max-h-40 overflow-y-auto text-neutral-high text-[13px] md:text-[16px] font-[400] outline-none focus:border-[#0052CC] resize-none"
        />

        <div className="hidden md:block">
          <div className="flex flex-row items-center justify-between mt-8 gap-6">
            <div className="flex flex-col items-start gap-2 min-w-0">
              <p className="text-[#041B3C66]/60 text-[10px] font-[700]">
                CREATED BY
              </p>
              <div className="flex flex-row items-center gap-2 min-w-0">
                <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#0052CC] font-[700] text-[11px] text-white shrink-0">
                  {getInitials(epic.created_by?.name || 'Unknown')}
                </div>
                <p className="text-neutral-high text-[14px] font-[500] truncate">
                  {epic.created_by?.name || 'Unknown'}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-2 min-w-0 w-46.5">
              <p className="text-[#041B3C66]/60 text-[10px] font-[700]">
                ASSIGNEE
              </p>
              {isEditingAssignee ? (
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
                  defaultValue={
                    epic.assignee
                      ? { value: epic.assignee.sub, label: epic.assignee.name }
                      : { value: null, label: 'Unassigned' }
                  }
                  onChange={handleAssigneeChange}
                  onBlur={() => setIsEditingAssignee(false)}
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
                  onClick={() => setIsEditingAssignee(true)}
                  className="w-full flex flex-row items-center gap-2 border border-[#D7E2FF] rounded-lg px-3 py-2 hover:bg-gray-50"
                >
                  {epic.assignee?.name ? (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#CDDDFF] font-[700] text-[11px] text-[#51617E] shrink-0">
                      {getInitials(epic.assignee.name)}
                    </div>
                  ) : (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F1F3FF] shrink-0">
                      <img src={userIcon} alt="User" className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <p className="text-[#041B3C] text-[13px] font-[700] truncate">
                    {epic.assignee?.name || 'Unassigned'}
                  </p>
                </button>
              )}
            </div>

            <div className="flex flex-col items-start gap-2 min-w-0 w-46.5">
              <p className="text-[#041B3C66]/60 text-[10px] font-[700]">
                DEADLINE
              </p>
              <div className="w-full flex flex-row items-center gap-2 border border-[#D7E2FF] rounded-lg px-3 py-2 ">
                <img
                  src={calendar}
                  alt="Calendar"
                  className="w-3.5 h-3.5 shrink-0"
                />
                <input
                  type="date"
                  value={toInputDate(epic.deadline)}
                  onChange={handleDeadlineChange}
                  className="w-full text-[14px] font-[500] text-[#041B3C] outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-2 mt-6">
            <p className="text-[#041B3C66]/60 text-[10px] font-[700]">
              CREATED AT
            </p>
            <div className="flex flex-row items-center gap-2">
              <img src={calendar} alt="Calendar" className="w-3.5 h-3.5" />
              <p className="text-[#041B3C] text-[14px] font-[500]">
                {formatDate(epic.created_at)}
              </p>
            </div>
          </div>
        </div>

        <div className="md:hidden grid grid-cols-2 gap-x-3 gap-y-4 mt-5">
          <div className="flex flex-col items-start gap-1.5 min-w-0">
            <p className="text-[#041B3C66]/60 text-[10px] font-[700]">
              CREATED BY
            </p>
            <div className="flex flex-row items-center gap-2 min-w-0">
              <div className="flex h-6 w-6 items-center justify-center rounded-xl bg-[#0052CC] font-[700] text-[10px] text-white shrink-0">
                {getInitials(epic.created_by?.name || 'Unknown')}
              </div>
              <p className="text-neutral-high text-[13px] font-[500] truncate">
                {epic.created_by?.name || 'Unknown'}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start gap-1.5 min-w-0">
            <p className="text-[#041B3C66]/60 text-[10px] font-[700]">
              ASSIGNEE
            </p>
            {isEditingAssignee ? (
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
                defaultValue={
                  epic.assignee
                    ? { value: epic.assignee.sub, label: epic.assignee.name }
                    : { value: null, label: 'Unassigned' }
                }
                onChange={handleAssigneeChange}
                onBlur={() => setIsEditingAssignee(false)}
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
                onClick={() => setIsEditingAssignee(true)}
                className="w-full flex flex-row items-center gap-2 border border-[#D7E2FF] rounded-lg px-2 py-1.5 hover:bg-gray-50"
              >
                {epic.assignee?.name ? (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#CDDDFF] font-[700] text-[10px] text-[#51617E] shrink-0">
                    {getInitials(epic.assignee.name)}
                  </div>
                ) : (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F1F3FF] shrink-0">
                    <img src={userIcon} alt="User" className="w-3 h-3" />
                  </div>
                )}
                <p className="text-[#041B3C] text-[12px] font-[700] truncate">
                  {epic.assignee?.name || 'Unassigned'}
                </p>
              </button>
            )}
          </div>

          <div className="flex flex-col items-start gap-1.5 min-w-0">
            <p className="text-[#041B3C66]/60 text-[10px] font-[700]">
              DEADLINE
            </p>
            <div className="w-full flex flex-row items-center gap-1.5 border border-[#D7E2FF] rounded-lg px-2 py-1.5">
              <img
                src={calendar}
                alt="Calendar"
                className="w-3.5 h-3.5 shrink-0"
              />
              <input
                type="date"
                value={toInputDate(epic.deadline)}
                onChange={handleDeadlineChange}
                className="w-full text-[12px] font-[500] text-[#041B3C] outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col items-start gap-1.5 min-w-0">
            <p className="text-[#041B3C66]/60 text-[10px] font-[700]">
              CREATED AT
            </p>
            <div className="flex flex-row items-center gap-2">
              <img src={calendar} alt="Calendar" className="w-3.5 h-3.5" />
              <p className="text-[#041B3C] text-[13px] font-[500]">
                {formatDate(epic.created_at)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 md:gap-6 mt-6 md:mt-8">
          <div className="flex flex-row justify-between items-center">
            <span className="text-neutral-high text-[15px] md:text-[18px] font-[600]">
              Tasks
            </span>

            <button
              onClick={handleAddTask}
              className="hidden md:flex flex-row items-center gap-1.5 text-[#003D9B] text-[14px] font-[600] hover:underline cursor-pointer"
            >
              <span className="text-base leading-none">+</span> Add Task
            </button>

            <span className="md:hidden text-[#003D9B] text-[11px] font-[700] bg-[#F1F3FF] rounded-full px-3 py-1 uppercase">
              {tasks.length} {tasks.length === 1 ? 'Task' : 'Tasks'}
            </span>
          </div>

          <EpicTaskList
            tasks={tasks}
            status={tasksStatus}
            retry={retryTasks}
            onAddTask={handleAddTask}
          />
        </div>
      </div>
    </div>
  );
};

export default EpicDetailsPopup;
