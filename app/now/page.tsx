import type { Metadata } from "next";
import { NOW } from "@/lib/content";

export const metadata: Metadata = {
  title: "Now",
};

export default function NowPage() {
  return (
    <main className="flex-1 px-6 pt-36 pb-28 md:px-20 md:pt-44">
      <p className="label">now</p>
      <h1 className="mt-4 font-display text-[clamp(28px,3.4vw,40px)] font-medium leading-[1.2] text-ink">
        what i&rsquo;m doing now
      </h1>

      <p className="mt-10 max-w-[40ch]">
        Building client deployments at Covena. Running partner outreach for
        BizTech. Second-year CS courseload. Reading, practicing, staying
        active.
      </p>

      <dl className="mt-16 max-w-[40ch] space-y-10">
        <div>
          <dt className="label">reading</dt>
          <dd className="mt-2">{NOW.reading}</dd>
        </div>
        <div>
          <dt className="label">practicing</dt>
          <dd className="mt-2">{NOW.practicing}</dd>
        </div>
        <div>
          <dt className="label">thinking about</dt>
          <dd className="mt-2">{NOW.thinkingAbout}</dd>
        </div>
      </dl>

      <p className="label mt-16">last updated {NOW.lastUpdated}</p>
    </main>
  );
}
