import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mx-auto w-full max-w-3xl px-6 pb-10 pt-20">
      <div className="flex items-center justify-between border-t-[0.5px] border-hairline pt-6">
        <span className="label">© 2026 Keanan Wongso</span>
        <Link href="/" className="label transition-colors hover:text-ink">
          Back to top ↑
        </Link>
      </div>
    </footer>
  );
}
