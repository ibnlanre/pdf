import type { SVGProps } from "react";

export function RotateAntiClockwise(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
      role="none"
      {...props}
    >
      <path
        d="M13 22q-1.275 0-2.5-.35T8.2 20.6l1.45-1.45q.775.425 1.625.638T13 20q2.925 0 4.962-2.038T20 13t-2.037-4.962T13 6h-.15l1.55 1.55L13 9L9 5l4-4l1.4 1.45L12.85 4H13q3.75 0 6.375 2.625T22 13q0 1.875-.712 3.513t-1.925 2.85t-2.85 1.925T13 22m-6-3l-6-6l6-6l6 6zm0-2.85L10.15 13L7 9.85L3.85 13zM7 13"
        fill="currentColor"
      />
    </svg>
  );
}
