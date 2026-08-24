import type { SVGProps } from 'react';

interface LinkIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export function Link({
  size = 15,
  color = '#434654',
  className = '',
  ...props
}: LinkIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 15 8"
      className={className}
      {...props}
    >
      <path
        fill={color}
        d="M6.75 7.5h-3a3.614 3.614 0 01-2.653-1.097A3.614 3.614 0 010 3.75c0-1.038.366-1.922 1.097-2.653A3.614 3.614 0 013.75 0h3v1.5h-3a2.17 2.17 0 00-1.594.656A2.17 2.17 0 001.5 3.75c0 .625.219 1.156.656 1.594A2.17 2.17 0 003.75 6h3v1.5zm-2.25-3V3h6v1.5h-6zm3.75 3V6h3a2.17 2.17 0 001.594-.656A2.17 2.17 0 0013.5 3.75a2.17 2.17 0 00-.656-1.594A2.17 2.17 0 0011.25 1.5h-3V0h3c1.037 0 1.922.366 2.653 1.097C14.634 1.828 15 2.712 15 3.75c0 1.037-.366 1.922-1.097 2.653A3.614 3.614 0 0111.25 7.5h-3z"
      />
    </svg>
  );
}
