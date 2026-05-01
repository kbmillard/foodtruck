"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function StorySection() {
  return (
    <section
      id="story"
      className="scroll-mt-[calc(var(--nav-h)+12px)] border-t border-white/10 bg-tortilla/10 py-24"
    >
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            kicker="Family story"
            title="Sixteen years of flame, laughter, and KC corners."
            subtitle="We are not just another taco truck — we are a family-owned Mexican restaurant and KC food truck with the same DNA: bold salsas, careful masa, burgers built like celebrations, and a crew that remembers your order."
          />
          <p className="mt-6 text-sm leading-relaxed text-cream/80">
            La Hamburguesa Loca grew from curbside lines into a dual home: the dependable dining room
            on Southwest Blvd and the truck that still parks where the night is loudest. Authentic
            Mexican food is the throughline — from quesabirria Sundays to midnight tortas after the
            show.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10"
        >
          <Image
            src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80"
            alt="Family-style Mexican dinner spread — storytelling imagery for La Hamburguesa Loca"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 560px, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
          <p className="absolute bottom-6 left-6 right-6 text-sm text-cream/85">
            Community-rooted, energetic, and still personal — the same hospitality whether you meet
            us through the pickup window or at the truck.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
