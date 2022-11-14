import { forwardRef } from "react";
import tw from "tailwind-styled-components";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  variant?: keyof typeof variants;
  className?: string;
};

const variants = {
  primary: "bg-blue",
  outlined: "bg-transparent border border-main-300",
  danger: "bg-transparent border border-red-400 text-red-400",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { text, className, type = "button", variant = "primary", ...props },
    ref
  ) => {
    const Button = tw.button`
  text-slate-100
  font-medium
  px-8 
  py-1
  rounded-md
  ${(p: { $variant: keyof typeof variants }) => p.$variant}
    `;

    return (
      <Button
        className={className}
        type={type}
        ref={ref}
        $variant={variants[variant]}
        {...props}
      >
        {text}
      </Button>
    );
  }
);

export default Button;
