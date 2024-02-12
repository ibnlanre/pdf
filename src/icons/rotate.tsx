import type { SVGProps } from "react";

export function Rotate(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      {...props}
    >
      <path
        fill='currentColor'
        d='M4.56 10.642L6.355 3.95l1.9 1.9a9.004 9.004 0 0 1 11.156 1.256l-1.414 1.415a7.003 7.003 0 0 0-8.28-1.21l1.537 1.538zm14.88 2.716l-1.794 6.692l-1.9-1.9A9.003 9.003 0 0 1 4.59 16.894l1.414-1.415a7.003 7.003 0 0 0 8.28 1.21l-1.537-1.538z'
      />
    </svg>
  );
}
