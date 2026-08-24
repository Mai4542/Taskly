import type { SVGProps } from 'react';

interface EpicIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export function EpicIcon({
  size = 20,
  color = '#003D9B',
  className = '',
  ...props
}: EpicIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 20 14"
      className={className}
      {...props}
    >
      <path
        fill={color}
        d="M0 10V4c0-.55.196-1.02.588-1.413A1.926 1.926 0 012 2c.55 0 1.02.196 1.413.587C3.804 2.98 4 3.45 4 4v6c0 .55-.196 1.02-.587 1.412A1.926 1.926 0 012 12c-.55 0-1.02-.196-1.413-.588A1.926 1.926 0 010 10zm7 4c-.55 0-1.02-.196-1.412-.588A1.926 1.926 0 015 12V2c0-.55.196-1.02.588-1.413A1.926 1.926 0 017 0h6c.55 0 1.02.196 1.412.588C14.804.979 15 1.45 15 2v10c0 .55-.196 1.02-.588 1.412A1.926 1.926 0 0113 14H7zm9-4V4c0-.55.196-1.02.587-1.413A1.926 1.926 0 0118 2c.55 0 1.02.196 1.413.587C19.803 2.98 20 3.45 20 4v6c0 .55-.196 1.02-.587 1.412A1.926 1.926 0 0118 12c-.55 0-1.02-.196-1.413-.588A1.926 1.926 0 0116 10z"
      />
    </svg>
  );
}
