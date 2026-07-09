import { HERO } from "@/lib/content";

export default function Hero() {
  return (
    <section className="flex min-h-[88svh] flex-col justify-center px-6 md:min-h-svh md:px-20">
      <p className="mono-label">{HERO.label}</p>
      <h1 className="mt-6 max-w-[28ch] font-display text-[clamp(34px,5.5vw,60px)] font-normal leading-[1.02] tracking-[-0.01em] text-ink">
        {HERO.greeting}
      </h1>
    </section>
  );
}
