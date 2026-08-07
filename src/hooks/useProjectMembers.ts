import { useState, useEffect, useCallback } from 'react';
import { getProjectMembersAPI } from '../services/members.service';
import type { ProjectMember } from '../services/members.service';

type Status = 'loading' | 'error' | 'success';

interface UseProjectMembersReturn {
  members: ProjectMember[];
  status: Status;
  retry: () => void;
}

export function useProjectMembers(
  projectId: string | undefined,
): UseProjectMembersReturn {
  const [members, setMembers] = useState<ProjectMember[]>([]);
  const [status, setStatus] = useState<Status>('loading');

  const fetchMembers = useCallback(async () => {
    if (!projectId) return;

    setStatus('loading');
    try {
      const data = await getProjectMembersAPI(projectId);
      setMembers(data);
      setStatus('success');
    } catch (err) {
      console.error('Error fetching project members:', err);
      setStatus('error');
    }
  }, [projectId]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  return { members, status, retry: fetchMembers };
}
