import { SVGProps } from "react";

export function IconPlus(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="15"
      height="14"
      viewBox="0 0 15 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M7.5 0V14" stroke="white" />
      <path d="M14.5 7L0.5 7" stroke="white" />
    </svg>
  );
}
