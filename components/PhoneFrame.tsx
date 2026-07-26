/**
 * A pure-CSS iPhone frame. Wraps a portrait screenshot so it reads as a real
 * device (bezel, Dynamic Island, side buttons) instead of a cropped rectangle.
 */
export default function PhoneFrame({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[9/19.5] rounded-[2.2rem] bg-[#0e0e11] p-[3px] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.35)] ring-1 ring-black/10 ${className}`}
    >
      {/* side buttons */}
      <span className="absolute -left-[2px] top-[22%] h-8 w-[2px] rounded-l bg-[#0e0e11]" />
      <span className="absolute -left-[2px] top-[33%] h-12 w-[2px] rounded-l bg-[#0e0e11]" />
      <span className="absolute -right-[2px] top-[28%] h-14 w-[2px] rounded-r bg-[#0e0e11]" />

      {/* screen */}
      <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="h-full w-full object-cover object-top" />
        {/* Dynamic Island */}
        <div className="absolute left-1/2 top-2 h-[18px] w-[32%] -translate-x-1/2 rounded-full bg-black" />
      </div>
    </div>
  );
}
