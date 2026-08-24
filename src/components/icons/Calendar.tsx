import type { SVGProps } from 'react';

interface CalendarIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  fillOpacity?: number;
}

export function Calendar({
  size = 11,
  color = '#434654',
  fillOpacity = 0.8,
  className = '',
  ...props
}: CalendarIconProps) {
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
        fillOpacity={fillOpacity}
        d="M1.167 11.667c-.321 0-.596-.115-.824-.343A1.124 1.124 0 010 10.5V2.333c0-.32.114-.595.343-.824.228-.228.503-.342.824-.342h.583V0h1.167v1.167h4.666V0H8.75v1.167h.583c.321 0 .596.114.824.342.229.229.343.504.343.824V10.5c0 .32-.114.595-.343.824a1.124 1.124 0 01-.824.343H1.167zm0-1.167h8.166V4.667H1.167V10.5zm0-7h8.166V2.333H1.167V3.5zm0 0V2.333 3.5z"
      />
    </svg>
  );
}
