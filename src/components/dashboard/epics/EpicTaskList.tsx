import { getInitials } from '../../../utils/avatar';
import calendar from '../../../assets/imgs/calender.svg';
import userIcon from '../../../assets/imgs/notAssigned.svg';
import list from '../../../assets/imgs/list.svg';
import add from '../../../assets/imgs/plussimple.svg';
import type { TaskListItem } from '../../../services/tasks.service';
import AddNewTaskButton from '../../common/AddNewTaskButton';

interface EpicTaskListProps {
  tasks: TaskListItem[];
  status: 'loading' | 'error' | 'success';
  retry: () => void;
  onAddTask: () => void;
  onTaskClick: (taskId: string) => void;
}

const formatDueDate = (dateString: string | null) => {
  if (!dateString) return '—';
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const isOverdue = (task: TaskListItem) => {
  if (!task.due_date || task.status === 'DONE') return false;
  return new Date(task.due_date) < new Date();
};

const EpicTaskList = ({
  tasks,
  status,
  retry,
  onAddTask,
  onTaskClick,
}: EpicTaskListProps) => {
  if (status === 'loading') {
    return (
      <div className="flex flex-col gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse h-16 rounded-lg bg-[#F1F3FF]" />
        ))}
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex flex-col items-center justify-center gap-3 min-h-40 md:h-62 bg-[#F1F3FF] rounded-sm p-4">
        <p className="text-error text-[14px] font-[500]">
          Failed to load tasks
        </p>
        <button onClick={retry} className="btn-primary px-4 py-2">
          Retry
        </button>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col gap-3 md:gap-4 items-center rounded-sm justify-center bg-[#F1F3FF] border-2 md:border-3 border-dashed border-[#C3C6D64D]/70 min-h-40 md:h-62 p-4">
        <div className="flex items-center justify-center rounded-lg bg-[#D7E2FF] w-10 h-10 md:w-12 md:h-12">
          <img src={list} alt="List" className="w-4 h-4 md:w-4.5 md:h-4.5" />
        </div>
        <p className="text-neutral-high text-[13px] md:text-[16px] font-[500] text-center px-2">
          No tasks have been added to this epic yet
        </p>
        <button
          type="button"
          onClick={onAddTask}
          className="btn-primary inline-flex items-center gap-2 shrink-0 px-4 py-2 w-30"
        >
          <img src={add} alt="add" className="w-4 h-4" />
          Add Task
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="md:hidden flex flex-col gap-3">
        {tasks.map((task) => {
          const overdue = isOverdue(task);
          return (
            <div
              key={task.id}
              onClick={() => onTaskClick(task.id)}
              className="cursor-pointer rounded-lg border border-surface-low p-3 flex flex-col gap-3 transition-colors duration-150 hover:bg-surface-low hover:border-surface-highest"
            >
              <p className="text-neutral-high text-[14px] font-[700] truncate">
                {task.title}
              </p>
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-1.5 min-w-0">
                  {task.assignee?.avatar_url ? (
                    <img
                      src={task.assignee.avatar_url}
                      alt={task.assignee.name ?? ''}
                      className="h-5 w-5 rounded-full object-cover shrink-0"
                    />
                  ) : task.assignee?.name ? (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#CDDDFF] font-[700] text-[9px] text-[#51617E] shrink-0">
                      {getInitials(task.assignee.name)}
                    </div>
                  ) : (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F1F3FF] shrink-0">
                      <img src={userIcon} alt="User" className="w-3 h-3" />
                    </div>
                  )}
                  <p className="text-neutral-medium text-[12px] font-[500] truncate">
                    {task.assignee?.name || 'Unassigned'}
                  </p>
                </div>

                {overdue ? (
                  <p className="text-[#D92D20] text-[11px] font-[700] uppercase shrink-0">
                    Overdue
                  </p>
                ) : (
                  <div className="flex flex-row items-center gap-1 shrink-0">
                    <img
                      src={calendar}
                      alt="Calendar"
                      className="w-3.5 h-3.5"
                    />
                    <p className="text-neutral-medium text-[12px] font-[500]">
                      {formatDueDate(task.due_date)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        <AddNewTaskButton onClick={onAddTask} />
      </div>

      <div className="hidden md:block rounded-lg border border-surface-low overflow-hidden">
        {tasks.map((task, index) => {
          const overdue = isOverdue(task);
          return (
            <div
              key={task.id}
              onClick={() => onTaskClick(task.id)}
              className={`cursor-pointer flex flex-row items-center justify-between px-4 py-4 transition-colors duration-150 hover:bg-surface-low ${
                index !== tasks.length - 1 ? 'border-b border-surface-low' : ''
              }`}
            >
              <div className="flex flex-col gap-1.5 min-w-0">
                <p className="text-neutral-high text-[16px] font-[600] truncate">
                  {task.title}
                </p>
                <div className="flex flex-row items-center gap-2">
                  {task.assignee?.avatar_url ? (
                    <img
                      src={task.assignee.avatar_url}
                      alt={task.assignee.name ?? ''}
                      className="h-5 w-5 rounded-full object-cover shrink-0"
                    />
                  ) : task.assignee?.name ? (
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#CDDDFF] font-[700] text-[10px] text-[#51617E] shrink-0">
                      {getInitials(task.assignee.name)}
                    </div>
                  ) : null}
                  <p className="text-neutral-medium text-[13px] font-[500]">
                    {task.assignee?.name || 'Unassigned'}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1 shrink-0">
                {overdue ? (
                  <p className="text-[#D92D20] text-[11px] font-[700] uppercase">
                    Overdue
                  </p>
                ) : (
                  <>
                    <p className="text-[#041B3C66]/60 text-[10px] font-[700]">
                      DUE DATE
                    </p>
                    <p className="text-[#041B3CB2] text-[13px] font-[500]">
                      {formatDueDate(task.due_date)}
                    </p>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default EpicTaskList;
