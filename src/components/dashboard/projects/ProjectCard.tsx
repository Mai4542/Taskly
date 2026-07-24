import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../../utils/formatDate';
import type { Project } from '../../../services/projects.service';
import { APP_ROUTES } from '../../../constants/router';

export default function ProjectCard({ project }: { project: Project }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(APP_ROUTES.dashboard.epics(project.id))}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          navigate(APP_ROUTES.dashboard.epics(project.id));
        }
      }}
      className="cursor-pointer rounded-md bg-white p-5 flex flex-col gap-3 w-full h-full min-h-[220px] transition-shadow hover:shadow-md"
    >
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
