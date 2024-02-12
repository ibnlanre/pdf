import type { SVGProps } from "react";

export function Scale(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      {...props}
    >
      <g fill='currentColor'>
        <path d='M4 6v6h2V8h4V6zm16 12h-6v-2h4v-4h2z' />
        <path
          fill-rule='evenodd'
          d='M4 2a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h16a4 4 0 0 0 4-4V6a4 4 0 0 0-4-4zm16 2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2'
          clip-rule='evenodd'
        />
      </g>
    </svg>
  );
}
