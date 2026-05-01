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
      className="scroll-mt-[calc(var(--nav-h)+12px)] border-t border-accent-orange/30 bg-gradient-to-b from-accent-orange/15 via-menu-plum to-charcoal py-20"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="rounded-3xl border border-accent-orange/40 bg-black/40 p-8 sm:p-10">
          <p className="text-xs uppercase tracking-editorial text-accent-orange">
            Weekend Breakfast
          </p>
          <h2 className="mt-2 font-display text-4xl text-cream sm:text-5xl">Weekend Breakfast</h2>
          <p className="mt-2 text-sm text-cream/80 sm:text-base">
            Saturday &amp; Sunday, 8 AM - 4 PM
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-cream/70">
            Weekend breakfast available Saturday &amp; Sunday, 8 AM - 4 PM. All prices confirmed at
            pickup — add to cart to send an order request.
          </p>

          <div className="mt-12 space-y-16">
            {SUBSECTIONS.map((sub) => {
              const items = bySection.get(sub.section) ?? [];
              if (!items.length) return null;
              return (
                <section key={sub.section} aria-labelledby={`wb-${sub.section}`}>
                  <div className="border-b border-white/10 pb-4">
                    <p className="text-xs uppercase tracking-editorial text-cream/50">
                      {sub.kicker}
                    </p>
                    <h3 id={`wb-${sub.section}`} className="mt-1 font-display text-3xl text-cream">
                      {sub.title}
                    </h3>
                    {sub.blurb ? (
                      <p className="mt-2 max-w-2xl text-sm text-cream/75">{sub.blurb}</p>
                    ) : null}
                  </div>
                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
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
                          <div className="min-w-0 flex-1">
                            <PriceRow name={item.name} price={item.price} />
                            {item.englishName ? (
                              <p className="mt-0.5 text-xs text-cream/55">{item.englishName}</p>
                            ) : null}
                            {item.availabilityLabel ? (
                              <p className="mt-1 text-[10px] uppercase tracking-editorial text-accent-orange/90">
                                {item.availabilityLabel}
                              </p>
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
                                className={cn(
                                  "rounded-full bg-salsa px-3 py-1.5 text-[10px] font-semibold uppercase tracking-editorial text-cream hover:bg-salsa/90",
                                )}
                                onClick={() => handleAdd(item)}
                              >
                                Add
                              </button>
                              <button
                                type="button"
                                className="rounded-full border border-white/15 px-3 py-1.5 text-[10px] uppercase tracking-editorial text-cream/80 hover:bg-white/5"
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
