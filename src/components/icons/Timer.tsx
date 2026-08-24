import type { SVGProps } from 'react';

interface TimerIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export function Timer({
  size = 18,
  color = '#737685',
  className = '',
  ...props
}: TimerIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 18 21"
      className={className}
      {...props}
    >
      <path
        fill={color}
        d="M6 2V0h6v2H6zm2 11h2V7H8v6zm1 8a8.646 8.646 0 01-3.487-.712A9.192 9.192 0 012.65 18.35a9.193 9.193 0 01-1.938-2.863A8.646 8.646 0 010 12c0-1.233.237-2.396.713-3.488A9.193 9.193 0 012.65 5.65a9.193 9.193 0 012.863-1.938A8.646 8.646 0 019 3a8.92 8.92 0 012.975.5c.95.333 1.842.817 2.675 1.45l1.4-1.4 1.4 1.4-1.4 1.4a9.723 9.723 0 011.45 2.675c.333.95.5 1.942.5 2.975a8.646 8.646 0 01-.712 3.488 9.192 9.192 0 01-1.938 2.862 9.192 9.192 0 01-2.862 1.938A8.646 8.646 0 019 21zm0-2c1.933 0 3.583-.683 4.95-2.05C15.317 15.583 16 13.933 16 12c0-1.933-.683-3.583-2.05-4.95C12.583 5.683 10.933 5 9 5c-1.933 0-3.583.683-4.95 2.05C2.683 8.417 2 10.067 2 12c0 1.933.683 3.583 2.05 4.95C5.417 18.317 7.067 19 9 19z"
      />
    </svg>
  );
}
