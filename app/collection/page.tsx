import type { Metadata } from "next";
import ProjectGrid from "@/components/ProjectGrid";

export const metadata: Metadata = {
  title: "Collection",
};

export default function CollectionPage() {
  return (
    <div className="pt-4 pb-4">
      <section className="max-w-[46ch]">
        <h1 className="font-display text-[clamp(26px,3.4vw,34px)] font-medium leading-tight text-ink">
          The collection
        </h1>
        <p className="mt-6 text-ink-soft">
          Things I&rsquo;ve designed, built, or shipped. A running record of
          what I&rsquo;ve been working on.
        </p>
      </section>

      <hr className="my-12 border-0 border-t border-dashed border-hairline-strong" />

      <ProjectGrid />
    </div>
  );
}
