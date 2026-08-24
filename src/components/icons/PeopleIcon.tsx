import type { SVGProps } from 'react';

interface PeopleIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export function PeopleIcon({
  size = 22,
  color = '#003D9B',
  className = '',
  ...props
}: PeopleIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 22 16"
      className={className}
      {...props}
    >
      <path
        fill={color}
        d="M17 10V7h-3V5h3V2h2v3h3v2h-3v3h-2zM8 8c-1.1 0-2.042-.392-2.825-1.175C4.392 6.042 4 5.1 4 4s.392-2.042 1.175-2.825C5.958.392 6.9 0 8 0s2.042.392 2.825 1.175C11.608 1.958 12 2.9 12 4s-.392 2.042-1.175 2.825C10.042 7.608 9.1 8 8 8zm-8 8v-2.8c0-.567.146-1.087.438-1.563.291-.475.679-.837 1.162-1.087a14.844 14.844 0 013.15-1.163A13.759 13.759 0 018 9c1.1 0 2.183.13 3.25.387 1.067.259 2.117.646 3.15 1.163.483.25.87.612 1.162 1.087.292.476.438.996.438 1.563V16H0z"
      />
    </svg>
  );
}
