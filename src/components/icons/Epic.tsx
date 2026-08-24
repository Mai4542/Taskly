import type { SVGProps } from 'react';

interface EpicIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export function Epic({
  size = 11,
  color = '#374763',
  className = '',
  ...props
}: EpicIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 11 12"
      className={className}
      {...props}
    >
      <path
        fill={color}
        d="M5.25 11.113L0 7.029.963 6.3 5.25 9.625 9.537 6.3l.963.73-5.25 4.083zm0-2.946L0 4.083 5.25 0l5.25 4.083-5.25 4.084zm0-1.488l3.354-2.596L5.25 1.487 1.896 4.083 5.25 6.68z"
      />
    </svg>
  );
}
