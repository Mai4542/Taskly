interface CheckItem {
  label: string;
  isValid: boolean;
}

const CheckIcon = ({ checked }: { checked: boolean }) =>
  checked ? (
    <svg width="11" height="11" viewBox="-1 -1 22 22" fill="none">
      <circle
        cx="10"
        cy="10"
        r="8.5"
        stroke="#004E32"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M6 10l3 3 5-5"
        stroke="#004E32"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg width="11" height="11" viewBox="-1 -1 22 22" fill="none">
      <circle
        cx="10"
        cy="10"
        r="8.5"
        stroke="#737685"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );

const PasswordChecklist = ({ password }: { password: string }) => {
  const checks: CheckItem[] = [
    { label: 'At least 8 characters', isValid: password.length >= 8 },
    {
      label: 'One uppercase, lowercase, and digit',
      isValid:
        /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password),
    },
    {
      label: 'One special character',
      isValid: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
  ];

  return (
    <div
      style={{
        borderRadius: '8px',
        padding: '10px 8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        height: '80px',
      }}
    >
      {checks.map((item, i) => (
        <div
          key={i}
          style={{ display: 'flex', alignItems: 'center', gap: '7px' }}
        >
          <CheckIcon checked={item.isValid} />
          <span style={{ color: '#434654', fontSize: '11px' }}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default PasswordChecklist;
