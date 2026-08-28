import { useCallback, useRef, useState } from 'react';
import { DragDropProvider, type DragEndEvent } from '@dnd-kit/react';
import StatusColumn, { type ColumnApi } from './StatusColumn';
import { STATUS_COLUMNS } from '../../../constants/taskStatus';
import { updateTaskStatus } from '../../../services/tasks.service';
import type { TaskListItem, TaskStatus } from '../../../services/tasks.service';

interface BoardViewProps {
  projectId: string;
  onAddTask: (status: string) => void;
  onTaskClick: (taskId: string) => void;
  searchTerm?: string;
}

const BoardView = ({
  projectId,
  onAddTask,
  onTaskClick,
  searchTerm = '',
}: BoardViewProps) => {
  const columnApisRef = useRef<Record<string, ColumnApi | null>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const errorTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const registerColumnApi = useCallback(
    (status: string, api: ColumnApi | null) => {
      columnApisRef.current[status] = api;
    },
    [],
  );

  const showError = useCallback((message: string) => {
    if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
    setErrorMessage(message);
    errorTimeoutRef.current = setTimeout(() => setErrorMessage(null), 4000);
  }, []);

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      if (event.canceled) return;

      const { source, target } = event.operation;
      if (!target) return;

      const sourceStatus = (source?.data as { status?: string } | undefined)
        ?.status;
      const draggedTask = (source?.data as { task?: TaskListItem } | undefined)
        ?.task;
      const targetStatus = target.id as string;

      if (!sourceStatus || !draggedTask) return;
      if (sourceStatus === targetStatus) return;

      const sourceApi = columnApisRef.current[sourceStatus];
      const targetApi = columnApisRef.current[targetStatus];
      if (!sourceApi || !targetApi) return;

      const removedTask = sourceApi.removeTaskLocally(draggedTask.id);
      if (!removedTask) return;

      const movedTask: TaskListItem = {
        ...removedTask,
        status: targetStatus,
      };
      targetApi.addTaskLocally(movedTask);

      try {
        await updateTaskStatus(draggedTask.id, targetStatus as TaskStatus);
      } catch (err) {
        console.error('Failed to update task status:', err);

        targetApi.removeTaskLocally(draggedTask.id);
        sourceApi.addTaskLocally(removedTask);

        showError('Failed to move task. Please try again.');
      }
    },
    [showError],
  );

  return (
    <div className="relative">
      {errorMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-lg bg-[#BA1A1A] text-white text-[13px] font-[600] px-4 py-2.5 shadow-lg">
          {errorMessage}
        </div>
      )}

      <DragDropProvider onDragEnd={handleDragEnd}>
        <div className="hidden md:flex flex-row gap-5 overflow-x-auto pb-4 -mx-12 px-12">
          {STATUS_COLUMNS.map((statusConfig) => (
            <StatusColumn
              key={statusConfig.value}
              projectId={projectId}
              statusConfig={statusConfig}
              onAddTask={onAddTask}
              onTaskClick={onTaskClick}
              searchTerm={searchTerm}
              registerColumnApi={registerColumnApi}
            />
          ))}
        </div>
      </DragDropProvider>
    </div>
  );
};

export default BoardView;
