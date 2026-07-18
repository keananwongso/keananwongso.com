import { HERO } from "@/lib/content";

export default function Hero() {
  return (
    <section className="flex min-h-[88svh] flex-col items-center justify-center px-6 text-center md:min-h-svh">
      <p className="label">{HERO.label}</p>
      <h1 className="mt-6 max-w-[22ch] font-display text-[clamp(30px,4.4vw,46px)] font-medium leading-[1.2] tracking-normal text-ink">
        {HERO.greeting}
      </h1>
    </section>
  );
}
