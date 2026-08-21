import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTaskDetails } from '../../../hooks/useTaskDetails';
import { useProjectMembers } from '../../../hooks/useProjectMembers';
import type { ProjectMember } from '../../../services/members.service';
import { getStatusBadgeStyle } from '../../../constants/taskStatus';
import TaskDetailsDesktop from './TaskDetailsDesktop';
import TaskDetailsMobile from './TaskDetailsMobile';
import TaskDetailsLoading from './TaskDetailsLoading';
import TaskDetailsError from './TaskDetailsError';
import TaskDetailsEmpty from './TaskDetailsEmpty';

interface TaskDetailsModalProps {
  projectId: string | undefined;
  taskId: string | null;
  onClose: () => void;
}

export interface AssigneeOption {
  value: string | null;
  label: string;
  avatar_url?: string | null;
}

export interface TaskDetailsProps {
  task: any;
  statusStyle: any;
  isViewingAssignees: boolean;
  setIsViewingAssignees: (value: boolean) => void;
  members: ProjectMember[];
  membersStatus: string;
  assigneeOptions: AssigneeOption[];
  onClose: () => void;
  onCopyLink: () => void;
}

const TaskDetailsModal = ({
  projectId,
  taskId,
  onClose,
}: TaskDetailsModalProps) => {
  const { task, status, retry } = useTaskDetails(projectId, taskId);
  const { members, status: membersStatus } = useProjectMembers(projectId);
  const [isViewingAssignees, setIsViewingAssignees] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!taskId) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [taskId, onClose]);

  useEffect(() => {
    if (!taskId) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [taskId]);

  useEffect(() => {
    setIsViewingAssignees(false);
  }, [taskId]);

  if (!taskId) return null;

  const handleCopyLink = () => {
    const url = `${window.location.origin}${window.location.pathname}?task=${taskId}`;
    navigator.clipboard?.writeText(url).catch(() => {});
  };

  const assigneeOptions: AssigneeOption[] = members.map((m: ProjectMember) => ({
    value: m.id,
    label: m.name,
    avatar_url: m.avatar_url,
  }));

  const statusStyle = task ? getStatusBadgeStyle(task.status) : null;

  const commonProps: TaskDetailsProps = {
    task,
    statusStyle,
    isViewingAssignees,
    setIsViewingAssignees,
    members,
    membersStatus,
    assigneeOptions,
    onClose,
    onCopyLink: handleCopyLink,
  };

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex ${
        isMobile ? 'items-end justify-center' : 'items-center justify-center'
      } bg-neutral-high/20 ${isMobile ? '' : 'p-2 sm:p-4 md:p-8'} overflow-y-auto`}
      onClick={onClose}
      style={{ animation: 'none', transition: 'none' }}
    >
      {status === 'loading' && <TaskDetailsLoading />}
      {status === 'error' && <TaskDetailsError onRetry={retry} />}
      {status === 'empty' && <TaskDetailsEmpty />}
      {status === 'success' && task && isMobile && (
        <TaskDetailsMobile {...commonProps} />
      )}
      {status === 'success' && task && !isMobile && (
        <TaskDetailsDesktop {...commonProps} />
      )}
    </div>,
    document.body,
  );
};

export default TaskDetailsModal;
