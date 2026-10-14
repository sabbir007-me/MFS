import Link from "next/link";
import {
  ArrowDownLeft,
  ArrowDownToLine,
  ArrowRight,
  Banknote,
  BriefcaseBusiness,
  CircleCheck,
  FileClock,
  KeyRound,
  LockKeyhole,
  MonitorSmartphone,
  ReceiptText,
  ScanQrCode,
  ScrollText,
  Send,
  ShieldCheck,
  Smartphone,
  Store,
  UserRound,
} from "lucide-react";
import { LogoMark } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";
import { ParallaxScene, Tilt } from "@/components/ui/depth";
import { msg, type Translate } from "@/lib/i18n/core";
import { getT } from "@/lib/i18n/server";
import { SiteFooter, SiteHeader } from "./site-header";

const SERVICES = [
  { icon: Send, title: msg("Send Money"), text: msg("Transfer to any Kosh wallet in seconds. Free up to ৳1,000 per transfer.") },
  { icon: ArrowDownToLine, title: msg("Cash In"), text: msg("Deposit cash at a verified agent and see it in your wallet instantly.") },
  { icon: Banknote, title: msg("Cash Out"), text: msg("Withdraw cash from agents nearby with a clear, upfront 1.85% charge.") },
  { icon: Smartphone, title: msg("Mobile Recharge"), text: msg("Top up any prepaid or postpaid number on every operator.") },
  { icon: ReceiptText, title: msg("Bill Payment"), text: msg("Electricity, gas, water, internet and school fees — paid on time.") },
  { icon: Store, title: msg("Merchant Payment"), text: msg("Scan a QR or enter a Merchant ID to pay at shops and restaurants.") },
  { icon: FileClock, title: msg("Transaction History"), text: msg("Search, filter and download every transaction with a receipt.") },
  { icon: ShieldCheck, title: msg("Secure Account"), text: msg("PIN on every payment, OTP for large ones, and full device control.") },
];

const AUDIENCES = [
  {
    icon: UserRound,
    title: msg("Personal"),
    text: msg("For everyday customers."),
    points: [msg("Send, receive and save"), msg("Pay bills and merchants"), msg("Instant e-KYC with NID + selfie")],
    href: "/register/personal",
    cta: msg("Open a personal account"),
    accent: "bg-emerald-50 text-emerald-700",
    glow: "bg-emerald-400/25",
  },
  {
    icon: BriefcaseBusiness,
    title: msg("Agent"),
    text: msg("For authorised service points."),
    points: [msg("Cash In / Cash Out counter"), msg("Commission on every service"), msg("Float & settlement tools")],
    href: "/register/agent",
    cta: msg("Apply to become an agent"),
    accent: "bg-amber-50 text-amber-700",
    glow: "bg-amber-400/25",
  },
  {
    icon: Store,
    title: msg("Merchant"),
    text: msg("For shops, restaurants and online stores."),
    points: [msg("Static & dynamic QR codes"), msg("Sales analytics and refunds"), msg("Daily settlement to your bank")],
    href: "/register/merchant",
    cta: msg("Start accepting payments"),
    accent: "bg-indigo-50 text-indigo-700",
    glow: "bg-indigo-400/25",
  },
];

const SECURITY = [
  { icon: KeyRound, title: msg("PIN + step-up OTP"), text: msg("Every payment needs your PIN. Large payments also need a one-time code.") },
  { icon: LockKeyhole, title: msg("Server-side checks"), text: msg("Balances, fees and permissions are verified on the server — never trusted from the app.") },
  { icon: MonitorSmartphone, title: msg("Device control"), text: msg("See active sessions and sign out of any device, or all of them at once.") },
  { icon: ScrollText, title: msg("Full audit trail"), text: msg("Sign-ins, payments and admin actions are recorded in an append-only log.") },
];

/** CSS custom properties are not in React's style typings. */
const vars = (v: Record<string, string | number>) => v as React.CSSProperties;

