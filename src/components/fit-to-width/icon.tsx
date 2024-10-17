import type { SVGProps } from "react";

export function FitToWidth(props: SVGProps<SVGSVGElement>) {
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
        fill-rule="evenodd"
        d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM3.5 12.01L8 9v6l-4.5-2.99zM16 15V9l4.5 3.01L16 15zM3 19.01h18V4.99H3v14.02z"
        clip-rule="evenodd"
      />
    </svg>
  );
}
