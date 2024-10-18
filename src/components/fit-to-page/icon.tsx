import type { SVGProps } from "react";

export function FitToPage(props: SVGProps<SVGSVGElement>) {
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
        d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 10l3.01-4.5L15 10H9zm0 4h6l-2.99 4.5L9 14zm-6 5.01h18V4.99H3v14.02z"
        clip-rule="evenodd"
        fill="currentColor"
      />
    </svg>
  );
}
