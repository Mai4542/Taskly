import type { ProjectMember } from '../../../services/members.service';
import { getInitials, getAvatarStyle } from '../../../utils/avatar';
import RoleBadge from './RoleBadge';

export default function MemberRow({ member }: { member: ProjectMember }) {
  const avatarStyle = getAvatarStyle(member.id || member.email);

  return (
    <div className="grid grid-cols-[2fr_1fr_1fr] items-center gap-4 px-6 py-4 border-b border-surface-low last:border-b-0">
      <div className="flex items-center gap-3 min-w-0">
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg label-sm text-[14px] ${avatarStyle.bg} ${avatarStyle.text}`}
        >
          {getInitials(member.name)}
        </span>
        <div className="min-w-0">
          <p className="title-md text-[14px] text-neutral-high truncate">
            {member.name}
          </p>
          <p className="body-md text-[13px] text-neutral-medium truncate">
            {member.email}
          </p>
        </div>
      </div>

      <div className="flex justify-start">
        <div className="-translate-x-4">
          <RoleBadge role={member.role} />
        </div>
      </div>

      <div className="flex justify-end">
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
