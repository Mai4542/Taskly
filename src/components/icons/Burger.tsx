import type { SVGProps } from 'react';

interface BurgerIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export function Burger({
  size = 18,
  color = '#041B3C',
  className = '',
  ...props
}: BurgerIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 18 12"
      className={className}
      {...props}
    >
      <path fill={color} d="M0 12v-2h18v2H0zm0-5V5h18v2H0zm0-5V0h18v2H0z" />
    </svg>
  );
}
