import StatusColumn from './StatusColumn';
import { STATUS_COLUMNS } from '../../../constants/taskStatus';

interface BoardViewProps {
  projectId: string;
  onAddTask: (status: string) => void;
}

const BoardView = ({ projectId, onAddTask }: BoardViewProps) => {
  return (
    <div className="flex flex-row gap-5 overflow-x-auto pb-4 -mx-12 px-12">
      {STATUS_COLUMNS.map((statusConfig) => (
        <StatusColumn
          key={statusConfig.value}
          projectId={projectId}
          statusConfig={statusConfig}
          onAddTask={onAddTask}
        />
      ))}
    </div>
  );
};

export default BoardView;
