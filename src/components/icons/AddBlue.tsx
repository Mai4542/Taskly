import type { SVGProps } from 'react';

interface AddBlueIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export function AddBlue({
  size = 11,
  color = '#003D9B',
  className = '',
  ...props
}: AddBlueIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 11 11"
      className={className}
      {...props}
    >
      <path fill={color} d="M4.5 6H0V4.5h4.5V0H6v4.5h4.5V6H6v4.5H4.5V6z" />
    </svg>
  );
}
