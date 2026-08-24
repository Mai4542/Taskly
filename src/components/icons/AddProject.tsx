import type { SVGProps } from 'react';

interface AddProjectIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export function AddProject({
  size = 22,
  color = '#0052CC',
  className = '',
  ...props
}: AddProjectIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 22 20"
      className={className}
      {...props}
    >
      <path
        fill={color}
        d="M10 20a9.738 9.738 0 01-3.9-.788 10.099 10.099 0 01-3.175-2.137c-.9-.9-1.612-1.958-2.137-3.175A9.738 9.738 0 010 10c0-1.383.263-2.683.787-3.9a10.099 10.099 0 012.138-3.175c.9-.9 1.958-1.612 3.175-2.137A9.738 9.738 0 0110 0c1.083 0 2.108.158 3.075.475.967.317 1.858.758 2.675 1.325L14.3 3.275a8.6 8.6 0 00-2.025-.938A7.552 7.552 0 0010 2c-2.217 0-4.104.78-5.662 2.338C2.779 5.896 2 7.783 2 10s.78 4.104 2.338 5.662C5.896 17.221 7.783 18 10 18c.533 0 1.05-.05 1.55-.15.5-.1.983-.242 1.45-.425l1.5 1.525c-.683.333-1.4.592-2.15.775A9.865 9.865 0 0110 20zm7-2v-3h-3v-2h3v-3h2v3h3v2h-3v3h-2zm-8.4-3.4l-4.25-4.25 1.4-1.4L8.6 11.8l10-10.025 1.4 1.4L8.6 14.6z"
      />
    </svg>
  );
}
