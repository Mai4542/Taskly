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
interface EpicDetailsPopupProps {
  projectId: string | undefined;
  epicId: string;
  onClose: () => void;
}

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];
const customStyles = {
  control: (provided: React.CSSProperties, state: undefined) => ({
    ...provided,
    border: '1px solid #D7E2FF',
    borderRadius: '0.5rem',
    width: '46.5',
    boxShadow: 'none',
    '&:hover': {
      border: '1px solid #D7E2FF',
    },
  }),
  indicatorSeparator: (provided: React.CSSProperties) => ({
    ...provided,
    display: 'none',
  }),
};

const CustomPlaceholder = (props) => {
  return (
    <components.Placeholder {...props}>
      <div className="flex flex-row items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-full title-md bg-[#CDDDFF] font-[700] text-[11px] font-bold text-[#51617E]">
          JD
        </div>
        <p className="text-[#041B3C] text-[10px] font-[700]">John Doe</p>
      </div>
    </components.Placeholder>
  );
};
const CustomPlaceholder2 = (props) => {
  return (
    <components.Placeholder {...props}>
      <div className="flex flex-row items-center gap-2">
        <div className="flex items-center justify-center  ">
          <img src={calendar} alt="Calendar" className="w-3.5 h-3.5" />
        </div>
        <p className="text-[#041B3C] text-[14px] font-[500]">Oct 15, 2025</p>
      </div>
    </components.Placeholder>
  );
};

const EpicDetailsPopup = ({
  projectId,
  epicId,
  onClose,
}: EpicDetailsPopupProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#041B3C33] bg-opacity-20 w-full h-full p-8 overflow-y-auto ">
      <div className="relative w-full md:w-[52.5%] h-[80%] rounded-lg bg-white p-6 shadow-lg overflow-y-auto ">
        <div className="flex w-full justify-between items-center">
          <div className="flex flex-row items-center gap-2">
            <img src={epicIcon} alt="Epic Icon" className="w-5 h-3.5" />
            <p className="text-[#041B3C99]/60 text-[12px] font-[700]">
              EPIC-101
            </p>
          </div>

          <div className="flex items-center gap-1">
            <button className="px-3 py-2 flex flex-row items-center gap-2 rounded-full hover:bg-gray-100 cursor-pointer">
              <img src={link} alt="link" />
              <p className="body-md text-[#434654]">Copy link</p>
            </button>

            <button
              className="p-2 rounded-full hover:bg-gray-200 cursor-pointer flex items-center justify-center"
              onClick={onClose}
            >
              <img src={exit} alt="exit" className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <div className="mt-4 mb-16 border border-[#D7E2FF] p-3 rounded-lg  text-[20px] font-[700] text-[#041B3C]">
          Modern Archtitecture and Design
        </div>
        <div className="mt-8 border border-[#D7E2FF] rounded-lg p-4 h-37.5 overflow-y-auto">
          <p className="text-neutral-high text-[16px] font-[400] mb-2">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex sit
            ipsum error inventore eum repudiandae esse magni, ut quaerat
            repellendus.
          </p>
        </div>
        <div className="flex flex-row items-center justify-between mt-8">
          <div className="flex flex-col items-start gap-2">
            <p className="text-[#041B3C66]/60 text-[10px] font-[700] ">
              CREATED BY
            </p>
            <div className="flex flex-row items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-xl title-md bg-[#0052CC] font-[700] text-[11px] font-bold text-white">
                {getInitials('John Doe')}
              </div>
              <p className="text-neutral-high text-[14px] font-[500]">
                John Doe
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2">
            <p className="text-[#041B3C66]/60 text-[10px] font-[700] ">
              ASSIGNEE
            </p>
            <Select
              options={options}
              styles={customStyles}
              components={{
                Placeholder: CustomPlaceholder,
              }}
              className="w-46.5 rounded-lg border border-[#D7E2FF]"
            />
          </div>
          <div className="flex flex-col items-start gap-2">
            <p className="text-[#041B3C66]/60 text-[10px] font-[700] ">
              DEADLINE
            </p>
            <Select
              options={options}
              styles={customStyles}
              components={{
                Placeholder: CustomPlaceholder2,
              }}
              className="w-46.5 rounded-lg border border-[#D7E2FF]"
            />
          </div>
        </div>
        <div className="flex flex-col items-start gap-2 mt-6">
          <p className="text-[#041B3C66]/60 text-[10px] font-[700] ">
            CREATED BY
          </p>
          <div className="flex flex-row items-center gap-2">
            <div className="flex flex-row items-center gap-2">
              <div className="flex items-center justify-center  ">
                <img src={calendar} alt="Calendar" className="w-3.5 h-3.5" />
              </div>
              <p className="text-[#041B3C] text-[14px] font-[500]">
                Oct 15, 2025
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col  gap-6 mt-8">
          <div className="flex flex-row justify-between items-center ">
            <div className="text-neutral-high text-[18px] font-[600]">
              Tasks
            </div>
            <button className="px-3 py-2 flex flex-row items-center gap-2 rounded-full hover:bg-gray-100 cursor-pointer">
              <img src={addblue} alt="add" />
              <p className="body-md text-[#003D9B] font-[600]">Add Task</p>
            </button>
          </div>
          <div className="flex flex-col gap-4 items-center justify-center bg-[#F1F3FF] border-dashed  border-[#C3C6D64D] h-62">
            <div className="flex flex-col bg-[#D7E2FF] rounded-lg items-center justify-center gap-2 w-12 h-12">
              <img src={list} alt="List" className="w-4.5 h-4.5" />
            </div>
            <p className="text-neutral-high text-[16px] font-[500]">
              No tasks have been added to this epic yet
            </p>
            <button
              type="button"
              className="btn-primary inline-flex items-center gap-2 shrink-0 w-35"
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
