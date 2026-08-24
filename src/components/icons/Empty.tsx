import type { SVGProps } from 'react';

interface EmptyIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export function Empty({
  size = 288,
  className = '',
  ...props
}: EmptyIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 288 288"
      className={className}
      {...props}
    >
      <g clipPath="url(#clip0_15_619)">
        <rect width={288} height={288} fill="#F1F3FF" rx={8} />
        <g opacity={0.1}>
          <path fill="url(#paint0_linear_15_619)" d="M0 0H288V288H0z" />
          <path fill="url(#paint1_linear_15_619)" d="M0 0H288V288H0z" />
        </g>
        <g filter="url(#filter0_d_15_619)">
          <rect
            width={48}
            height={48}
            x={197.62}
            y={42.64}
            fill="#fff"
            rx={4}
            shapeRendering="crispEdges"
            transform="rotate(-6 197.62 42.64)"
          />
          <path
            fill="#0052CC"
            d="M224.993 73.473l-9.683-6.021 1.511-1.416 7.905 4.9 6.714-6.436 1.772 1.07-8.219 7.903zm-.528-5.023l-9.683-6.02 8.219-7.903 9.683 6.02-8.219 7.903zm-.267-2.536l5.254-5.026-6.184-3.825-5.253 5.027 6.183 3.824z"
          />
        </g>
        <g filter="url(#filter1_d_15_619)">
          <rect
            width={40}
            height={40}
            x={44.6}
            y={196.27}
            fill="#fff"
            rx={4}
            shapeRendering="crispEdges"
            transform="rotate(12 44.6 196.27)"
          />
          <path
            fill="#737685"
            d="M52.065 227.002a2.123 2.123 0 01-1.396-.948 2.125 2.125 0 01-.299-1.661l2.849-13.401c.1-.472.39-.756.87-.85.48-.094.849.057 1.106.453l1.733 2.668-1.601 1.04.539.83 1.6-1.04 2.004 3.084-1.602 1.04.54.83 1.6-1.04 2.003 3.084-1.6 1.04.538.83 1.602-1.04 2.002 3.084-1.601 1.04.54.83 1.6-1.04 1.54 2.373c.257.395.245.793-.036 1.193-.28.4-.658.55-1.13.45l-13.401-2.849zm1.406-2.768l8.119 1.726-6.393-9.844-1.726 8.118z"
          />
        </g>
        <rect width={96} height={96} x={96} y={96} fill="#D7E2FF" rx={12} />
        <g filter="url(#filter2_dd_15_619)">
          <rect
            width={96}
            height={96}
            x={96}
            y={96}
            fill="#fff"
            fillOpacity={0.01}
            rx={12}
            shapeRendering="crispEdges"
          />
        </g>
        <path
          fill="#003D9B"
          d="M131.837 165.154l-.337-2.616 6.452-17.798c.336.295.685.528 1.046.7.36.171.733.313 1.117.425l-6.298 17.433-1.98 1.856zm24.326 0l-1.98-1.856-6.298-17.433a7.489 7.489 0 001.117-.425c.361-.172.71-.405 1.046-.7l6.452 17.798-.337 2.616zM144 141.596c-1.731 0-3.205-.609-4.423-1.827s-1.827-2.692-1.827-4.423c0-1.625.509-2.985 1.526-4.079 1.018-1.095 2.176-1.748 3.474-1.959v-6.462h2.5v6.462c1.298.211 2.456.864 3.474 1.959 1.017 1.094 1.526 2.454 1.526 4.079 0 1.731-.609 3.205-1.827 4.423s-2.692 1.827-4.423 1.827zm0-2.5c1.029 0 1.911-.368 2.647-1.103.735-.736 1.103-1.618 1.103-2.647 0-1.029-.368-1.911-1.103-2.646-.736-.736-1.618-1.104-2.647-1.104-1.029 0-1.911.368-2.647 1.104-.735.735-1.103 1.617-1.103 2.646s.368 1.911 1.103 2.647c.736.735 1.618 1.103 2.647 1.103z"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_15_619"
          width={56.754}
          height={56.754}
          x={195.62}
          y={36.623}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={1} />
          <feGaussianBlur stdDeviation={1} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_15_619"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_15_619"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_15_619"
          width={51.442}
          height={51.442}
          x={34.284}
          y={195.27}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={1} />
          <feGaussianBlur stdDeviation={1} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_15_619"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_15_619"
            result="shape"
          />
        </filter>
        <filter
          id="filter2_dd_15_619"
          width={136}
          height={136}
          x={76}
          y={96}
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
            radius={6}
            result="effect1_dropShadow_15_619"
          />
          <feOffset dy={8} />
          <feGaussianBlur stdDeviation={5} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0.0156863 0 0 0 0 0.105882 0 0 0 0 0.235294 0 0 0 0.05 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_15_619"
          />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feMorphology
            in="SourceAlpha"
            radius={5}
            result="effect2_dropShadow_15_619"
          />
          <feOffset dy={20} />
          <feGaussianBlur stdDeviation={12.5} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0.0156863 0 0 0 0 0.105882 0 0 0 0 0.235294 0 0 0 0.05 0" />
          <feBlend
            in2="effect1_dropShadow_15_619"
            result="effect2_dropShadow_15_619"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect2_dropShadow_15_619"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_15_619"
          x1={0}
          x2={288}
          y1={144}
          y2={144}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.042} stopColor="#003D9B" />
          <stop offset={0.042} stopColor="#003D9B" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          id="paint1_linear_15_619"
          x1={144}
          x2={144}
          y1={0}
          y2={288}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0.042} stopColor="#003D9B" />
          <stop offset={0.042} stopColor="#003D9B" stopOpacity={0} />
        </linearGradient>
        <clipPath id="clip0_15_619">
          <rect width={288} height={288} fill="#fff" rx={8} />
        </clipPath>
      </defs>
    </svg>
  );
}
