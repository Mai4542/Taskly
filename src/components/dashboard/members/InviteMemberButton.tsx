interface InviteMemberButtonProps {
  variant: 'desktop' | 'mobile';
  onClick?: () => void;
}

export default function InviteMemberButton({
  variant,
  onClick,
}: InviteMemberButtonProps) {
  if (variant === 'mobile') {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label="Invite member"
        className="cursor-pointer fixed bottom-20 right-6 h-10 w-10  rounded-md bg-primary-container text-white flex items-center justify-center shadow-lg hover:bg-primary transition-colors"
      >
        <PersonPlusIcon />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="btn-primary inline-flex items-center gap-2 shrink-0 w-42"
    >
      <PersonPlusIcon className="h-4 w-4" />
      Invite Member
    </button>
  );
}

function PersonPlusIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 17.5v-1.667A3.333 3.333 0 0 0 9.667 12.5H4.333A3.333 3.333 0 0 0 1 15.833V17.5M7 9.167a3.333 3.333 0 1 0 0-6.667 3.333 3.333 0 0 0 0 6.667ZM16.333 6.667v5M18.833 9.167h-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
