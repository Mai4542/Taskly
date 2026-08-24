import type { SVGProps } from 'react';

interface HideIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export function Hide({
  size = 20,
  color = '#020617',
  className = '',
  ...props
}: HideIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 20 20"
      className={className}
      {...props}
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.233 8.233a2.5 2.5 0 103.534 3.534M8.942 4.233A8.692 8.692 0 0110 4.167c5.834 0 8.334 5.833 8.334 5.833a10.97 10.97 0 01-1.392 2.233"
      />
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.508 5.508A11.272 11.272 0 001.667 10s2.5 5.833 8.333 5.833a8.116 8.116 0 004.492-1.341M1.667 1.667l16.666 16.666"
      />
    </svg>
  );
}
