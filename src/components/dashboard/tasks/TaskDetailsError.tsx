interface TaskDetailsErrorProps {
  onRetry: () => void;
}

const TaskDetailsError = ({ onRetry }: TaskDetailsErrorProps) => {
  return (
    <div className="w-full p-10 flex flex-col items-center gap-3 text-center">
      <p className="body-md text-error">Failed to load task details</p>
      <button onClick={onRetry} className="body-md text-primary underline">
        Retry
      </button>
    </div>
  );
};

export default TaskDetailsError;
