"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useMenuCatalog } from "@/context/MenuCatalogContext";
import { useOrder } from "@/context/OrderContext";
import type { MenuItem } from "@/lib/menu/schema";
import { itemRequiresOptionSelections } from "@/lib/menu/option-groups";
import { MeatChoiceModal } from "@/components/menu/MeatChoiceModal";
import { MenuOptionGroupsModal } from "@/components/menu/MenuOptionGroupsModal";
import { cn } from "@/lib/utils/cn";

const SUBSECTIONS: { section: string; title: string; kicker: string; blurb?: string }[] = [
  {
    section: "Guisos",
    title: "Guisos / Stews",
    kicker: "01",
    blurb: "Available as tacos, burritos, gorditas harina, or gorditas maíz.",
  },
  { section: "Desayunos", title: "Desayunos / Breakfast", kicker: "02" },
  { section: "Caldos", title: "Caldos / Broths", kicker: "03" },
];

/** Display-only shortening for narrow screens; does not change Sheet data. */
function availabilityMobileDisplay(label: string): string {
  const t = label.trim();
  if (
    /saturday\s*&\s*sunday|saturday\s+and\s+sunday/i.test(t) &&
    /\b8\b.*\b4\b.*(am|pm)/i.test(t)
  ) {
    return "Sat–Sun · 8 AM–4 PM";
  }
  return t
    .replace(/\bSaturday\b/gi, "Sat")
    .replace(/\bSunday\b/gi, "Sun")
    .replace(/\s*&\s*/g, "–")
    .replace(/\s*,\s*/g, " · ")
    .replace(/\s*-\s*/g, "–");
}

function BreakfastPriceRow({ name, price }: { name: string; price: number | null }) {
  const priceStr = price === null ? "Price TBD" : `$${price.toFixed(2)}`;
  return (
    <>
      <div className="flex min-w-0 items-start justify-between gap-3 md:hidden">
        <span className="min-w-0 flex-1 break-words text-base font-medium leading-snug text-cream line-clamp-2">
          {name}
        </span>
        <span className="shrink-0 self-start text-sm text-cream/85 whitespace-nowrap">{priceStr}</span>
      </div>
      <div className="hidden min-w-0 items-baseline gap-2 md:flex">
        <span className="line-clamp-2 min-w-0 shrink break-words font-medium leading-snug text-cream">
          {name}
        </span>
        <span
          className="min-w-[1rem] flex-1 border-b border-dotted border-cream/25"
          aria-hidden
        />
        <span className="shrink-0 text-sm text-cream/85">{priceStr}</span>
      </div>
    </>
  );
}

