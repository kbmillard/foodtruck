"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";

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
    <section id="prologue" className="border-t border-white/10 bg-charcoal py-24">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
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
          {/* No outer card — only a circular iOS-style glass disc on the section charcoal */}
          <div className="relative flex flex-col items-center">
            <div className="relative grid h-[min(11rem,46vw)] w-[min(11rem,46vw)] max-h-[180px] max-w-[180px] place-items-center sm:h-44 sm:w-44">
              <div
                aria-hidden
                className="absolute inset-0 rounded-full border border-white/20 bg-gradient-to-b from-white/[0.2] via-white/[0.07] to-white/[0.03] shadow-[0_14px_44px_-12px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.45),inset_0_-10px_24px_-14px_rgba(0,0,0,0.4)] backdrop-blur-2xl backdrop-saturate-[1.4]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-white/35 via-white/5 to-transparent opacity-45 mix-blend-overlay"
              />
              <div className="relative z-10 aspect-square w-[72%]">
                <Image
                  src="/images/brand/prologue-logo.webp"
                  alt="La Hamburguesa Loca — circular logo with LHL mark"
                  fill
                  className="object-contain drop-shadow-[0_6px_24px_rgba(0,0,0,0.45)]"
                  sizes="(max-width: 640px) 140px, 144px"
                />
              </div>
            </div>

            <p className="mt-7 text-center text-[10px] uppercase tracking-editorial text-cream/45">
              Family-owned in KC
            </p>
          </div>
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
              className="rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-center text-xs uppercase tracking-editorial text-cream/80"
            >
              {s}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
