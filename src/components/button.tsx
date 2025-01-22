import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

const variants = {
  solid: 'bg-[#242424] h-14 w-62 text-base font-normal leading-6 tracking-[4px]',
  outline: 'bg-[#24242480] h-14 w-62 border-solid border-1 border-[#FFFFFF80] font-normal leading-6 tracking-[4px]',
  text: 'h-14 w-50 font-normal leading-6 tracking-[4px]',
};

export type Variant = keyof typeof variants;
type ReactButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
type Props = ReactButtonProps & { variant: Variant };

export default function Button({ className, variant, ...otherProps }: Props) {
  return <button className={`${className ?? ''} ${variants[variant]} `} {...otherProps} />;
}
