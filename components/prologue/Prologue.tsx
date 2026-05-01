"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";

const LOGO = "/images/brand/prologue-logo.webp";

const STATS = [
  "16 Years Family-Owned",
  "2 Locations",
  "Open Late",
  "Online Ordering",
  "Food Truck Available",
  "Catering Ready",
] as const;

export function Prologue() {
  return (
    <section
      id="prologue"
      className="relative min-h-[520px] overflow-hidden py-24 sm:min-h-[580px]"
    >
      {/* Solid base — hero keeps the burger photo; Prologue uses only the mark as atmosphere */}
      <div className="pointer-events-none absolute inset-0 bg-charcoal" aria-hidden />

      {/* Big logo “plate” (hero parity): must sit UNDER light washes or 12% opacity + 3× charcoal layers reads as flat black */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden pt-[var(--nav-h)]">
        {/* Shift down: % of box height + room for fixed header when section meets viewport top */}
        <div className="relative aspect-square w-[min(165vw,72rem)] translate-y-[24%] sm:w-[min(150vw,80rem)] sm:translate-y-[28%] md:translate-y-[32%]">
          <Image
            src={LOGO}
            alt=""
            fill
            className="object-contain opacity-[0.34] saturate-[1.08] sm:opacity-[0.4]"
            sizes="100vw"
          />
        </div>
      </div>

      {/* Hero-style single wash + edge vignette — keep mid-field open so the mark reads */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/55 to-charcoal/10" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_70%_at_50%_38%,transparent_22%,rgba(26,26,26,0.35)_100%)]" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-5 sm:px-8">
        <SectionHeading
          title="Quiet confidence. Loud flavors."
          subtitle="La Hamburguesa Loca is a sixteen-year, family-owned Mexican kitchen in Kansas City — grown from a beloved food truck into a dual rhythm: a dependable restaurant on Southwest Blvd and a truck that still rolls for late-night crowds."
          align="center"
        />

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.06 } },
          }}
          className="mt-12 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3"
        >
          {STATS.map((s) => (
            <motion.li
              key={s}
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0 },
              }}
              className="rounded-2xl border border-white/20 bg-black/30 px-5 py-4 text-center text-xs uppercase tracking-editorial text-cream/85 backdrop-blur-sm"
            >
              {s}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
