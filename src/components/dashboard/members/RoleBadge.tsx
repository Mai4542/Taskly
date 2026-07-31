import type { MemberRole } from '../../../services/members.service';

const ROLE_STYLES: Record<MemberRole, string> = {
  owner: 'bg-primary-container text-white',
  admin: 'bg-surface-highest text-primary',
  member: 'bg-surface-highest text-primary',
  viewer: 'bg-surface-low text-neutral-medium',
};

export default function RoleBadge({ role }: { role: MemberRole }) {
  return (
    <span
      className={`inline-flex items-center justify-center px-3 py-1 rounded-full label-sm text-[11px] tracking-wide uppercase ${ROLE_STYLES[role]}`}
    >
      {role}
    </span>
  );
}
