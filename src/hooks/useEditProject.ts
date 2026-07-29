import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import {
  getProjectsAPI,
  updateProjectAPI,
  UnauthorizedError,
} from '../services/projects.service';
import type { Project } from '../services/projects.service';
import type { CreateProjectData } from '../services/projects.service';
import { APP_ROUTES } from '../constants/router';

type FetchStatus = 'loading' | 'success' | 'error';

export function useEditProject() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const [project, setProject] = useState<Project | null>(null);
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>('loading');
  const [isSaving, setIsSaving] = useState(false);

  const loadProject = useCallback(async () => {
    if (!projectId) {
      setFetchStatus('error');
      return;
    }

    try {
      setFetchStatus('loading');
      const projects = await getProjectsAPI();
      const found = projects.find((p) => p.id === projectId) ?? null;
      setProject(found);
      setFetchStatus('success');
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        navigate(APP_ROUTES.auth.login, { replace: true });
        return;
      }
      setFetchStatus('error');
      toast.error('Failed to load project');
    }
  }, [projectId, navigate]);

  useEffect(() => {
    loadProject();
  }, [loadProject]);

  async function saveProject(data: CreateProjectData) {
    if (!projectId) return;

    setIsSaving(true);
    try {
      const updated = await updateProjectAPI(projectId, data);
      setProject(updated);
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

  return {
    project,
    fetchStatus,
    isSaving,
    retry: loadProject,
    saveProject,
    cancel,
  };
}
