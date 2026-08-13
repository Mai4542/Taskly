import add from '../../assets/imgs/plussimple.svg';

interface AddNewTaskButtonProps {
  onClick: () => void;
  className?: string;
}

const AddNewTaskButton = ({
  onClick,
  className = '',
}: AddNewTaskButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-row items-center justify-center gap-2 rounded-lg border-2 border-dashed border-[#C3C6D64D]/70 py-3 text-neutral-medium text-[13px] font-[600] uppercase hover:bg-gray-50 cursor-pointer w-full ${className}`}
    >
      <img src={add} alt="add" className="w-3.5 h-3.5" />
      Add New Task
    </button>
  );
};

export default AddNewTaskButton;
