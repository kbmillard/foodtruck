"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HERO_BACKGROUND_IMAGE } from "@/lib/data/hero-background";

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
      className="relative min-h-[520px] overflow-hidden border-t border-white/10 py-24 sm:min-h-[580px]"
    >
      <Image
        src={HERO_BACKGROUND_IMAGE}
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        aria-hidden
      />
      {/* Same treatment as Hero: plate + atmosphere */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/20" />
      {/* Extra top scrim so Prologue copy stays legible (text sits higher than Hero headline) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[52%] bg-gradient-to-b from-charcoal via-charcoal/65 to-transparent" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-5 sm:px-8">
        <SectionHeading
          kicker="Prologue"
          title="Quiet confidence. Loud flavors."
          subtitle="La Hamburguesa Loca is a sixteen-year, family-owned Mexican kitchen in Kansas City — grown from a beloved food truck into a dual rhythm: a dependable restaurant on Southwest Blvd and a truck that still rolls for late-night crowds."
          align="center"
        />

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-10 flex flex-col items-center sm:mt-12"
        >
          <div className="relative aspect-square w-[min(9.5rem,42vw)] max-w-[160px] sm:w-40">
            <Image
              src="/images/brand/prologue-logo.webp"
              alt="La Hamburguesa Loca — circular logo with LHL mark"
              fill
              className="object-contain drop-shadow-[0_12px_36px_rgba(0,0,0,0.65)]"
              sizes="(max-width: 640px) 152px, 160px"
            />
          </div>
          <p className="mt-7 text-center text-[10px] uppercase tracking-editorial text-cream/70">
            Family-owned in KC
          </p>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.06 } },
          }}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:mt-14"
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
