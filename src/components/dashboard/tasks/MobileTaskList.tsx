import { useProjectTasks } from '../../../hooks/useProjectTasks';
import Pagination from '../../common/Pagination';
import TaskListCard from './TaskListCard';

interface MobileTaskListProps {
  projectId: string;
  onAddTask: () => void;
  onTaskClick: (taskId: string) => void;
  searchTerm?: string;
}

const MobileTaskList = ({
  projectId,
  onAddTask,
  onTaskClick,
  searchTerm = '',
}: MobileTaskListProps) => {
  const { tasks, status, retry, totalCount, loadMore, loadingMore, hasMore } =
    useProjectTasks(projectId, searchTerm);

  return (
    <div className="md:hidden flex flex-col gap-3">
      <button
        type="button"
        onClick={onAddTask}
        className="w-full bg-primary text-white text-[14px] font-semibold rounded-lg py-3 flex items-center justify-center gap-2"
      >
        <span className="text-[16px] leading-none">+</span> Create Task
      </button>

      {status === 'loading' && (
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse h-24 rounded-lg bg-surface-low"
            />
          ))}
        </div>
      )}

      {status === 'error' && (
        <div className="flex flex-col items-center gap-2 rounded-lg bg-surface-low p-6">
          <p className="text-error text-[13px] font-medium">
            Failed to load tasks
          </p>
          <button
            onClick={retry}
            className="text-primary text-[12px] font-semibold underline"
          >
            Retry
          </button>
        </div>
      )}

      {status === 'success' && (
        <>
          {tasks.map((task) => (
            <TaskListCard
              key={task.id}
              task={task}
              onClick={() => onTaskClick(task.id)}
            />
          ))}
          {tasks.length === 0 && (
            <div className="py-10 text-center text-neutral-medium text-sm">
              {searchTerm ? 'No matching tasks found.' : 'No tasks yet.'}
            </div>
          )}

          {tasks.length > 0 && (
            <Pagination
              infiniteScroll
              isMobile
              currentPage={1}
              totalPages={1}
              totalCount={totalCount}
              itemsLabel="tasks"
              hasMore={hasMore}
              loadingMore={loadingMore}
              onLoadMore={loadMore}
              onPageChange={() => {}}
            />
          )}
        </>
      )}
    </div>
  );
};

export default MobileTaskList;
