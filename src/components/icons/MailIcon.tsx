import type { SVGProps } from 'react';

interface MailIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export function MailIcon({
  size = 15,
  color = '#737685',
  className = '',
  ...props
}: MailIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 15 12"
      className={className}
      {...props}
    >
      <path
        fill={color}
        d="M1.5 12c-.413 0-.766-.147-1.06-.44A1.445 1.445 0 010 10.5v-9C0 1.087.147.734.44.44.735.148 1.088 0 1.5 0h12c.412 0 .766.147 1.06.44.293.294.44.647.44 1.06v9c0 .412-.147.766-.44 1.06-.294.293-.648.44-1.06.44h-12zm6-5.25L1.5 3v7.5h12V3l-6 3.75zm0-1.5l6-3.75h-12l6 3.75zM1.5 3V1.5v9V3z"
      />
    </svg>
  );
}
