import type { SVGProps } from 'react';

interface TipIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export function Tip({
  size = 12,
  color = '#4F5F7B',
  className = '',
  ...props
}: TipIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 12 15"
      className={className}
      {...props}
    >
      <path
        fill={color}
        d="M5.625 15c-.412 0-.766-.147-1.06-.44a1.445 1.445 0 01-.44-1.06h3c0 .412-.147.766-.44 1.06-.294.293-.647.44-1.06.44zm-3-2.25v-1.5h6v1.5h-6zm.188-2.25A5.746 5.746 0 01.759 8.437 5.458 5.458 0 010 5.626c0-1.563.547-2.89 1.64-3.984C2.735.547 4.063 0 5.626 0c1.563 0 2.89.547 3.984 1.64 1.094 1.094 1.641 2.422 1.641 3.985 0 1.013-.253 1.95-.76 2.813A5.746 5.746 0 018.438 10.5H2.814zm.45-1.5h4.724c.563-.4.997-.894 1.304-1.481.306-.588.459-1.219.459-1.894 0-1.15-.4-2.125-1.2-2.925-.8-.8-1.775-1.2-2.925-1.2S3.5 1.9 2.7 2.7c-.8.8-1.2 1.775-1.2 2.925 0 .675.153 1.306.46 1.894C2.265 8.106 2.7 8.6 3.262 9z"
      />
    </svg>
  );
}
