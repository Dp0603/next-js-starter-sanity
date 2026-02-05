import Link from "next/link";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  to?: string;
  type?: "button" | "submit";
  variant?: "dark" | "light" | "outline" | "outlineWhite";
  className?: string;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  to,
  type = "button",
  variant = "dark",
  className = "",
  disabled = false,
}) => {
  const base =
    "inline-flex items-center justify-center gap-3 px-8 py-4 font-bold uppercase tracking-widest text-xs transition-colors";

  const variants = {
    dark: "bg-[#14253f] text-white hover:bg-[#cd7d51]",
    light: "bg-white text-[#14253f] hover:bg-neutral-100",
    outline: "border border-[#14253f] text-[#14253f] hover:bg-[#14253f] hover:text-white",

    // 👇 NEW VARIANT: White Outline for Hero Section
    outlineWhite: "border border-white text-white bg-transparent hover:bg-white hover:text-[#14253f]",
  };

  // Safe fallback if variant is somehow undefined
  const variantClasses = variants[variant] || variants.dark;
  const classes = `${base} ${variantClasses} ${className}`;

  if (to) {
    return (
      <Link href={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} >
      {children}
    </button >
  );
};

export default Button;