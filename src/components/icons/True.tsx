import type { SVGProps } from 'react';

interface TrueIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export function True({
  size = 20,
  color = '#005235',
  className = '',
  ...props
}: TrueIconProps) {
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
        d="M8.6 14.6l7.05-7.05-1.4-1.4L8.6 11.8 5.75 8.95l-1.4 1.4L8.6 14.6zM10 20a9.738 9.738 0 01-3.9-.788 10.099 10.099 0 01-3.175-2.137c-.9-.9-1.612-1.958-2.137-3.175A9.738 9.738 0 010 10c0-1.383.263-2.683.787-3.9a10.099 10.099 0 012.138-3.175c.9-.9 1.958-1.612 3.175-2.137A9.738 9.738 0 0110 0c1.383 0 2.683.263 3.9.787a10.098 10.098 0 013.175 2.138c.9.9 1.613 1.958 2.137 3.175A9.738 9.738 0 0120 10a9.738 9.738 0 01-.788 3.9 10.098 10.098 0 01-2.137 3.175c-.9.9-1.958 1.613-3.175 2.137A9.738 9.738 0 0110 20z"
      />
    </svg>
  );
}
