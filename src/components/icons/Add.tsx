import type { SVGProps } from 'react';

interface AddIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export function Add({ size = 20, color = '#fff', ...props }: AddIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 20 20"
      {...props}
    >
      <path fill={color} d="M9 15h2v-4h4V9h-4V5H9v4H5v2h4v4zm1 5a9.738..." />
    </svg>
  );
}
