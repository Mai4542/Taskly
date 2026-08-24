import type { SVGProps } from 'react';

interface ExitIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  fillOpacity?: number;
}

export function Exit({
  size = 14,
  color = '#041B3C',
  fillOpacity = 0.6,
  className = '',
  ...props
}: ExitIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 14 14"
      className={className}
      {...props}
    >
      <path
        fill={color}
        fillOpacity={fillOpacity}
        d="M1.4 14L0 12.6 5.6 7 0 1.4 1.4 0 7 5.6 12.6 0 14 1.4 8.4 7l5.6 5.6-1.4 1.4L7 8.4 1.4 14z"
      />
    </svg>
  );
}
