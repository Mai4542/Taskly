import type { SVGProps } from 'react';

interface SearchIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export function Search({
  size = 14,
  color = '#94A3B8',
  className = '',
  ...props
}: SearchIconProps) {
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
        d="M12.45 13.5L7.725 8.775a4.571 4.571 0 01-2.85.975c-1.362 0-2.516-.472-3.46-1.416C.473 7.391 0 6.238 0 4.875c0-1.362.472-2.516 1.416-3.46C2.359.473 3.513 0 4.875 0s2.516.472 3.46 1.416c.943.943 1.415 2.097 1.415 3.459a4.571 4.571 0 01-.975 2.85L13.5 12.45l-1.05 1.05zM4.875 8.25c.938 0 1.734-.328 2.39-.984.657-.657.985-1.454.985-2.391 0-.938-.328-1.734-.984-2.39-.657-.657-1.454-.985-2.391-.985-.938 0-1.734.328-2.39.984-.657.657-.985 1.454-.985 2.391 0 .938.328 1.734.984 2.39.657.657 1.454.985 2.391.985z"
      />
    </svg>
  );
}
