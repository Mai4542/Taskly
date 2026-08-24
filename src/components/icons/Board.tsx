import type { SVGProps } from 'react';

interface BoardIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export function Board({
  size = 14,
  color = '#041B3C',
  className = '',
  ...props
}: BoardIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 14 14"
      className={className}
      {...props}
    >
      <path
        fill={color}
        d="M0 6V0h6v6H0zm0 7.5v-6h6v6H0zM7.5 6V0h6v6h-6zm0 7.5v-6h6v6h-6zm-6-9h3v-3h-3v3zm7.5 0h3v-3H9v3zM9 12h3V9H9v3zm-7.5 0h3V9h-3v3z"
      />
    </svg>
  );
}
