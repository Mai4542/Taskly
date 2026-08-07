import { useEffect } from 'react';
import exit from '../../../assets/imgs/exit.svg';
import link from '../../../assets/imgs/link.svg';
import epicIcon from '../../../assets/imgs/epicIcon.svg';
import calendar from '../../../assets/imgs/calender.svg';
import addblue from '../../../assets/imgs/addblue.svg';
import { getInitials } from '../../../utils/avatar';
import list from '../../../assets/imgs/list.svg';
import Select from 'react-select';
import { components } from 'react-select';
import add from '../../../assets/imgs/plussimple.svg';
import { useEpicDetails } from '../../../hooks/useEpicDetails';
import userIcon from '../../../assets/imgs/notAssigned.svg';

interface EpicDetailsPopupProps {
  projectId: string;
  epicId: string;
  onClose: () => void;
}

const customStyles = {
  control: (provided: React.CSSProperties, state: undefined) => ({
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
  indicatorSeparator: (provided: React.CSSProperties) => ({
    ...provided,
    display: 'none',
  }),
  menu: (provided: React.CSSProperties) => ({
    ...provided,
    width: '100%',
  }),
};

const EpicDetailsPopup = ({
  projectId,
  epicId,
  onClose,
}: EpicDetailsPopupProps) => {
  const { epic, loading, error, fetchEpicDetails, resetEpicDetails } =
    useEpicDetails();

  useEffect(() => {
    if (projectId && epicId) {
      fetchEpicDetails(projectId, epicId);
    }

    return () => {
      resetEpicDetails();
    };
  }, [projectId, epicId]);

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
  };

  const CustomPlaceholder = (props: any) => {
    const assignee = epic?.assignee;

    return (
      <components.Placeholder {...props}>
        <div className="flex flex-row items-center gap-2">
          {assignee?.name ? (
            <div className="flex h-6 w-6 items-center justify-center rounded-full title-md bg-[#CDDDFF] font-[700] text-[11px] font-bold text-[#51617E] shrink-0">
              {getInitials(assignee.name)}
            </div>
          ) : (
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F1F3FF] shrink-0">
              <img src={userIcon} alt="User" className="w-3.5 h-3.5" />
            </div>
          )}
          <p className="text-[#041B3C] text-[13px] font-[700] truncate">
            {assignee?.name || 'Unassigned'}
          </p>
        </div>
      </components.Placeholder>
    );
  };

  const CustomPlaceholder2 = (props: any) => {
    const deadline = epic?.deadline;

    return (
      <components.Placeholder {...props}>
        <div className="flex flex-row items-center gap-2">
          <div className="flex items-center justify-center shrink-0">
            <img src={calendar} alt="Calendar" className="w-3.5 h-3.5" />
          </div>
          <p className="text-[#041B3C] text-[14px] font-[500] truncate">
            {deadline ? formatDate(deadline) : 'No deadline'}
          </p>
        </div>
      </components.Placeholder>
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

        <div className="mt-3 md:mt-4 border border-[#D7E2FF] p-2 md:p-3 rounded-lg text-[15px] md:text-[20px] font-[700] text-[#041B3C] break-words">
          {epic.title}
        </div>

        <p className="md:hidden mt-4 text-[#041B3C66]/60 text-[10px] font-[700]">
          DESCRIPTION
        </p>

        <div className="mt-2 md:mt-6 border border-[#D7E2FF] rounded-lg p-3 md:p-4 min-h-20 md:min-h-24 max-h-32 md:max-h-40 overflow-y-auto">
          <p className="text-neutral-high text-[13px] md:text-[16px] font-[400] whitespace-pre-wrap break-words">
            {epic.description || 'No description provided'}
          </p>
        </div>

        <div className="hidden md:block">
          <div className="flex flex-row items-center justify-between mt-8 gap-6">
            <div className="flex flex-col items-start gap-2 min-w-0">
              <p className="text-[#041B3C66]/60 text-[10px] font-[700]">
                CREATED BY
              </p>
              <div className="flex flex-row items-center gap-2 min-w-0">
                <div className="flex h-7 w-7 items-center justify-center rounded-xl title-md bg-[#0052CC] font-[700] text-[11px] font-bold text-white shrink-0">
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
              <div className="w-full">
                <Select
                  styles={customStyles}
                  components={{ Placeholder: CustomPlaceholder }}
                  className="rounded-lg border border-[#D7E2FF]"
                />
              </div>
            </div>

            <div className="flex flex-col items-start gap-2 min-w-0 w-46.5">
              <p className="text-[#041B3C66]/60 text-[10px] font-[700]">
                DEADLINE
              </p>
              <div className="w-full">
                <Select
                  styles={customStyles}
                  components={{ Placeholder: CustomPlaceholder2 }}
                  className="rounded-lg border border-[#D7E2FF]"
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
              <div className="flex h-6 w-6 items-center justify-center rounded-xl title-md bg-[#0052CC] font-[700] text-[10px] font-bold text-white shrink-0">
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
            <div className="w-full">
              <Select
                styles={customStyles}
                components={{ Placeholder: CustomPlaceholder }}
                className="rounded-lg border border-[#D7E2FF]"
              />
            </div>
          </div>

          <div className="flex flex-col items-start gap-1.5 min-w-0">
            <p className="text-[#041B3C66]/60 text-[10px] font-[700]">
              DEADLINE
            </p>
            <div className="w-full">
              <Select
                styles={customStyles}
                components={{ Placeholder: CustomPlaceholder2 }}
                className="rounded-lg border border-[#D7E2FF]"
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
            <div className="flex flex-row items-center gap-2">
              <span className="text-neutral-high text-[15px] md:text-[18px] font-[600]">
                Tasks
              </span>
              <span className="absolute right-5 md:hidden text-[#434654] text-[11px] font-[600] bg-[#E0E8FF] rounded-full px-2 py-0.5">
                0 tasks
              </span>
            </div>
            <button className="hidden md:flex px-3 py-2 flex-row items-center gap-2 rounded-full hover:bg-gray-100 cursor-pointer">
              <img src={addblue} alt="add" className="w-4 h-4" />
              <p className="body-md text-[#003D9B] font-[600]">Add Task</p>
            </button>
          </div>

          <div className="flex flex-col gap-3 md:gap-4 items-center rounded-sm justify-center bg-[#F1F3FF] border-2 md:border-3 border-dashed border-[#C3C6D64D]/70 min-h-40 md:h-62 p-4">
            <div className="flex flex-col bg-[#D7E2FF] rounded-lg items-center justify-center gap-2 w-10 h-10 md:w-12 md:h-12">
              <img
                src={list}
                alt="List"
                className="w-4 h-4 md:w-4.5 md:h-4.5"
              />
            </div>
            <p className="text-neutral-high text-[13px] md:text-[16px] font-[500] text-center px-2">
              No tasks have been added to this epic yet
            </p>
            <button
              type="button"
              className="btn-primary inline-flex items-center gap-2 shrink-0 px-4 py-2 w-30 lg:w-35"
            >
              <img src={add} alt="add" />
              Add Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpicDetailsPopup;
