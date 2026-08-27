import { useProjectTasks } from '../../../hooks/useProjectTasks';
import { Add } from '../../../components/icons/Add';
import Pagination from '../../common/Pagination';
import ListViewRow from './ListViewRow';

interface ListViewProps {
  projectId: string;
  onAddTask: () => void;
  onTaskClick: (taskId: string) => void;
}

const TABLE_HEADERS = ['Task ID', 'Title', 'Status', 'Due Date', 'Assignee'];

const ListView = ({ projectId, onAddTask, onTaskClick }: ListViewProps) => {
  const {
    tasks,
    status,
    retry,
    currentPage,
    totalPages,
    totalCount,
    setPage,
    nextPage,
    prevPage,
    hasNextPage,
    hasPreviousPage,
  } = useProjectTasks(projectId);

  if (status === 'loading') {
    return (
      <div className="flex flex-col gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="animate-pulse h-12 rounded-lg bg-surface-low"
          />
        ))}
      </div>
    );
  }

  if (status === 'error') {
    return (
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
    );
  }

  return (
    <div className="relative">
      <div className="overflow-x-auto rounded-lg border border-surface-low bg-white">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-surface-low bg-[#F8FAFF]">
              {TABLE_HEADERS.map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-[11px] font-bold text-neutral-medium uppercase tracking-wide"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <ListViewRow
                key={task.id}
                task={task}
                onClick={() => onTaskClick(task.id)}
              />
            ))}
          </tbody>
        </table>

        {tasks.length === 0 && (
          <div className="py-10 text-center text-neutral-medium text-sm">
            No tasks yet.
          </div>
        )}

        {tasks.length > 0 && totalPages > 1 && (
          <div className="border-t border-surface-low">
            <Pagination
              variant="simple"
              currentPage={currentPage}
              totalPages={totalPages}
              totalCount={totalCount}
              itemsShown={tasks.length}
              itemsLabel="tasks"
              onPageChange={setPage}
              onNext={nextPage}
              onPrev={prevPage}
              hasNextPage={hasNextPage}
              hasPreviousPage={hasPreviousPage}
            />
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onAddTask}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-lg btn-primary text-white flex items-center justify-center shadow-lg hover:bg-[#00307a] cursor-pointer"
        aria-label="Add task"
      >
        <Add size={20} color="#fff" className="w-12 h-12" />
      </button>
    </div>
  );
};

export default ListView;
