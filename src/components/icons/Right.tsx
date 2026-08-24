import type { SVGProps } from 'react';

interface RightIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export function Right({
  size = 5,
  color = '#434654',
  className = '',
  ...props
}: RightIconProps) {
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
        d="M2.683 3.5L0 .817.817 0l3.5 3.5L.817 7 0 6.183 2.683 3.5z"
      />
    </svg>
  );
}
