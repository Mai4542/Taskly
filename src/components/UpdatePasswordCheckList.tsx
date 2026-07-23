interface PasswordChecklistProps {
  password: string;
}

interface Requirement {
  label: string;
  test: (password: string) => boolean;
}

const requirements: Requirement[] = [
  { label: '8-64 characters', test: (p) => p.length >= 8 && p.length <= 64 },
  { label: 'Lowercase letter', test: (p) => /[a-z]/.test(p) },
  { label: 'Special character', test: (p) => /[!@#$%^&*(),.?":{}|<>_\-+=\\[\]~/`]/.test(p) },
  { label: 'Uppercase letter', test: (p) => /[A-Z]/.test(p) },
  { label: 'One digit', test: (p) => /\d/.test(p) },
];

function CheckedIcon() {
  return (
    <svg className="h-4 w-4 shrink-0 text-[#0F9D58]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.5 12.5l2.5 2.5 5-5" />
    </svg>
  );
}

function UncheckedIcon() {
  return (
    <svg className="h-4 w-4 shrink-0 text-neutral-low" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
    </svg>
  );
}

export default function UpdatePasswordChecklist({ password }: PasswordChecklistProps) {
  return (
    <div className="rounded-md bg-surface-low p-4">
      <p className="label-sm text-neutral-medium mb-3">SECURITY REQUIREMENTS</p>

      <ul className="grid grid-cols-2 gap-x-4 gap-y-2" aria-live="polite">
        {requirements.map((req) => {
          const passed = req.test(password);
          return (
            <li key={req.label} className="flex items-center gap-2">
              {passed ? <CheckedIcon /> : <UncheckedIcon />}
              <span
                className={`body-md text-[13px] ${
                  passed ? 'text-neutral-high' : 'text-neutral-low'
                }`}
              >
                {req.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}