"use client";

const items = ["NEW DROP", "FLEXHAUS", "LOUIS VUITTON", "PRADA", "GOYARD", "NIKE", "DESIGNER SA", "GET FLEXED", "NEW DROP", "FLEXHAUS", "LOUIS VUITTON", "PRADA", "GOYARD", "NIKE", "DESIGNER SA", "GET FLEXED"];

export default function Ticker() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-flex-black text-flex-yellow overflow-hidden h-8 flex items-center">
      <div
        className="flex gap-12 whitespace-nowrap"
        style={{ animation: "marquee 20s linear infinite", width: "max-content" }}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-[10px] tracking-[0.4em] uppercase font-mono">
            {item} <span className="opacity-40">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
