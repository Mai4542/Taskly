import type { SVGProps } from 'react';

interface ListViewIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export function ListView({
  size = 11,
  color = '#003D9B',
  className = '',
  ...props
}: ListViewIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 11 6"
      className={className}
      {...props}
    >
      <path
        fill={color}
        d="M2.333 1.167V0H10.5v1.167H2.333zm0 2.333V2.333H10.5V3.5H2.333zm0 2.333V4.667H10.5v1.166H2.333zM.583 1.167A.564.564 0 01.168.999.564.564 0 010 .583C0 .418.056.28.168.168A.564.564 0 01.583 0C.75 0 .887.056 1 .168c.112.112.168.25.168.415A.564.564 0 01.999 1a.564.564 0 01-.416.168zm0 2.333a.564.564 0 01-.415-.168A.564.564 0 010 2.917c0-.166.056-.304.168-.416a.564.564 0 01.415-.168c.166 0 .304.056.416.168.112.112.168.25.168.416a.564.564 0 01-.168.415.564.564 0 01-.416.168zm0 2.333a.564.564 0 01-.415-.167A.564.564 0 010 5.25c0-.165.056-.304.168-.416a.564.564 0 01.415-.167c.166 0 .304.056.416.167.112.112.168.25.168.416a.564.564 0 01-.168.416.564.564 0 01-.416.167z"
      />
    </svg>
  );
}
