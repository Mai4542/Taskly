import type { SVGProps } from 'react';

interface TreeIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export function Tree({
  size = 17,
  color = '#003D9B',
  className = '',
  ...props
}: TreeIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 17 22"
      className={className}
      {...props}
    >
      <path
        fill={color}
        d="M0 22v-6h2.5v-2H0V8h2.5V6H0V0h7v6H4.5v2H7v2h3V8h7v6h-7v-2H7v2H4.5v2H7v6H0zm2-2h3v-2H2v2zm0-8h3v-2H2v2zm10 0h3v-2h-3v2zM2 4h3V2H2v2z"
      />
    </svg>
  );
}
