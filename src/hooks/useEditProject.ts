import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import {
  getProjectsAPI,
  updateProjectAPI,
  UnauthorizedError,
} from '../services/projects.service';
import type { CreateProjectData } from '../services/projects.service';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  setProjects,
  updateProjectInList,
  setSelectedProjectId,
} from '../store/slices/projectsSlice';
import { APP_ROUTES } from '../constants/router';

type FetchStatus = 'loading' | 'success' | 'error';

export function useEditProject() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const project = useAppSelector(
    (state) => state.projects.items.find((p) => p.id === projectId) ?? null,
  );

  const [fetchStatus, setFetchStatus] = useState<FetchStatus>(
    project ? 'success' : 'loading',
  );
  const [isSaving, setIsSaving] = useState(false);

  const loadProject = useCallback(async () => {
    if (!projectId) {
      setFetchStatus('error');
      return;
    }

    if (project) {
      dispatch(setSelectedProjectId(projectId));
      setFetchStatus('success');
      return;
    }

    try {
      setFetchStatus('loading');
      const projects = await getProjectsAPI();
      dispatch(setProjects(projects));
      dispatch(setSelectedProjectId(projectId));
      setFetchStatus('success');
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        navigate(APP_ROUTES.auth.login, { replace: true });
        return;
      }
      setFetchStatus('error');
      toast.error('Failed to load project');
    }
  }, [projectId, project, navigate, dispatch]);

  useEffect(() => {
    loadProject();
  }, [loadProject]);

  async function saveProject(data: CreateProjectData) {
    if (!projectId) return;

    setIsSaving(true);
    try {
      const updated = await updateProjectAPI(projectId, data);
      dispatch(updateProjectInList(updated));
      toast.success('Project updated successfully');
      navigate(APP_ROUTES.dashboard.projects.root);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      toast.error(`Failed to update project: ${message}`);
    } finally {
      setIsSaving(false);
    }
  }

  function cancel() {
    navigate(APP_ROUTES.dashboard.projects.root);
  }

  const currentProject = useAppSelector(
    (state) => state.projects.items.find((p) => p.id === projectId) ?? null,
  );

  return {
    project: currentProject,
    fetchStatus: currentProject ? 'success' : fetchStatus,
    isSaving,
    retry: loadProject,
    saveProject,
    cancel,
  };
}
