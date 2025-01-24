import { SVGProps } from "react";

export function IconCheck({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="14"
      height="11"
      viewBox="0 0 14 11"
      stroke="white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      {...props}
    >
      <path d="M1 5L5 9L13 1" stroke-width="2" />
    </svg>
  );
}
