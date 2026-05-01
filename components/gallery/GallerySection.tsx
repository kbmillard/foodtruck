"use client";

import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";

const SHOTS = [
  {
    src: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1200&q=80",
    alt: "Tacos on a platter — gallery photography for La Hamburguesa Loca",
  },
  {
    src: "https://images.unsplash.com/photo-1626082927739-455c2c2d2b3d?auto=format&fit=crop&w=1200&q=80",
    alt: "Quesabirria-style dish — gallery photography for La Hamburguesa Loca",
  },
  {
    src: "https://images.unsplash.com/photo-1573080496219-b47f71f29daa?auto=format&fit=crop&w=1200&q=80",
    alt: "Loaded fries — Papas Locas style gallery image",
  },
  {
    src: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    alt: "Grilled meat close-up — essence of the plancha",
  },
  {
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
    alt: "Mexican torta ingredients — editorial gallery frame",
  },
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    alt: "Restaurant atmosphere — late-night hospitality mood",
  },
] as const;

export function GallerySection() {
  return (
    <section
      id="gallery"
      className="scroll-mt-[calc(var(--nav-h)+16px)] border-t border-white/10 py-24"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          kicker="Gallery"
          title="Heat you can almost hear."
          align="center"
          subtitle="A rotating wall of color, char, and chrome — the quiet luxury is in the detail: blistered tortillas, melted edges, and salsa that catches the light."
        />
        <div className="mt-14 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {SHOTS.map((s, i) => (
            <div
              key={s.src}
              className={`relative mb-4 break-inside-avoid overflow-hidden rounded-3xl border border-white/10 ${
                i % 3 === 0 ? "aspect-[3/4]" : "aspect-square"
              }`}
            >
              <Image src={s.src} alt={s.alt} fill className="object-cover" sizes="400px" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
