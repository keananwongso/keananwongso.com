"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/about", label: "about" },
  { href: "/resume", label: "resume" },
];

export default function Nav() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <header className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 py-8 md:py-10">
      <Link
        href="/"
        className="font-display text-lg font-medium text-ink transition-opacity hover:opacity-70"
      >
        keanan.w
      </Link>
      <nav aria-label="Main" className="flex gap-6 md:gap-8">
        {NAV_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            aria-current={isActive(href) ? "page" : undefined}
            className={`font-display text-[15px] transition-colors hover:text-ink ${
              isActive(href) ? "text-ink" : "text-ink-muted"
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
