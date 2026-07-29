import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../../utils/formatDate';
import type { Project } from '../../../services/projects.service';
import { APP_ROUTES } from '../../../constants/router';

export default function ProjectCard({ project }: { project: Project }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(APP_ROUTES.dashboard.epics(project.id));
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(APP_ROUTES.dashboard.edit(project.id));
  };

  return (
    <div
      onClick={handleCardClick}
      className="rounded-md bg-white p-5 flex flex-col gap-3 max-w-78.5 h-55 relative group cursor-pointer hover:shadow-md transition-shadow duration-200"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      <button
        type="button"
        onClick={handleEdit}
        className="cursor-pointer absolute top-3 right-3 p-2 rounded-lg bg-white border border-gray-200 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-blue-50 hover:border-blue-300 hover:shadow-sm"
        title="Edit Project"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.3333 1.99996C11.5084 1.82486 11.7163 1.68597 11.9451 1.59121C12.1738 1.49645 12.4189 1.44767 12.6667 1.44767C12.9144 1.44767 13.1595 1.49645 13.3882 1.59121C13.617 1.68597 13.8249 1.82486 14 1.99996C14.1751 2.17506 14.314 2.38294 14.4087 2.61169C14.5035 2.84044 14.5523 3.08554 14.5523 3.33329C14.5523 3.58104 14.5035 3.82614 14.4087 4.05489C14.314 4.28364 14.1751 4.49152 14 4.66663L5 13.6666L1.33334 14.6666L2.33334 11L11.3333 1.99996Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <h3 className="title-md text-neutral-high line-clamp-1">
        {project.name}
      </h3>
      <p className="body-md text-neutral-medium text-[13px] line-clamp-2 flex-1">
        {project.description || 'No description provided.'}
      </p>
      <div className="flex items-center justify-between mt-3">
        <span className="label-sm text-extra-grey">CREATED AT</span>
        <span className="body-md text-neutral-medium text-[13px]">
          {formatDate(project.created_at)}
        </span>
      </div>
    </div>
  );
}
