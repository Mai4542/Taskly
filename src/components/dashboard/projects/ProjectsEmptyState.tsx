import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../../../constants/router';
import empty from '../../../assets/imgs/empty.svg';
import plus from '../../../assets/imgs/add.svg';
export default function ProjectsEmptyState() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center text-center py-14 px-4">
      <div className="flex h-72 w-72 items-center justify-center rounded-xl bg-surface-highest mb-6">
        <img src={empty} alt="no projects" />
      </div>
      <h2 className="headline-lg text-neutral-high">No Projects</h2>
      <p className="body-md text-[#434654]  mt-3 max-w-sm">
        You don't have any projects yet. Start by defining your first
        architectural workspace to begin tracking tasks and epics.
      </p>
      <button
        type="button"
        onClick={() => navigate(APP_ROUTES.dashboard.projects.add)}
        className="btn-primary mt-6 inline-flex items-center  gap-2 w-55 justify-center"
      >
        <img src={plus} alt="add" />
        Create New Project
      </button>
    </div>
  );
}
