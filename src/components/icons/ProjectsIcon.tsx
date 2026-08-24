import type { SVGProps } from 'react';

interface ProjectsIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export function ProjectsIcon({
  size = 18,
  color = '#0052CC',
  className = '',
  ...props
}: ProjectsIconProps) {
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
        d="M0 8V0h8v8H0zm0 10v-8h8v8H0zM10 8V0h8v8h-8zm0 10v-8h8v8h-8z"
      />
    </svg>
  );
}
