import type { SVGProps } from 'react';

interface ListIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  fillOpacity?: number;
}

export function List({
  size = 18,
  color = '#041B3C',
  fillOpacity = 0.3,
  className = '',
  ...props
}: ListIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 18 16"
      className={className}
      {...props}
    >
      <path
        fill={color}
        fillOpacity={fillOpacity}
        d="M6 15v-2h12v2H6zm0-6V7h12v2H6zm0-6V1h12v2H6zM2 16c-.55 0-1.02-.196-1.413-.588A1.926 1.926 0 010 14c0-.55.196-1.02.588-1.412A1.926 1.926 0 012 12c.55 0 1.02.196 1.413.588.391.391.587.862.587 1.412 0 .55-.196 1.02-.587 1.412A1.926 1.926 0 012 16zm0-6c-.55 0-1.02-.196-1.413-.588A1.926 1.926 0 010 8c0-.55.196-1.02.588-1.412A1.926 1.926 0 012 6c.55 0 1.02.196 1.413.588C3.804 6.979 4 7.45 4 8c0 .55-.196 1.02-.587 1.412A1.926 1.926 0 012 10zm0-6C1.45 4 .98 3.804.587 3.413A1.926 1.926 0 010 2C0 1.45.196.98.588.587A1.926 1.926 0 012 0c.55 0 1.02.196 1.413.588C3.804.979 4 1.45 4 2c0 .55-.196 1.02-.587 1.413A1.926 1.926 0 012 4z"
      />
    </svg>
  );
}
