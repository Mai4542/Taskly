import type { ProjectMember } from '../../../services/members.service';
import { getInitials, getAvatarStyle } from '../../../utils/avatar';
import RoleBadge from './RoleBadge';

export default function MemberCard({ member }: { member: ProjectMember }) {
  const avatarStyle = getAvatarStyle(member.id || member.email);

  return (
    <div className="flex items-center gap-3 bg-white rounded-xl p-4">
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg label-sm text-[13px] ${avatarStyle.bg} ${avatarStyle.text}`}
      >
        {getInitials(member.name)}
      </span>

      <div className="min-w-0 flex-1">
        <p className="title-md text-[14px] text-neutral-high truncate">
          {member.name}
        </p>
        <p className="body-md text-[13px] text-neutral-medium truncate">
          {member.email}
        </p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <RoleBadge role={member.role} />
        {member.role !== 'owner' && (
          <button
            type="button"
            aria-label="Member actions"
            className="cursor-pointer text-neutral-medium hover:text-neutral-high p-1"
          >
            <svg width="4" height="16" viewBox="0 0 4 16" fill="none">
              <circle cx="2" cy="2" r="2" fill="currentColor" />
              <circle cx="2" cy="8" r="2" fill="currentColor" />
              <circle cx="2" cy="14" r="2" fill="currentColor" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
