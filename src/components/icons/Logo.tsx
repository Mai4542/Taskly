import type { SVGProps } from 'react';

interface LogoIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export function Logo({
  size = 18,
  color = '#0052CC',
  className = '',
  ...props
}: LogoIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 18 20"
      className={className}
      {...props}
    >
      <path
        fill={color}
        d="M9 20l-9-5V5l9-5 9 5v10l-9 5zM6.1 7.25a4.05 4.05 0 011.325-.925A3.92 3.92 0 019 6c.55 0 1.075.108 1.575.325.5.217.942.525 1.325.925l3-1.675L9 2.3 3.1 5.575l3 1.675zm1.9 9.9v-3.275c-.9-.233-1.625-.708-2.175-1.425A3.917 3.917 0 015 10c0-.183.008-.354.025-.512.017-.159.05-.321.1-.488L2 7.25v6.575l6 3.325zM9 12c.55 0 1.02-.196 1.412-.588.392-.391.588-.862.588-1.412 0-.55-.196-1.02-.588-1.412A1.926 1.926 0 009 8c-.55 0-1.02.196-1.412.588A1.926 1.926 0 007 10c0 .55.196 1.02.588 1.412.391.392.862.588 1.412.588zm1 5.15l6-3.325V7.25L12.875 9c.05.167.083.33.1.488A4.9 4.9 0 0113 10c0 .917-.275 1.733-.825 2.45-.55.717-1.275 1.192-2.175 1.425v3.275z"
      />
    </svg>
  );
}
