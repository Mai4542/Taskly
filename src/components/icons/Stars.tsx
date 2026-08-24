import type { SVGProps } from 'react';

interface StarsIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export function Stars({
  size = 22,
  color = '#003D9B',
  className = '',
  ...props
}: StarsIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 22 22"
      className={className}
      {...props}
    >
      <path
        fill={color}
        d="M18 8l-1.25-2.75L14 4l2.75-1.25L18 0l1.25 2.75L22 4l-2.75 1.25L18 8zm0 14l-1.25-2.75L14 18l2.75-1.25L18 14l1.25 2.75L22 18l-2.75 1.25L18 22zM8 19l-2.5-5.5L0 11l5.5-2.5L8 3l2.5 5.5L16 11l-5.5 2.5L8 19zm0-4.85L9 12l2.15-1L9 10 8 7.85 7 10l-2.15 1L7 12l1 2.15z"
      />
    </svg>
  );
}
