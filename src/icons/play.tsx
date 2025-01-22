import { SVGProps } from "react";

export function IconPlay({
  pathProps,
  ...props
}: SVGProps<SVGSVGElement> & { pathProps?: SVGProps<SVGPathElement> }) {
  return (
    <svg
      width="14"
      height="16"
      viewBox="0 0 14 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        className="stroke-white"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.9423 8.2363L2.625 1.875V14.125L11.9423 8.2363Z"
        {...pathProps}
      />
    </svg>
  );
}
