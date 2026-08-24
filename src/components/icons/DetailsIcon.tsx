import type { SVGProps } from 'react';

interface DetailsIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  fillOpacity?: number;
}

export function DetailsIcon({
  size = 20,
  color = '#041B3C',
  fillOpacity = 0.6,
  className = '',
  ...props
}: DetailsIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 20 20"
      className={className}
      {...props}
    >
      <path
        fill={color}
        fillOpacity={fillOpacity}
        d="M9 15h2V9H9v6zm1-8c.283 0 .52-.096.713-.287A.967.967 0 0011 6a.967.967 0 00-.287-.713A.968.968 0 0010 5a.968.968 0 00-.713.287A.968.968 0 009 6c0 .283.096.52.287.713.192.191.43.287.713.287zm0 13a9.738 9.738 0 01-3.9-.788 10.099 10.099 0 01-3.175-2.137c-.9-.9-1.612-1.958-2.137-3.175A9.738 9.738 0 010 10c0-1.383.263-2.683.787-3.9a10.099 10.099 0 012.138-3.175c.9-.9 1.958-1.612 3.175-2.137A9.738 9.738 0 0110 0c1.383 0 2.683.263 3.9.787a10.098 10.098 0 013.175 2.138c.9.9 1.613 1.958 2.137 3.175A9.738 9.738 0 0120 10a9.738 9.738 0 01-.788 3.9 10.098 10.098 0 01-2.137 3.175c-.9.9-1.958 1.613-3.175 2.137A9.738 9.738 0 0110 20zm0-2c2.233 0 4.125-.775 5.675-2.325C17.225 14.125 18 12.233 18 10c0-2.233-.775-4.125-2.325-5.675C14.125 2.775 12.233 2 10 2c-2.233 0-4.125.775-5.675 2.325C2.775 5.875 2 7.767 2 10c0 2.233.775 4.125 2.325 5.675C5.875 17.225 7.767 18 10 18z"
      />
    </svg>
  );
}