export async function LandingPage() {
  const t = await getT();
  return (
    <div className="bg-white">
      <SiteHeader />

      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_80%_10%,rgba(25,160,124,0.16),transparent_70%),radial-gradient(40%_40%_at_10%_90%,rgba(42,120,214,0.08),transparent_70%)]" aria-hidden />
        <div className="grid-floor -z-10" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl items-center gap-6 px-4 pb-20 pt-12 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pb-28 lg:pt-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800 shadow-raised">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden /> {t("Mobile financial services for everyone")}
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              {t("Simple. Secure.")}
              <br />
              <span className="text-3d text-brand-600">{t("Smarter Payments.")}</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-600">
              {t("Send money, pay bills, cash in and out at agents, and pay merchants with a scan — all from one wallet that protects every taka.")}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/register" variant="brand" size="lg">
                {t("Create Account")} <ArrowRight className="h-4 w-4" aria-hidden />
              </ButtonLink>
              <ButtonLink href="/login" variant="outline" size="lg">
                {t("Login")}
              </ButtonLink>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
              {[t("PIN on every payment"), t("Free transfers up to ৳1,000"), t("Agents, merchants & billers")].map((point) => (
                <li key={point} className="flex items-center gap-2">
                  <CircleCheck className="h-4 w-4 text-brand-600" aria-hidden /> {point}
                </li>
              ))}
            </ul>
          </div>
          <HeroScene t={t} />
        </div>
      </section>

      {/* Pricing facts — raised tiles that overlap the hero's edge */}
      <section className="relative z-10 -mt-14 px-4 sm:px-6 lg:px-8">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {[
            ["৳0", t("to send up to ৳1,000")],
            ["1.85%", t("cash out charge, shown upfront")],
            [t("5-digit"), t("PIN with OTP step-up")],
            ["24/7", t("transfers and payments")],
          ].map(([v, l]) => (
            <div key={l} className="flex flex-col-reverse rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-depth backdrop-blur sm:p-6">
              <dt className="mt-1 text-sm text-slate-500">{l}</dt>
              <dd className="text-3d text-2xl font-extrabold tracking-tight text-brand-700 [--extrude:var(--color-brand-900)] sm:text-3xl">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Services */}
      <section id="services" className="scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">{t("Services")}</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{t("Everything your money needs to do")}</h2>
            <p className="mt-3 text-slate-600">{t("One wallet for the payments you make every day, with fees you can see before you confirm.")}</p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map(({ icon: Icon, title, text }) => (
              <Tilt key={title} max={9} className="tilt-light group rounded-2xl border border-slate-200/80 bg-white p-6">
                <span className="tilt-pop block w-fit [--z:44px]">
                  <span className="icon-3d grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                </span>
                <h3 className="tilt-pop mt-4 font-semibold text-slate-900 [--z:24px]">{t(title)}</h3>
                <p className="tilt-pop mt-1.5 text-sm text-slate-500 [--z:12px]">{t(text)}</p>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      {/* Audiences */}
      <section className="relative isolate overflow-hidden bg-slate-950 text-white">
        <div className="grid-floor -z-10 [--grid-line:rgb(255_255_255/0.07)]" aria-hidden />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_50%_0%,rgba(25,160,124,0.22),transparent_70%)]" aria-hidden />
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-300">{t("One platform, three experiences")}</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{t("Built for customers, agents and merchants")}</h2>
            <p className="mt-3 text-slate-400">{t("Each account type has its own sign-up checks, its own dashboard and its own permissions.")}</p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {AUDIENCES.map(({ icon: Icon, title, text, points, href, cta, accent, glow }) => (
              <Tilt
                key={title}
                max={6}
                className="flex flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6 [--glare:rgb(255_255_255/0.22)] [--tilt-shadow-active:inset_0_1px_0_rgb(255_255_255/0.12),0_40px_70px_-30px_rgb(0_0_0/0.9)] [--tilt-shadow:inset_0_1px_0_rgb(255_255_255/0.1),0_24px_48px_-28px_rgb(0_0_0/0.8)]"
              >
                <span className={`pointer-events-none absolute -top-8 left-6 h-24 w-24 rounded-full blur-2xl ${glow}`} aria-hidden />
                <span className={`tilt-pop icon-3d relative grid h-12 w-12 place-items-center rounded-xl [--z:48px] ${accent}`}>
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="tilt-pop mt-4 text-xl font-semibold [--z:28px]">{t(title)}</h3>
                <p className="mt-1 text-sm text-slate-400">{t(text)}</p>
                <ul className="mt-5 flex-1 space-y-2.5 text-sm text-slate-200">
                  {points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" aria-hidden /> {t(p)}
                    </li>
                  ))}
                </ul>
                <Link href={href} className="tilt-pop mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-white hover:text-brand-300 [--z:20px]">
                  {t(cta)} <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">{t("Security")}</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{t("Protection at every step")}</h2>
            <p className="mt-3 text-slate-600">
              {t("Security isn't a screen in the app — it's how every request is handled. Your role, your balance and every fee are decided on the server, every time.")}
            </p>
            <SecurityStack t={t} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {SECURITY.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-slate-200/80 bg-gradient-to-b from-white to-slate-50 p-5 shadow-card">
                <span className="icon-3d grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-3 font-semibold text-slate-900">{t(title)}</h3>
                <p className="mt-1 text-sm text-slate-500">{t(text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative isolate scroll-mt-20 overflow-hidden border-t border-slate-100 bg-gradient-to-b from-brand-50/60 to-white">
        <div className="grid-floor -z-10 [--grid-line:rgb(13_128_101/0.1)]" aria-hidden />
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-white bg-white/80 px-6 py-12 text-center shadow-depth backdrop-blur sm:px-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">{t("About Kosh")}</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{t("Financial services that fit in your pocket")}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              {t("Kosh (কোষ — a treasury) connects customers, neighbourhood agents and local businesses on one trusted network. Our goal is simple: make every payment fast, fair and safe, whether you're in a city or a village.")}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href="/register" variant="brand" size="lg">
                {t("Create your account")}
              </ButtonLink>
              <ButtonLink href="/help" variant="outline" size="lg">
                {t("Visit Help & Support")}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

/**
 * The hero's 3D stage: an extruded phone turned toward the headline, a wallet
 * card behind it and notifications floating in front, all on one rig that the
 * pointer turns. Pure CSS — no images or WebGL to load.
 */
function HeroScene({ t }: { t: Translate }) {
  return (
    <ParallaxScene className="relative mx-auto h-[560px] w-full max-w-md sm:h-[640px] lg:max-w-lg" aria-hidden>
      {/* Contact shadow on the floor; breathes with the float. */}
      <div className="float-shadow absolute bottom-2 left-1/2 h-12 w-72 -translate-x-1/2 rounded-[50%] bg-brand-950/45 blur-2xl" />
      <div className="float-3d absolute inset-0 grid scale-[0.86] place-items-center sm:scale-100">
        <div className="scene-rig relative">
          {/* Wallet card, set back behind the phone */}
          <div
            className="absolute -left-40 top-10 h-[168px] w-[268px] rounded-2xl bg-gradient-to-br from-brand-400 via-brand-600 to-brand-900 p-5 text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_30px_50px_-20px_rgb(5_38_32/0.6)]"
            style={{ transform: "translateZ(-130px) rotateZ(-10deg)" }}
          >
            <div className="flex items-center justify-between">
              <LogoMark className="h-8 w-8" />
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-100">{t("Wallet")}</span>
            </div>
            <div className="mt-5 h-8 w-11 rounded-md bg-gradient-to-br from-amber-100 via-amber-300 to-amber-500 shadow-[inset_0_0_0_1px_rgb(120_53_15/0.25)]" />
            <p className="mt-4 font-mono text-sm tracking-[0.25em] text-brand-50">•••• 4821</p>
          </div>

          <Phone3D t={t} />

          <div className="absolute -left-16 top-[58%] hidden rounded-2xl bg-white px-4 py-3 shadow-float ring-1 ring-slate-200/70 sm:block" style={{ transform: "translateZ(90px)" }}>
            <p className="flex items-center gap-2 text-xs font-semibold text-slate-900">
              <CircleCheck className="h-4 w-4 text-emerald-600" /> {t("Payment received")}
            </p>
            <p className="mt-0.5 text-[11px] text-slate-500">{t("৳1,250.00 via QR · just now")}</p>
          </div>
          <div className="absolute -right-14 top-[24%] hidden rounded-2xl bg-white px-4 py-3 shadow-float ring-1 ring-slate-200/70 sm:block" style={{ transform: "translateZ(60px)" }}>
            <p className="flex items-center gap-2 text-xs font-semibold text-slate-900">
              <ShieldCheck className="h-4 w-4 text-brand-600" /> {t("PIN verified")}
            </p>
            <p className="mt-0.5 text-[11px] text-slate-500">{t("OTP required above ৳10,000")}</p>
          </div>
          <div className="absolute -right-8 bottom-10 transform-3d" style={{ transform: "translateZ(140px)" }}>
            <Coin />
          </div>
        </div>
      </div>
    </ParallaxScene>
  );
}

const SLABS = [1, 2, 3, 4, 5, 6, 7, 8];

/** Phone with a real body: eight slabs behind the bezel read as a metal edge when turned. */
function Phone3D({ t }: { t: Translate }) {
  return (
    <div className="phone-3d relative w-[300px] rounded-[44px] border-[10px] border-slate-900 bg-slate-900 sm:w-[320px]">
      {SLABS.map((i) => (
        <span key={i} className="phone-3d__slab" style={vars({ "--i": i, background: i === 1 ? "#475569" : i === SLABS.length ? "#0f172a" : "#334155" })} />
      ))}
      <div className="phone-3d__screen relative overflow-hidden rounded-[34px] bg-canvas">
        <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-slate-900" />
        <div className="bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 px-5 pb-6 pt-10 text-white">
          <p className="text-xs text-brand-100">{t("Good morning, {name}", { name: "Nadia" })}</p>
          <p className="mt-3 text-[11px] uppercase tracking-wider text-brand-100">{t("Available balance")}</p>
          <p className="mt-1 text-3xl font-bold tracking-tight">৳24,580.50</p>
          <div className="mt-4 flex gap-2 text-[11px]">
            <span className="rounded-full bg-white/15 px-2.5 py-1">{t("Savings")} ৳85,000</span>
            <span className="rounded-full bg-white/15 px-2.5 py-1">{t("Pending")} ৳5,000</span>
          </div>
        </div>
        <div className="-mt-4 mx-4 grid grid-cols-4 gap-2 rounded-2xl bg-white p-3 shadow-card">
          {[
            [Send, t("Send")],
            [Banknote, t("Cash Out")],
            [ScanQrCode, t("Pay")],
            [Smartphone, t("Recharge")],
          ].map(([Icon, l]) => {
            const I = Icon as typeof Send;
            return (
              <div key={l as string} className="flex flex-col items-center gap-1">
                <span className="icon-3d grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-700">
                  <I className="h-[18px] w-[18px]" />
                </span>
                <span className="text-[10px] font-semibold text-slate-600">{l as string}</span>
              </div>
            );
          })}
        </div>
        <div className="space-y-2 px-4 pb-6 pt-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">{t("Recent")}</p>
          {[
            { icon: ArrowDownLeft, label: t("Received from {name}", { name: "Tanvir" }), a: "+৳2,500.00", in: true },
            { icon: Store, label: "Spice Garden Restaurant", a: "−৳1,240.00", in: false },
            { icon: ReceiptText, label: t("DESCO Electricity"), a: "−৳1,865.00", in: false },
          ].map(({ icon: I, label, a, in: incoming }) => (
            <div key={label} className="flex items-center gap-3 rounded-xl bg-white p-2.5 shadow-card">
              <span className={`grid h-8 w-8 place-items-center rounded-lg ${incoming ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-600"}`}>
                <I className="h-4 w-4" />
              </span>
              <span className="flex-1 truncate text-xs font-medium text-slate-800">{label}</span>
              <span className={`text-xs font-semibold ${incoming ? "text-emerald-700" : "text-slate-900"}`}>{a}</span>
            </div>
          ))}
        </div>
        {/* Glass sheen that slides with the pointer */}
        <div className="pointer-events-none absolute -inset-1/4 bg-[linear-gradient(115deg,rgb(255_255_255/0.22)_0%,transparent_28%)] [transform:translateX(calc(var(--px)*-6%))]" />
      </div>
    </div>
  );
}

const EDGES = [0, 1, 2, 3, 4, 5, 6, 7, 8];

/** A spinning taka coin: front and back faces around a stack of discs for the rim. */
function Coin() {
  return (
    <div className="coin-3d spin-y">
      {EDGES.map((i) => (
        <span key={i} className="coin-3d__edge" style={vars({ "--i": i })} />
      ))}
      <span className="coin-3d__face coin-3d__face--front">৳</span>
      <span className="coin-3d__face coin-3d__face--back">৳</span>
    </div>
  );
}

/**
 * Security as physical layers: the audit trail at the base, PIN on top. The
 * plates spread apart on hover so each layer can be seen.
 */
function SecurityStack({ t }: { t: Translate }) {
  const plates = [
    { ...SECURITY[3], face: "bg-white text-slate-700", edge: "#cbd5e1" },
    { ...SECURITY[2], face: "bg-slate-50 text-slate-700", edge: "#cbd5e1" },
    { ...SECURITY[1], face: "bg-brand-50 text-brand-800", edge: "#76d7b8" },
    { ...SECURITY[0], face: "bg-gradient-to-br from-brand-500 to-brand-700 text-white", edge: "#0c4339" },
  ];
  return (
    <div className="iso-wrap relative mt-4 grid h-[260px] w-full place-items-center sm:mt-6 sm:h-[340px]" aria-hidden>
      <div className="iso-stack relative h-44 w-44 sm:h-52 sm:w-52">
        {plates.map(({ icon: Icon, title, face, edge }, i) => (
          <div key={title} className={`iso-plate flex items-end p-4 ${face}`} style={vars({ "--i": i, "--edge": edge })}>
            <span className="flex items-center gap-2 text-xs font-bold leading-tight sm:text-sm">
              <Icon className="h-5 w-5 shrink-0" />
              {t(title)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
