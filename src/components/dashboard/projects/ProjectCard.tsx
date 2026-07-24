import { formatDate } from '../../../utils/formatDate';
import type { Project } from '../../../services/projects.service';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-md  bg-white p-5 flex flex-col gap-3 max-w-78.5 h-55">
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
