"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MENU_CATEGORY_META } from "@/lib/menu/category-meta";
import type { MenuItem } from "@/lib/menu/schema";
import { useMenuCatalog } from "@/context/MenuCatalogContext";
import { useOrder } from "@/context/OrderContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils/cn";
import { MeatChoiceModal } from "@/components/menu/MeatChoiceModal";
import { MenuOptionGroupsModal } from "@/components/menu/MenuOptionGroupsModal";
import { WeekendBreakfastSection } from "@/components/menu/WeekendBreakfastSection";
import { itemRequiresOptionSelections } from "@/lib/menu/option-groups";
import { categoryActiveRing, categoryHeroGradient } from "@/lib/menu/category-styles";

function MenuSkeleton() {
  return (
    <div className="mt-14 animate-pulse space-y-4">
      <div className="h-12 rounded-2xl bg-white/10" />
      <div className="h-64 rounded-3xl bg-white/10" />
    </div>
  );
}

function PriceRow({ name, price }: { name: string; price: number | null }) {
  return (
    <div className="flex min-w-0 items-baseline gap-2">
      <span className="truncate font-medium text-cream">{name}</span>
      <span
        className="min-w-[1rem] flex-1 border-b border-dotted border-cream/25"
        aria-hidden
      />
      <span className="shrink-0 text-sm text-cream/85">
        {price === null ? "Price TBD" : `$${price.toFixed(2)}`}
      </span>
    </div>
  );
}

