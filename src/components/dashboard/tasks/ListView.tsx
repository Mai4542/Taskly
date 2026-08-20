import { useProjectTasks } from '../../../hooks/useProjectTasks';
import add from '../../../assets/imgs/plus.svg';
import ListViewRow from './ListViewRow';

interface ListViewProps {
  projectId: string;
  onAddTask: () => void;
}

const TABLE_HEADERS = ['Task ID', 'Title', 'Status', 'Due Date', 'Assignee'];

const ListView = ({ projectId, onAddTask }: ListViewProps) => {
  const { tasks, status, retry } = useProjectTasks(projectId);

  if (status === 'loading') {
    return (
      <div className="flex flex-col gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse h-12 rounded-lg bg-[#F1F3FF]" />
        ))}
      </div>
    );
  }

  if (status === 'error') {
    return (
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
    );
  }

  return (
    <div className="relative ">
      <div className="overflow-x-auto rounded-lg border border-surface-low bg-white ">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-surface-low bg-[#F8FAFF]">
              {TABLE_HEADERS.map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-[11px] font-[700] text-neutral-medium uppercase tracking-wide"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <ListViewRow key={task.id} task={task} />
            ))}
          </tbody>
        </table>

        {tasks.length === 0 && (
          <div className="py-10 text-center text-neutral-medium text-sm">
            No tasks yet.
          </div>
        )}

        {tasks.length > 0 && (
          <div className="flex items-center justify-end gap-3 px-4 py-3 border-t border-surface-low">
            <button
              type="button"
              className="text-neutral-medium hover:text-neutral-high w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100"
              aria-label="Previous page"
            >
              ‹
            </button>
            <span className="text-[12px] text-neutral-medium">Page 1 of 5</span>
            <button
              type="button"
              className="text-neutral-medium hover:text-neutral-high w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100"
              aria-label="Next page"
            >
              ›
            </button>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onAddTask}
        className="fixed bottom-8 right-8  w-14 h-14 rounded-lg btn-primary text-white  flex items-center justify-center shadow-lg hover:bg-[#00307a] cursor-pointer"
        aria-label="Add task"
      >
        <img src={add} alt="add" className="w-12 h-12" />
      </button>
    </div>
  );
};

export default ListView;
