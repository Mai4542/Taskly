import { useNavigate } from 'react-router-dom';
import { useProjects } from '../../hooks/useProjects';
import ProjectCard from '../../components/dashboard/projects/ProjectCard';
import ProjectsSkeleton from '../../components/dashboard/projects/ProjectsSkeleton';
import ProjectsEmptyState from '../../components/dashboard/projects/ProjectsEmptyState';
import ProjectsErrorState from '../../components/dashboard/projects/ProjectsErrorState';
import ProjectsPagination from '../../components/dashboard/projects/ProjectsPagination';
import { APP_ROUTES } from '../../constants/router';
import plus from '../../assets/imgs/add2.svg';
import plus1 from '../../assets/imgs/add.svg';

export default function Projects() {
  const navigate = useNavigate();
  const { projects, status, retry } = useProjects();

  return (
    <div>
      {status !== 'error' &&
        !(status === 'success' && projects.length === 0) && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="headline-lg text-neutral-high">Projects</h1>
              <p className="body-md text-neutral-medium">
                Manage and curate your projects
              </p>
            </div>

            {status === 'success' && projects.length > 0 && (
              <button
                type="button"
                onClick={() => navigate(APP_ROUTES.dashboard.projects.add)}
                className="btn-primary inline-flex items-center gap-2 shrink-0 w-53.5"
              >
                <img src={plus1} alt="add" />
                Create New Project
              </button>
            )}
          </div>
        )}

      {status === 'loading' && <ProjectsSkeleton />}

      {status === 'error' && <ProjectsErrorState onRetry={retry} />}

      {status === 'success' && projects.length === 0 && <ProjectsEmptyState />}

      {status === 'success' && projects.length > 0 && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}

            <button
              type="button"
              onClick={() => navigate(APP_ROUTES.dashboard.projects.add)}
              className="cursor-pointer rounded-xl border-2 border-dashed border-[#C3C6D633]/80 flex flex-col items-center justify-center gap-2 py-8 transition-all duration-300 bg-white hover:bg-[#F8F9FC] hover:border-[#0052CC]/40 hover:shadow-lg hover:shadow-[#0052CC]/10 hover:-translate-y-1 active:translate-y-0.5 active:shadow-sm max-w-78.5 h-55"
            >
              <span className="flex h-12 w-12 rounded-lg items-center justify-center bg-[#F1F3FF] transition-colors duration-300">
                <img
                  src={plus}
                  alt="add"
                  className="transition-transform duration-300"
                />
              </span>
              <span className="text-[#434654] text-[14px] font-semibold transition-colors duration-300">
                ADD PROJECT
              </span>
            </button>
          </div>

          <div className="relative bottom-2">
            <ProjectsPagination
              shown={projects.length}
              total={projects.length}
            />
          </div>
        </>
      )}
    </div>
  );
}