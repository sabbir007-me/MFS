import Link from "next/link";
import { forwardRef } from "react";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "soft" | "danger" | "brand";
type Size = "sm" | "md" | "lg" | "icon";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold whitespace-nowrap transition-[background-color,color,box-shadow,filter,translate] duration-150 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2";

/* Depth comes from .btn-3d / .btn-3d-light in globals.css; --btn-glow tints the glow under each slab. */
const variants: Record<Variant, string> = {
  primary: "btn-3d bg-accent-600 text-accent-fg [--btn-glow:color-mix(in_srgb,var(--accent-600)_60%,transparent)] hover:brightness-105",
  brand: "btn-3d bg-brand-600 text-white [--btn-glow:rgb(13_128_101/0.6)] hover:bg-brand-500",
  secondary: "btn-3d bg-slate-900 text-white hover:bg-slate-800",
  outline: "btn-3d-light border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900",
  ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900 active:translate-y-px",
  soft: "btn-3d-light bg-accent-50 text-accent-700 hover:bg-accent-100",
  danger: "btn-3d bg-rose-600 text-white [--btn-glow:rgb(225_29_72/0.55)] hover:bg-rose-700",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-6 text-base",
  icon: "h-10 w-10 p-0",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", loading, fullWidth, className, children, disabled, type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(base, variants[variant], sizes[size], fullWidth && "w-full", className)}
      {...props}
    >
      {loading && <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden />}
      {children}
    </button>
  );
});

interface ButtonLinkProps extends React.ComponentProps<typeof Link> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

export function ButtonLink({ variant = "primary", size = "md", fullWidth, className, ...props }: ButtonLinkProps) {
  return <Link className={cn(base, variants[variant], sizes[size], fullWidth && "w-full", className)} {...props} />;
}
