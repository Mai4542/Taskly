import type { SVGProps } from 'react';

interface TasksIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  fillOpacity?: number;
}

export function TasksIcon({
  size = 20,
  color = '#041B3C',
  fillOpacity = 0.6,
  className = '',
  ...props
}: TasksIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 20 16"
      className={className}
      {...props}
    >
      <path
        fill={color}
        fillOpacity={fillOpacity}
        d="M14.375 15.075l-3.55-3.55 1.4-1.4 2.125 2.125L18.6 8 20 9.425l-5.625 5.65zm0-8l-3.55-3.55 1.4-1.4L14.35 4.25 18.6 0 20 1.425l-5.625 5.65zM0 13.075v-2h9v2H0zm0-8v-2h9v2H0z"
      />
    </svg>
  );
}
