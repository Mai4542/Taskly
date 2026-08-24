import type { SVGProps } from 'react';

interface CircleeIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export function Circlee({
  size = 11,
  color = '#4F5F7B',
  className = '',
  ...props
}: CircleeIconProps) {
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
      <path
        fill={color}
        d="M5.25 10.5c-1.342 0-2.51-.445-3.507-1.334-.997-.89-1.568-2-1.714-3.333h1.196a3.9 3.9 0 001.349 2.509 3.96 3.96 0 002.676.991c1.138 0 2.102-.396 2.895-1.188.792-.793 1.188-1.757 1.188-2.895 0-1.138-.396-2.102-1.188-2.895-.793-.792-1.757-1.188-2.895-1.188-.67 0-1.298.155-1.881.466a4.335 4.335 0 00-1.473 1.284H3.5v1.166H0v-3.5h1.167v1.371A5.21 5.21 0 015.25 0c.73 0 1.412.139 2.049.416a5.336 5.336 0 011.662 1.123A5.337 5.337 0 0110.084 3.2c.277.637.416 1.32.416 2.049 0 .73-.139 1.412-.416 2.049a5.337 5.337 0 01-1.123 1.662A5.337 5.337 0 017.3 10.084a5.079 5.079 0 01-2.049.416zm1.633-2.8L4.667 5.483v-3.15h1.166v2.684L7.7 6.883l-.817.817z"
      />
    </svg>
  );
}
