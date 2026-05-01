"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { useOrder } from "@/context/OrderContext";
import { cn } from "@/lib/utils/cn";

const LINKS: { label: string; id: string }[] = [
  { label: "Menu", id: "menu" },
  { label: "Story", id: "story" },
  { label: "Locations", id: "locations" },
  { label: "Catering", id: "catering" },
  { label: "Gallery", id: "gallery" },
  { label: "Hours", id: "hours" },
  { label: "Contact", id: "contact" },
];

export function EditorialNav() {
  const { scrollToSection, openOrderPanel } = useOrder();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const ids = LINKS.map((l) => l.id);
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.15, 0.35, 0.55] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const go = (id: string) => {
    scrollToSection(id);
    setOpen(false);
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-charcoal/80 backdrop-blur-md">
      <div className="mx-auto flex h-[var(--nav-h)] max-w-[1600px] items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex flex-1 items-center justify-start gap-2 sm:gap-4">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-white/10 p-2 text-cream sm:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <nav className="hidden flex-wrap items-center gap-x-5 gap-y-2 lg:flex">
            {LINKS.slice(0, 4).map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => go(l.id)}
                className={cn(
                  "text-[11px] uppercase tracking-editorial text-cream/70 transition hover:text-cream",
                  active === l.id && "text-cream",
                )}
              >
                {l.label}
              </button>
            ))}
          </nav>
        </div>

        <button
          type="button"
          onClick={() => scrollToSection("hero")}
          className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2"
          aria-label="Scroll to top"
        >
          <BrandLogo width={44} height={44} priority className="hidden sm:block" />
          <BrandLogo width={40} height={40} priority className="sm:hidden" />
        </button>

        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
          <nav className="hidden flex-wrap items-center justify-end gap-x-5 lg:flex">
            {LINKS.slice(4).map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => go(l.id)}
                className={cn(
                  "text-[11px] uppercase tracking-editorial text-cream/70 transition hover:text-cream",
                  active === l.id && "text-cream",
                )}
              >
                {l.label}
              </button>
            ))}
          </nav>
          <button
            type="button"
            onClick={openOrderPanel}
            className="rounded-full bg-salsa px-4 py-2 text-[10px] font-semibold uppercase tracking-editorial text-cream shadow-md transition hover:bg-salsa/90 sm:text-[11px]"
          >
            Order now
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[55] bg-black/70 sm:hidden"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 32 }}
              className="absolute right-0 top-0 flex h-full w-[min(100%,360px)] flex-col border-l border-white/10 bg-charcoal p-6"
            >
              <div className="mb-6 flex items-center justify-between">
                <BrandLogo width={56} height={56} />
                <button
                  type="button"
                  className="rounded-full border border-white/10 p-2"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-4">
                {LINKS.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    className="text-left text-sm uppercase tracking-editorial text-cream"
                    onClick={() => go(l.id)}
                  >
                    {l.label}
                  </button>
                ))}
                <button
                  type="button"
                  className="mt-4 rounded-full bg-salsa py-3 text-center text-xs font-semibold uppercase tracking-editorial text-cream"
                  onClick={() => {
                    setOpen(false);
                    openOrderPanel();
                  }}
                >
                  Order now
                </button>
              </nav>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
