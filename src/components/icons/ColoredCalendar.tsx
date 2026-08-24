import type { SVGProps } from 'react';

interface ColoredCalendarIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export function ColoredCalendar({
  size = 14,
  color = '#003D9B',
  className = '',
  ...props
}: ColoredCalendarIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 14 15"
      className={className}
      {...props}
    >
      <path
        fill={color}
        d="M8.625 12a1.81 1.81 0 01-1.331-.544 1.81 1.81 0 01-.544-1.331c0-.525.181-.969.544-1.331a1.81 1.81 0 011.331-.544c.525 0 .969.181 1.331.544.363.362.544.806.544 1.331 0 .525-.181.969-.544 1.331A1.81 1.81 0 018.625 12zM1.5 15c-.413 0-.766-.147-1.06-.44A1.445 1.445 0 010 13.5V3c0-.413.147-.766.44-1.06.294-.293.647-.44 1.06-.44h.75V0h1.5v1.5h6V0h1.5v1.5H12c.412 0 .766.147 1.06.44.293.294.44.647.44 1.06v10.5c0 .412-.147.766-.44 1.06-.294.293-.648.44-1.06.44H1.5zm0-1.5H12V6H1.5v7.5zm0-9H12V3H1.5v1.5zm0 0V3v1.5z"
      />
    </svg>
  );
}
