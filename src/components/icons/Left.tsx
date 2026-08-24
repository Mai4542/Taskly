import type { SVGProps } from 'react';

interface LeftIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export function Left({
  size = 5,
  color = '#434654',
  className = '',
  ...props
}: LeftIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 5 7"
      className={className}
      {...props}
    >
      <path
        fill={color}
        d="M3.5 7L0 3.5 3.5 0l.817.817L1.633 3.5l2.684 2.683L3.5 7z"
      />
    </svg>
  );
}
