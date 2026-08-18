import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProjectMembers } from '../../hooks/useProjectMembers';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useProjects } from '../../hooks/useProjects';
import Breadcrumb from '../../components/common/Breadcrumb';
import MemberRow from '../../components/dashboard/members/MemberRow';
import MemberCard from '../../components/dashboard/members/MemberCard';
import MembersSkeleton, {
  MembersHeaderSkeleton,
} from '../../components/dashboard/members/MembersSkeleton';
import ErrorState from '../../components/common/ErrorState';
import InviteMemberButton from '../../components/dashboard/members/InviteMemberButton';
import InviteMemberModal from '../../components/dashboard/members/InviteMemberModal';
import { APP_ROUTES } from '../../constants/router';

export default function ProjectMembers() {
  const { projectId } = useParams<{ projectId: string }>();
  const isMobile = useIsMobile();
  const { members, status, retry } = useProjectMembers(projectId);
  const { projects } = useProjects();
  const project = projects.find((p) => p.id === projectId);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const handleOpenInviteModal = () => {
    setIsInviteModalOpen(true);
  };

  const handleCloseInviteModal = () => {
    setIsInviteModalOpen(false);
  };

  const handleInviteSuccess = () => {
    retry();
    setIsInviteModalOpen(false);
  };

  return (
    <div>
      {status === 'loading' ? (
        <MembersHeaderSkeleton />
      ) : (
        <div className="flex flex-col p-6 sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <Breadcrumb
              items={[
                { label: 'Projects', to: APP_ROUTES.dashboard.projects.root },
                {
                  label: project?.name ?? 'Project',
                  to: projectId
                    ? APP_ROUTES.dashboard.epics(projectId)
                    : undefined,
                },
                { label: 'Members' },
              ]}
            />
            <h1 className="headline-lg text-neutral-high">Project Members</h1>
          </div>
          {!isMobile && status === 'success' && (
            <InviteMemberButton
              variant="desktop"
              onClick={handleOpenInviteModal}
            />
          )}
        </div>
      )}

      {status === 'loading' && <MembersSkeleton />}

      {status === 'error' && (
        <ErrorState
          message="Failed to load project members. Please try again."
          onRetry={retry}
        />
      )}

      {status === 'success' && (
        <>
          {isMobile ? (
            <div className="flex flex-col gap-3 max-w-3xl mx-auto">
              {members.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-sm border-t-4 border-b-4 border-l-4 border-[#F1F3FF] overflow-hidden max-w-5xl mx-auto mt-20">
              <div className="grid grid-cols-[2fr_1fr_1fr] gap-4 px-6 py-3 bg-[#E0E8FF4D]">
                <span className="label-sm text-[11px] tracking-wide text-[#434654] uppercase">
                  Member
                </span>
                <span className="label-sm text-[11px] tracking-wide text-[#434654] uppercase">
                  Role
                </span>
                <span className="label-sm text-[11px] tracking-wide text-[#434654] uppercase flex justify-end mr-4">
                  Actions
                </span>
              </div>
              {members.map((member) => (
                <MemberRow key={member.id} member={member} />
              ))}
            </div>
          )}

          {isMobile && (
            <InviteMemberButton
              variant="mobile"
              onClick={handleOpenInviteModal}
            />
          )}
        </>
      )}

      <InviteMemberModal
        projectId={projectId || ''}
        projectName={project?.name}
        isOpen={isInviteModalOpen}
        onClose={handleCloseInviteModal}
        onSuccess={handleInviteSuccess}
      />
    </div>
  );
}
