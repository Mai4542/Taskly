import type { SVGProps } from 'react';

interface ErrorsIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export function ErrorsIcon({
  size = 11,
  color = '#BA1A1A',
  className = '',
  ...props
}: ErrorsIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 11 10"
      className={className}
      {...props}
    >
      <path
        fill={color}
        d="M0 9.5L5.5 0 11 9.5H0zm1.725-1h7.55L5.5 2 1.725 8.5zM5.5 8c.142 0 .26-.048.356-.144A.484.484 0 006 7.5a.484.484 0 00-.144-.356A.484.484 0 005.5 7a.484.484 0 00-.356.144A.484.484 0 005 7.5c0 .142.048.26.144.356A.484.484 0 005.5 8zM5 6.5h1V4H5v2.5z"
      />
    </svg>
  );
}