export function WeekendBreakfastSection() {
  const { data } = useMenuCatalog();
  const { addItem, openOrderPanel } = useOrder();
  const [meatItem, setMeatItem] = useState<MenuItem | null>(null);
  const [optionsItem, setOptionsItem] = useState<MenuItem | null>(null);

  const breakfastItems = useMemo(
    () =>
      (data?.items ?? []).filter(
        (i) => i.category.toLowerCase() === "weekend breakfast",
      ),
    [data],
  );

  const bySection = useMemo(() => {
    const m = new Map<string, MenuItem[]>();
    for (const s of SUBSECTIONS) {
      m.set(
        s.section,
        breakfastItems.filter(
          (i) => (i.section ?? "").toLowerCase() === s.section.toLowerCase(),
        ),
      );
    }
    return m;
  }, [breakfastItems]);

  if (!breakfastItems.length) return null;

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

  return (
    <div
      id="weekend-breakfast"
      className="scroll-mt-[calc(var(--nav-h)+16px)] mt-10 w-full max-w-full overflow-x-hidden border-t border-accent-orange/30 bg-gradient-to-b from-accent-orange/[0.07] via-menu-plum/45 to-charcoal py-12 md:from-accent-orange/15 md:via-menu-plum md:to-charcoal md:py-20"
    >
      <div className="mx-auto w-full max-w-full px-4 sm:px-5 md:px-8">
        <div
          id="weekend-breakfast-start"
          tabIndex={-1}
          className="w-full min-w-0 max-w-full rounded-2xl border border-accent-orange/40 bg-black/40 p-4 outline-none focus:outline-none sm:p-5 md:rounded-3xl md:p-10"
        >
          <p className="text-xs uppercase tracking-editorial text-accent-orange">
            Weekend Breakfast
          </p>
          <h2 className="mt-2 font-display text-3xl text-cream sm:text-4xl md:text-5xl">
            Weekend Breakfast
          </h2>
          <p className="mt-2 text-sm text-cream/80 md:hidden">Sat–Sun · 8 AM–4 PM</p>
          <p className="mt-2 hidden text-sm text-cream/80 sm:text-base md:block">
            Saturday &amp; Sunday, 8 AM - 4 PM
          </p>
          <p className="mt-3 max-w-full text-sm leading-relaxed text-cream/70 md:max-w-2xl">
            Weekend breakfast available Saturday &amp; Sunday, 8 AM - 4 PM. All prices confirmed at
            pickup — add to cart to send an order request.
          </p>

          <div className="mt-8 space-y-12 md:mt-12 md:space-y-16">
            {SUBSECTIONS.map((sub) => {
              const items = bySection.get(sub.section) ?? [];
              if (!items.length) return null;
              return (
                <section key={sub.section} aria-labelledby={`wb-${sub.section}`}>
                  <div className="max-w-full border-b border-white/10 pb-3 md:pb-4">
                    <p className="text-xs uppercase tracking-editorial text-cream/50">
                      {sub.kicker}
                    </p>
                    <h3
                      id={`wb-${sub.section}`}
                      className="mt-1 break-words font-display text-2xl text-cream md:text-3xl"
                    >
                      {sub.title}
                    </h3>
                    {sub.blurb ? (
                      <p className="mt-2 max-w-full text-sm text-cream/75 md:max-w-2xl">
                        {sub.blurb}
                      </p>
                    ) : null}
                  </div>
                  <div className="mt-6 grid w-full max-w-full grid-cols-1 gap-4 md:mt-8 lg:grid-cols-2">
                    {items.map((item) => (
                      <article
                        key={item.id}
                        className="w-full min-w-0 max-w-full rounded-2xl border border-white/10 bg-charcoal/50 p-4 sm:p-5"
                      >
                        <div className="flex min-w-0 flex-col gap-4 md:flex-row md:gap-4">
                          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-black/40 md:rounded-xl">
                            {item.imageUrl ? (
                              <Image
                                src={item.imageUrl}
                                alt={item.imageAlt ?? item.name}
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
                          <div className="min-w-0 w-full max-w-full flex-1">
                            <BreakfastPriceRow name={item.name} price={item.price} />
                            {item.englishName ? (
                              <p className="mt-0.5 break-words text-xs text-cream/55">
                                {item.englishName}
                              </p>
                            ) : null}
                            {item.availabilityLabel ? (
                              <p className="mt-1 max-w-full break-words text-[10px] uppercase leading-snug text-accent-orange/90 md:tracking-editorial">
                                <span className="md:hidden">
                                  {availabilityMobileDisplay(item.availabilityLabel)}
                                </span>
                                <span className="hidden md:inline">{item.availabilityLabel}</span>
                              </p>
                            ) : null}
                            {item.meatChoiceRequired ? (
                              <span className="mt-1 inline-block max-w-full rounded-full border border-accent-green/40 bg-accent-green/10 px-2 py-0.5 text-[10px] uppercase tracking-editorial text-accent-green">
                                Choice of meat
                              </span>
                            ) : null}
                            {item.optionGroups?.some((g) => g.required) ? (
                              <>
                                <span className="mt-1 hidden max-w-full rounded-full border border-accent-orange/50 bg-accent-orange/10 px-2 py-0.5 text-[10px] uppercase tracking-editorial text-accent-orange md:inline-block">
                                  Choose options
                                </span>
                                <span className="mt-1 inline-block w-fit max-w-full rounded-full border border-accent-orange/50 bg-accent-orange/10 px-2 py-0.5 text-xs uppercase tracking-[0.12em] text-accent-orange md:hidden">
                                  Options
                                </span>
                              </>
                            ) : null}
                            {item.description ? (
                              <p className="mt-2 break-words text-xs leading-relaxed text-cream/60">
                                {item.description}
                              </p>
                            ) : null}
                            <div className="mt-4 flex flex-wrap gap-2">
                              <button
                                type="button"
                                className={cn(
                                  "min-h-10 rounded-full bg-salsa px-4 py-2 text-[10px] font-semibold uppercase tracking-editorial text-cream hover:bg-salsa/90 md:px-5",
                                )}
                                onClick={() => handleAdd(item)}
                              >
                                Add
                              </button>
                              <button
                                type="button"
                                className="min-h-10 rounded-full border border-white/15 px-4 py-2 text-[10px] uppercase tracking-editorial text-cream/80 hover:bg-white/5 md:px-5"
                                onClick={() => openOrderPanel()}
                              >
                                Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
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
    </div>
  );
}
