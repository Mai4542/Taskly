import { useProjectTasks } from '../../../hooks/useProjectTasks';
import TaskListCard from './TaskListCard';

interface MobileTaskListProps {
  projectId: string;
  onAddTask: () => void;
}

const MobileTaskList = ({ projectId, onAddTask }: MobileTaskListProps) => {
  const { tasks, status, retry } = useProjectTasks(projectId);

  return (
    <div className="md:hidden flex flex-col gap-3">
      <button
        type="button"
        onClick={onAddTask}
        className="w-full bg-[#003D9B] text-white text-[14px] font-[600] rounded-lg py-3 flex items-center justify-center gap-2"
      >
        <span className="text-[16px] leading-none">+</span> Create Task
      </button>

      {status === 'loading' && (
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse h-24 rounded-lg bg-[#F1F3FF]"
            />
          ))}
        </div>
      )}

      {status === 'error' && (
        <div className="flex flex-col items-center gap-2 rounded-lg bg-[#F1F3FF] p-6">
          <p className="text-error text-[13px] font-[500]">
            Failed to load tasks
          </p>
          <button
            onClick={retry}
            className="text-[#003D9B] text-[12px] font-[600] underline"
          >
            Retry
          </button>
        </div>
      )}

      {status === 'success' && (
        <>
          {tasks.map((task) => (
            <TaskListCard key={task.id} task={task} />
          ))}
          {tasks.length === 0 && (
            <div className="py-10 text-center text-neutral-medium text-sm">
              No tasks yet.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MobileTaskList;
