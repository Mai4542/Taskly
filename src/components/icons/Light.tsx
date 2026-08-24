import type { SVGProps } from 'react';

interface LightIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export function Light({
  size = 16,
  color = '#fff',
  className = '',
  ...props
}: LightIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 16 20"
      className={className}
      {...props}
    >
      <path
        fill={color}
        d="M6.55 16.2l5.175-6.2h-4l.725-5.675L3.825 11H7.3l-.75 5.2zM4 20l1-7H0L9 0h2l-1 8h6L6 20H4z"
      />
    </svg>
  );
}
