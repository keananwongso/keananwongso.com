import type { Metadata } from "next";
import { NOW } from "@/lib/content";

export const metadata: Metadata = {
  title: "Now",
};

export default function NowPage() {
  return (
    <main className="flex-1 px-6 pt-36 pb-28 md:px-20 md:pt-44">
      <p className="mono-label">Now</p>
      <h1 className="mt-4 font-display text-[clamp(30px,4vw,38px)] font-normal text-ink">
        What I&rsquo;m doing now
      </h1>

      <p className="mt-10 max-w-[40ch]">
        Building client deployments at Covena. Running partner outreach for
        BizTech. Second-year CS courseload. Reading, practicing, staying
        active.
      </p>

      <dl className="mt-16 max-w-[40ch] space-y-10">
        <div>
          <dt className="mono-label">Reading</dt>
          <dd className="mt-2">{NOW.reading}</dd>
        </div>
        <div>
          <dt className="mono-label">Practicing</dt>
          <dd className="mt-2">{NOW.practicing}</dd>
        </div>
        <div>
          <dt className="mono-label">Thinking about</dt>
          <dd className="mt-2">{NOW.thinkingAbout}</dd>
        </div>
      </dl>

      <p className="mono-label mt-16">Last updated {NOW.lastUpdated}</p>
    </main>
  );
}