export function InteractiveMenu() {
  const { data, loading, error } = useMenuCatalog();
  const { addItem, openOrderPanel, scrollToSection } = useOrder();
  const reduceMotion = useReducedMotion();
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const activeIdRef = useRef(MENU_CATEGORY_META[0]!.id);
  const [swipeCueDismissed, setSwipeCueDismissed] = useState(false);
  const [activeId, setActiveId] = useState(MENU_CATEGORY_META[0]!.id);
  const [meatItem, setMeatItem] = useState<MenuItem | null>(null);
  const [optionsItem, setOptionsItem] = useState<MenuItem | null>(null);

  const visibleMeta = useMemo(() => {
    if (!data?.items.length) return MENU_CATEGORY_META;
    return MENU_CATEGORY_META.filter((m) =>
      data.items.some((i) => i.category.toLowerCase() === m.label.toLowerCase()),
    );
  }, [data]);

  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  useEffect(() => {
    if (!visibleMeta.length) return;
    if (!visibleMeta.some((m) => m.id === activeId)) {
      setActiveId(visibleMeta[0]!.id);
    }
  }, [activeId, visibleMeta]);

  const active = visibleMeta.find((m) => m.id === activeId) ?? visibleMeta[0];
  const items = useMemo(() => {
    if (!data || !active) return [];
    return data.items.filter(
      (i) => i.category.toLowerCase() === active.label.toLowerCase(),
    );
  }, [active, data]);

  const handleAdd = (item: MenuItem) => {
    if (item.meatChoiceRequired) {
      setMeatItem(item);
      return;
    }
    if (itemRequiresOptionSelections(item)) {
      setOptionsItem(item);
      return;
    }
    addItem(item.id, { quantity: 1 });
    openOrderPanel();
  };

  const onMeatChosen = (meat: string) => {
    if (!meatItem) return;
    addItem(meatItem.id, { quantity: 1, selectedMeat: meat });
    openOrderPanel();
    setMeatItem(null);
  };

  const onOptionsChosen = (selections: Record<string, string>) => {
    if (!optionsItem) return;
    addItem(optionsItem.id, { quantity: 1, selectedOptions: selections });
    openOrderPanel();
    setOptionsItem(null);
  };

  const onCategoryScroll = useCallback(() => {
    const el = categoryScrollRef.current;
    if (!el || swipeCueDismissed) return;
    if (el.scrollLeft > 8) setSwipeCueDismissed(true);
  }, [swipeCueDismissed]);

  const selectCategory = useCallback((id: string) => {
    if (activeIdRef.current !== id) setSwipeCueDismissed(true);
    setActiveId(id);
  }, []);

  const showSwipeCue = !swipeCueDismissed && visibleMeta.length > 1;

  return (
    <section
      id="menu"
      className="scroll-mt-[calc(var(--nav-h)+12px)] border-t border-white/10 bg-gradient-to-b from-menu-plum via-plum to-charcoal py-24"
    >
      <div className="mx-auto min-w-0 max-w-[1400px] overflow-x-hidden px-5 sm:px-8">
        <SectionHeading
          kicker="Menu"
          title="Auténtico Sazón Mexicano — one interactive board."
          subtitle="Hamburguesas with fries, tacos, tortas, antojitos, kids picks, and drinks. Prices follow when confirmed; until then you will see Price TBD."
        />

        {error ? (
          <p className="mt-6 rounded-xl border border-salsa/40 bg-salsa/10 p-4 text-sm text-cream">
            {error} — refresh the page. If this persists, the menu API may be unreachable.
          </p>
        ) : null}

        {loading || !data ? (
          <MenuSkeleton />
        ) : (
          <div className="mt-14 grid min-w-0 gap-10 lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)]">
            <div className="min-w-0">
              <div
                className={cn(
                  "mb-2 flex items-center justify-end gap-2 lg:hidden",
                  !showSwipeCue && "hidden",
                )}
                aria-hidden
              >
                <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-editorial text-cream/55">
                  <ChevronLeft className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden />
                  Swipe for more
                  <motion.span
                    className="inline-flex"
                    animate={reduceMotion ? false : { x: [0, 5, 0] }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
                    }
                  >
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden />
                  </motion.span>
                </span>
              </div>
              <div className="relative min-w-0">
                <div
                  ref={categoryScrollRef}
                  onScroll={onCategoryScroll}
                  className="flex gap-3 overflow-x-auto overflow-y-hidden pb-2 [-ms-overflow-style:none] [scrollbar-width:none] lg:flex-col lg:overflow-visible [&::-webkit-scrollbar]:hidden"
                >
                  {visibleMeta.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => selectCategory(cat.id)}
                  className={cn(
                    "flex min-w-[220px] items-baseline justify-between rounded-2xl border px-4 py-4 text-left transition lg:min-w-0",
                    active?.id === cat.id
                      ? cn("bg-cream/95 text-charcoal ring-2", categoryActiveRing(cat.color))
                      : "border-white/10 bg-black/25 text-cream hover:border-white/25",
                  )}
                >
                  <span className="font-display text-3xl">{cat.number}</span>
                  <span className="pl-4 text-xs uppercase tracking-editorial">{cat.label}</span>
                </button>
                  ))}
                </div>
                {showSwipeCue ? (
                  <div
                    className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-14 bg-gradient-to-l from-menu-plum from-[18%] to-transparent lg:hidden"
                    aria-hidden
                  />
                ) : null}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {active ? (
                <motion.div
                  key={active.id}
                  id="menu-panel"
                  tabIndex={-1}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-3xl border border-white/10 bg-black/35 p-6 sm:p-8"
                >
                  <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                    <div>
                      <p className="text-xs uppercase tracking-editorial text-cream/60">
                        {active.number} / {active.label}
                      </p>
                      <h3 className="mt-2 font-display text-4xl text-cream">{active.label}</h3>
                      <p className="mt-4 text-sm leading-relaxed text-cream/75 sm:text-base">
                        {active.subtitle}
                      </p>
                      <div
                        className={cn(
                          "relative mt-8 aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br",
                          categoryHeroGradient(active.color),
                        )}
                      >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_55%)]" />
                        <p className="absolute bottom-6 left-6 max-w-xs text-sm text-cream/90">
                          Tap items on the right — meat or style choices open when required. Final
                          price confirmed at pickup when not listed.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {items.map((item) => (
                        <article
                          key={item.id}
                          className="rounded-2xl border border-white/10 bg-charcoal/50 p-4"
                        >
                          <div className="flex gap-4">
                            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black/40">
                              {item.imageUrl ? (
                                <Image
                                  src={item.imageUrl}
                                  alt={item.imageAlt ?? `${item.name} — ${active.label}`}
                                  fill
                                  className="object-cover"
                                  sizes="96px"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center text-[10px] uppercase tracking-editorial text-cream/40">
                                  LHL
                                </div>
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <PriceRow name={item.name} price={item.price} />
                              {item.includesFries ? (
                                <span className="mt-1 inline-block rounded-full border border-accent-cyan/40 bg-accent-cyan/10 px-2 py-0.5 text-[10px] uppercase tracking-editorial text-accent-cyan">
                                  With fries
                                </span>
                              ) : null}
                              {item.meatChoiceRequired ? (
                                <span className="mt-1 inline-block rounded-full border border-accent-green/40 bg-accent-green/10 px-2 py-0.5 text-[10px] uppercase tracking-editorial text-accent-green">
                                  Choice of meat
                                </span>
                              ) : null}
                              {item.optionGroups?.some((g) => g.required) ? (
                                <span className="mt-1 inline-block rounded-full border border-accent-orange/50 bg-accent-orange/10 px-2 py-0.5 text-[10px] uppercase tracking-editorial text-accent-orange">
                                  Choose options
                                </span>
                              ) : null}
                              {item.description ? (
                                <p className="mt-2 text-xs leading-relaxed text-cream/60">
                                  {item.description}
                                </p>
                              ) : null}
                              <div className="mt-3 flex flex-wrap gap-2">
                                <button
                                  type="button"
                                  className="rounded-full bg-salsa px-3 py-1.5 text-[10px] font-semibold uppercase tracking-editorial text-cream hover:bg-salsa/90"
                                  onClick={() => handleAdd(item)}
                                >
                                  Add
                                </button>
                                <button
                                  type="button"
                                  className="rounded-full border border-white/15 px-3 py-1.5 text-[10px] uppercase tracking-editorial text-cream/80 hover:bg-white/5"
                                  onClick={() => openOrderPanel()}
                                >
                                  Notes
                                </button>
                              </div>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        )}

        {!loading && data ? (
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
            <p className="max-w-xl text-center text-sm text-cream/75">
              Weekend breakfast available Saturday &amp; Sunday, 8 AM - 4 PM.
            </p>
            <button
              type="button"
              onClick={() => scrollToSection("weekend-breakfast")}
              className="rounded-full border border-accent-orange/50 bg-accent-orange/15 px-5 py-2 text-[10px] font-semibold uppercase tracking-editorial text-cream hover:bg-accent-orange/25"
            >
              View Weekend Breakfast
            </button>
          </div>
        ) : null}

        <WeekendBreakfastSection />
      </div>

      <MeatChoiceModal
        item={meatItem}
        open={Boolean(meatItem)}
        onOpenChange={(o) => {
          if (!o) setMeatItem(null);
        }}
        onConfirm={onMeatChosen}
      />
      <MenuOptionGroupsModal
        item={optionsItem}
        open={Boolean(optionsItem)}
        onOpenChange={(o) => {
          if (!o) setOptionsItem(null);
        }}
        onConfirm={onOptionsChosen}
      />
    </section>
  );
}
