import { LINKS } from "@/lib/content";

const FOOTER_LINKS = [
  { href: LINKS.linkedin, label: "linkedin", external: true },
  { href: LINKS.github, label: "github", external: true },
  { href: LINKS.email, label: "email", external: false },
  { href: LINKS.resume, label: "résumé", external: true },
];

export default function Footer() {
  return (
    <footer className="px-6 pb-10 md:px-20">
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 border-t-[0.5px] border-hairline pt-8">
        {FOOTER_LINKS.map(({ href, label, external }) => (
          <a
            key={label}
            href={href}
            className="label transition-colors hover:text-ink"
            {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
          >
            {label}
          </a>
        ))}
      </div>
    </footer>
  );
}
