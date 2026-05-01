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
    <section id="prologue" className="border-t border-white/10 bg-tortilla/10 py-24">
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
          className="relative mx-auto mt-10 flex w-full max-w-sm flex-col items-center sm:mt-12 sm:max-w-md"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[radial-gradient(ellipse_85%_70%_at_50%_35%,rgba(196,30,30,0.28),transparent_62%),radial-gradient(ellipse_90%_65%_at_50%_100%,rgba(36,19,45,0.55),transparent_68%)] opacity-95 blur-2xl sm:-inset-10"
          />
          <div className="relative z-10 w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.12] via-menu-plum/50 to-charcoal/80 p-6 shadow-[0_12px_48px_-12px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md sm:p-8">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.18] via-transparent to-transparent opacity-50"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-[42%] rounded-t-3xl bg-gradient-to-b from-white/25 to-transparent opacity-35"
            />
            <div className="relative mx-auto aspect-square w-[min(9.5rem,42vw)] sm:w-40">
              <Image
                src="/images/brand/prologue-logo.webp"
                alt="La Hamburguesa Loca — circular logo with LHL mark"
                fill
                className="object-contain drop-shadow-[0_6px_28px_rgba(0,0,0,0.5)]"
                sizes="(max-width: 640px) 152px, 160px"
              />
            </div>
            <p className="relative mt-4 text-center text-[10px] uppercase tracking-editorial text-cream/55">
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
              className="rounded-2xl border border-white/10 bg-charcoal/60 px-5 py-4 text-center text-xs uppercase tracking-editorial text-cream/80"
            >
              {s}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
