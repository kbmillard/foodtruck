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
          className="relative mx-auto mt-10 w-full max-w-sm sm:mt-12 sm:max-w-lg"
        >
          {/* Bloom outside the single panel — not a second card */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-8 rounded-[2.25rem] bg-[radial-gradient(ellipse_75%_60%_at_50%_42%,rgba(196,30,30,0.22),transparent_65%),radial-gradient(ellipse_85%_55%_at_50%_85%,rgba(36,19,45,0.45),transparent_70%)] opacity-90 blur-3xl sm:-inset-12"
          />

          {/* One unified glossy panel — logo and caption live directly on this surface */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-[0_20px_56px_-16px_rgba(0,0,0,0.72),inset_0_1px_0_rgba(255,255,255,0.07)]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#2a1f32] via-charcoal to-[#0f0a12]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_58%_72%_at_50%_44%,rgba(232,93,42,0.14),rgba(196,30,30,0.1)_38%,transparent_62%)]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_130%_100%_at_50%_50%,transparent_35%,rgba(0,0,0,0.5)_100%)]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.12] via-transparent to-[rgba(196,30,30,0.06)] opacity-90 mix-blend-soft-light"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-[38%] bg-gradient-to-b from-white/[0.14] to-transparent opacity-30"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              }}
            />

            <div className="relative z-10 flex flex-col items-center px-6 py-12 sm:px-10 sm:py-14">
              <div className="relative flex items-center justify-center">
                <div
                  aria-hidden
                  className="pointer-events-none absolute aspect-square w-[min(11.5rem,48vw)] max-w-[184px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,rgba(196,30,30,0.25)_45%,transparent_72%)] blur-xl sm:w-44"
                />
                <div className="relative aspect-square w-[min(9.5rem,42vw)] sm:w-40">
                  <Image
                    src="/images/brand/prologue-logo.webp"
                    alt="La Hamburguesa Loca — circular logo with LHL mark"
                    fill
                    className="object-contain drop-shadow-[0_8px_32px_rgba(0,0,0,0.55)]"
                    sizes="(max-width: 640px) 152px, 176px"
                  />
                </div>
              </div>
              <p className="mt-6 text-center text-[10px] uppercase tracking-editorial text-cream/50">
                Family-owned in KC
              </p>
            </div>
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
