"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "home" },
  { href: "/now", label: "now" },
  { href: "/about", label: "about" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main"
      className="fixed top-5 right-5 z-50 flex gap-6 rounded-full bg-paper/75 px-4 py-2 backdrop-blur-sm md:top-7 md:right-9"
    >
      {NAV_LINKS.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          aria-current={pathname === href ? "page" : undefined}
          className={`label transition-colors hover:text-ink ${
            pathname === href ? "text-ink" : ""
          }`}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
