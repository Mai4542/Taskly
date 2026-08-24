import type { SVGProps } from 'react';

interface PlusSimpleIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export function PlusSimple({
  size = 14,
  color = '#fff',
  className = '',
  ...props
}: PlusSimpleIconProps) {
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
      <path fill={color} d="M6 8H0V6h6V0h2v6h6v2H8v6H6V8z" />
    </svg>
  );
}
