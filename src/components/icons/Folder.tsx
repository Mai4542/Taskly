import type { SVGProps } from 'react';

interface FolderIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export function Folder({
  size = 12,
  color = '#434654',
  className = '',
  ...props
}: FolderIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 12 10"
      className={className}
      {...props}
    >
      <path
        fill={color}
        d="M5.25 7.583h4.667v-.32c0-.438-.214-.786-.642-1.043-.428-.258-.992-.387-1.692-.387s-1.264.13-1.691.387c-.428.257-.642.605-.642 1.043v.32zM7.583 5.25c.321 0 .596-.114.824-.343.229-.228.343-.503.343-.824 0-.32-.114-.595-.343-.824a1.123 1.123 0 00-.824-.342c-.32 0-.595.114-.824.342a1.123 1.123 0 00-.342.824c0 .321.114.596.342.824.229.229.503.343.824.343zM1.167 9.333c-.321 0-.596-.114-.824-.342A1.123 1.123 0 010 8.167v-7C0 .846.114.57.343.343.57.114.846 0 1.167 0h3.5l1.166 1.167H10.5c.32 0 .595.114.824.342.228.229.343.504.343.824v5.834c0 .32-.115.595-.343.824a1.124 1.124 0 01-.824.342H1.167zm0-1.166H10.5V2.333H5.352L4.185 1.167H1.167v7zm0 0v-7 7z"
      />
    </svg>
  );
}
