import type { SVGProps } from 'react';

interface LogoutIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export function Logout({
  size = 18,
  color = '#BA1A1A',
  className = '',
  ...props
}: LogoutIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 18 18"
      className={className}
      {...props}
    >
      <path
        fill={color}
        d="M2 18c-.55 0-1.02-.196-1.413-.587A1.926 1.926 0 010 16V2C0 1.45.196.98.588.587A1.926 1.926 0 012 0h7v2H2v14h7v2H2zm11-4l-1.375-1.45 2.55-2.55H6V8h8.175l-2.55-2.55L13 4l5 5-5 5z"
      />
    </svg>
  );
}
