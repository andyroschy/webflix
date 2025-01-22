import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

const variants = {
  solid: '',
  outline: '',
  text: '',
};

export type Variant = keyof typeof variants;
type ReactButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
type Props = ReactButtonProps & { variant: Variant };

export default function Button({ className, variant, ...otherProps }: Props) {
  return <button className={`${className ?? ""} ${variants[variant]}`} {...otherProps} />;
}
