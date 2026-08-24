import type { SVGProps } from 'react';

interface EpicsIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  fillOpacity?: number;
}

export function EpicsIcon({
  size = 20,
  color = '#041B3C',
  fillOpacity = 0.6,
  className = '',
  ...props
}: EpicsIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 20 18"
      className={className}
      {...props}
    >
      <path
        fill={color}
        fillOpacity={fillOpacity}
        d="M13 18v-3H9V5H7v3H0V0h7v3h6V0h7v8h-7V5h-2v8h2v-3h7v8h-7zM2 2v4-4zm13 10v4-4zm0-10v4-4zm0 4h3V2h-3v4zm0 10h3v-4h-3v4zM2 6h3V2H2v4z"
      />
    </svg>
  );
}
