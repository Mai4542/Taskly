import type { CSSObjectWithLabel } from 'react-select';

export const customStyles = {
  control: (provided: CSSObjectWithLabel) => ({
    ...provided,
    border: '1px solid #D7E2FF',
    borderRadius: '0.5rem',
    width: '100%',
    minWidth: '120px',
    boxShadow: 'none',
    '&:hover': {
      border: '1px solid #D7E2FF',
    },
  }),
  indicatorSeparator: (provided: CSSObjectWithLabel) => ({
    ...provided,
    display: 'none',
  }),
  dropdownIndicator: (provided: CSSObjectWithLabel) => ({
    ...provided,
    color: '#6B7280',
    padding: '8px',
    cursor: 'pointer',
  }),
  menu: (provided: CSSObjectWithLabel) => ({
    ...provided,
    width: '100%',
    zIndex: 20,
  }),
};

export const formatDate = (date: string | null | undefined) => {
  if (!date) return '-';
  return new Date(date).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const ChevronDown = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 9L12 15L18 9"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
