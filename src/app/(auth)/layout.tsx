import { BriefcaseBusiness, CircleCheck, Store, UserRound } from "lucide-react";
import { Logo, LogoMark } from "@/components/brand/logo";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { msg, type Translate } from "@/lib/i18n/core";
import { getT } from "@/lib/i18n/server";

/* Back to front, each in its role accent (see .theme-* in globals.css). */
const ROLE_CARDS = [
  { label: msg("Merchant"), icon: Store, face: "from-indigo-400 to-indigo-700", edge: "#312e81" },
  { label: msg("Agent"), icon: BriefcaseBusiness, face: "from-amber-300 to-amber-600", edge: "#92400e" },
  { label: msg("Personal"), icon: UserRound, face: "from-brand-400 to-brand-700", edge: "#0c4339" },
];

/** The three account types as a floating stack of cards, one sign-in above them all. */
function RoleCardStack({ t }: { t: Translate }) {
  return (
    <div className="relative mb-10 h-52 perspective-distant [@media(max-height:820px)]:hidden" aria-hidden>
      <div className="float-3d absolute inset-0">
        <div className="absolute left-10 top-2 h-32 w-56 transform-3d" style={{ transform: "rotateX(52deg) rotateZ(-30deg)" }}>
          {ROLE_CARDS.map(({ label, icon: Icon, face, edge }, i) => (
            <div
              key={label}
              className={`absolute inset-0 flex flex-col justify-between rounded-2xl bg-gradient-to-br p-4 text-white ${face}`}
              style={{
                transform: `translateZ(${i * 34}px)`,
                boxShadow: `inset 0 1px 0 rgb(255 255 255 / 0.35), -1px 1px 0 ${edge}, -2px 2px 0 ${edge}, -3px 3px 0 ${edge}, -4px 4px 0 ${edge}, -5px 5px 0 ${edge}, -24px 24px 30px rgb(0 0 0 / 0.35)`,
              }}
            >
              <div className="flex items-center justify-between">
                <LogoMark className="h-7 w-7 drop-shadow-none" />
                <Icon className="h-5 w-5 opacity-90" />
              </div>
              <span className="text-lg font-bold tracking-tight">{t(label)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const t = await getT();
  return (
    <div className="grid min-h-dvh lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <aside className="relative hidden overflow-hidden bg-brand-950 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_20%_0%,rgba(61,189,151,0.35),transparent_70%),radial-gradient(60%_50%_at_100%_100%,rgba(42,120,214,0.25),transparent_70%)]" aria-hidden />
        <div className="grid-floor [--grid-line:rgb(173_233_211/0.09)]" aria-hidden />
        <div className="relative">
          <Logo tone="light" />
        </div>
        <div className="relative max-w-md">
          <RoleCardStack t={t} />
          <h2 className="text-4xl font-bold leading-tight tracking-tight text-white">{t("One sign-in. The right dashboard for you.")}</h2>
          <p className="mt-4 text-brand-100/80">
            {t("Personal customers, agents and merchants all sign in here. Kosh checks your account type on the server and takes you to your own workspace.")}
          </p>
          <ul className="mt-8 space-y-3 text-sm text-brand-50">
            {[t("Mobile number or email sign-in"), t("One-time code when extra security is on"), t("Sign out of every device from your profile")].map((point) => (
              <li key={point} className="flex items-center gap-2.5">
                <CircleCheck className="h-4 w-4 text-brand-300" aria-hidden /> {point}
              </li>
            ))}
          </ul>
        </div>
        <p className="relative text-xs text-brand-200/60">{t("Demo product · fictional data · no real money moves.")}</p>
      </aside>
      <main className="flex flex-col bg-white">
        <div className="flex h-16 items-center justify-between px-6 lg:justify-end">
          <Logo className="lg:hidden" />
          <LanguageToggle />
        </div>
        <div className="flex flex-1 items-center justify-center px-4 py-10 sm:px-8">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </main>
    </div>
  );
}
