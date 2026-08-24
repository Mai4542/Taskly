import type { SVGProps } from 'react';

interface EmptyEpicsProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export function EmptyEpics({
  size = 300,
  className = '',
  ...props
}: EmptyEpicsProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 300 300"
      className={className}
      {...props}
    >
      <foreignObject width={232} height={232} x={34} y={9}>
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          style={{
            backdropFilter: 'blur(2px)',
            height: '100%',
            width: '100%',
          }}
          clipPath="url(#bgblur_0_51_669_clip_path)"
        />
      </foreignObject>
      <g data-figma-bg-blur-radius={4}>
        <rect width={224} height={224} x={38} y={13} fill="#fff" rx={32} />
        <rect
          width={223}
          height={223}
          x={38.5}
          y={13.5}
          stroke="#fff"
          strokeOpacity={0.4}
          rx={31.5}
        />
        <g filter="url(#filter1_d_51_669)">
          <rect
            width={224}
            height={224}
            x={38}
            y={13}
            fill="#fff"
            fillOpacity={0.01}
            rx={32}
            shapeRendering="crispEdges"
          />
        </g>
        <rect
          width={64}
          height={64}
          x={80}
          y={55}
          fill="#0052CC"
          fillOpacity={0.2}
          rx={8}
        />
        <path
          fill="#0052CC"
          d="M103.971 84.45l2.437 1.032c.292-.584.594-1.146.906-1.688.313-.541.657-1.083 1.032-1.625l-1.75-.343-2.625 2.625zm4.437 2.594l3.563 3.532c.875-.334 1.812-.844 2.812-1.532 1-.687 1.938-1.468 2.813-2.343 1.458-1.459 2.599-3.079 3.422-4.86.822-1.781 1.182-3.422 1.078-4.922-1.5-.104-3.146.255-4.938 1.078-1.791.823-3.416 1.964-4.875 3.422a20.017 20.017 0 00-2.344 2.813c-.687 1-1.197 1.937-1.531 2.812zm5.563-2.031c-.479-.48-.719-1.068-.719-1.766s.24-1.286.719-1.765c.479-.48 1.073-.719 1.781-.719s1.302.24 1.781.719c.479.479.719 1.067.719 1.765s-.24 1.287-.719 1.766c-.479.48-1.073.719-1.781.719s-1.302-.24-1.781-.719zm.593 10.031l2.625-2.625-.343-1.75c-.542.375-1.084.714-1.625 1.016-.542.302-1.104.599-1.688.89l1.031 2.47zm9.782-20.406c.396 2.52.151 4.974-.735 7.36-.885 2.385-2.411 4.66-4.578 6.828l.625 3.093c.084.417.063.823-.062 1.219a2.51 2.51 0 01-.625 1.031l-5.25 5.25-2.625-6.156-5.344-5.344-6.156-2.625 5.218-5.25c.292-.291.641-.5 1.047-.625a2.482 2.482 0 011.235-.062l3.093.625c2.167-2.167 4.438-3.698 6.813-4.594a14.22 14.22 0 017.344-.75zm-22.532 17.25c.73-.73 1.62-1.099 2.672-1.11 1.052-.01 1.943.35 2.672 1.079.729.729 1.089 1.62 1.078 2.672-.01 1.052-.38 1.942-1.109 2.672-.521.52-1.391.968-2.609 1.343-1.219.375-2.901.709-5.047 1 .291-2.146.625-3.828 1-5.047.375-1.218.823-2.088 1.343-2.609zm1.782 1.75c-.209.208-.417.589-.625 1.14a8.081 8.081 0 00-.438 1.672 8.723 8.723 0 001.672-.421c.552-.198.932-.401 1.141-.61.25-.25.385-.552.406-.906a1.133 1.133 0 00-.344-.906c-.25-.25-.552-.37-.906-.36-.354.01-.656.141-.906.391z"
        />
        <rect width={64} height={64} x={156} y={55} fill="#D7E2FF" rx={8} />
        <path
          fill="#737685"
          d="M181.438 98.25l-.313-2.75 3.563-9.813c.312.292.651.537 1.015.735.365.198.755.349 1.172.453l-3.437 9.438-2 1.937zm13.124 0l-2-1.938-3.437-9.437a4.978 4.978 0 001.172-.453 4.933 4.933 0 001.015-.734l3.563 9.812-.313 2.75zM188 85.75c-1.042 0-1.927-.365-2.656-1.094-.729-.729-1.094-1.614-1.094-2.656 0-.813.234-1.537.703-2.172a3.67 3.67 0 011.797-1.328v-2.75h2.5v2.75a3.67 3.67 0 011.797 1.328c.469.635.703 1.36.703 2.172 0 1.042-.365 1.927-1.094 2.656-.729.73-1.614 1.094-2.656 1.094zm0-2.5c.354 0 .651-.12.891-.36.239-.239.359-.536.359-.89s-.12-.651-.359-.89c-.24-.24-.537-.36-.891-.36s-.651.12-.891.36c-.239.239-.359.536-.359.89s.12.651.359.89c.24.24.537.36.891.36z"
          opacity={0.4}
        />
        <rect width={64} height={64} x={80} y={131} fill="#D7E2FF" rx={8} />
        <path
          fill="#737685"
          d="M100.75 161.75v-10h10v10h-10zm0 12.5v-10h10v10h-10zm12.5-12.5v-10h10v10h-10zm0 12.5v-10h10v10h-10zm-10-15h5v-5h-5v5zm12.5 0h5v-5h-5v5zm0 12.5h5v-5h-5v5zm-12.5 0h5v-5h-5v5z"
          opacity={0.4}
        />
        <rect
          width={64}
          height={64}
          x={156}
          y={131}
          fill="#003D9B"
          fillOpacity={0.05}
          rx={8}
        />
        <rect
          width={62}
          height={62}
          x={157}
          y={132}
          stroke="#003D9B"
          strokeDasharray="6 4"
          strokeOpacity={0.2}
          strokeWidth={2}
          rx={7}
        />
        <path
          fill="#003D9B"
          fillOpacity={0.3}
          d="M187 164h-6v-2h6v-6h2v6h6v2h-6v6h-2v-6z"
        />
      </g>
      <defs>
        <clipPath id="bgblur_0_51_669_clip_path" transform="translate(-34 -9)">
          <rect width={224} height={224} x={38} y={13} rx={32} />
        </clipPath>
        <filter
          id="filter1_d_51_669"
          width={300}
          height={300}
          x={0}
          y={0}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feMorphology
            in="SourceAlpha"
            radius={12}
            result="effect1_dropShadow_51_669"
          />
          <feOffset dy={25} />
          <feGaussianBlur stdDeviation={25} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0.239216 0 0 0 0 0.607843 0 0 0 0.1 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_51_669"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_51_669"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
