import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    // A key cap: a darker base peeks out below the face, the top half catches
    // the light, and the glyph is embossed with a 1px shadow.
    <svg viewBox="0 0 40 40" className={cn("h-9 w-9 drop-shadow-[0_4px_6px_rgb(13_128_101/0.35)]", className)} aria-hidden>
      <rect y="2.5" width="40" height="37.5" rx="12" fill="#0c4339" />
      <rect width="40" height="37" rx="12" fill="#0d8065" />
      <rect x="1.5" y="1" width="37" height="17" rx="10.5" fill="#fff" fillOpacity="0.12" />
      <g stroke="#0c4339" strokeOpacity="0.55" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" transform="translate(0 1.25)">
        <path d="M13 10v17" />
        <path d="M27.5 10 17.5 19.5 28 28" />
      </g>
      <path d="M13 10v17" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      <path d="M27.5 10 17.5 19.5 28 28" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="29.5" cy="10" r="3" fill="#ade9d3" />
    </svg>
  );
}

export function Logo({
  href = "/",
  tone = "dark",
  suffix,
  className,
}: {
  href?: string;
  tone?: "dark" | "light";
  suffix?: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={cn("flex items-center gap-2.5", className)} aria-label="Kosh">
      <LogoMark />
      <span className={cn("text-xl font-extrabold tracking-tight", tone === "light" ? "text-white" : "text-slate-900")}>Kosh</span>
      {suffix}
    </Link>
  );
}
