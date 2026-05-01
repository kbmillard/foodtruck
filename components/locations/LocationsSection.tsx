"use client";

import { useState } from "react";
import { MapPin, Navigation } from "lucide-react";
import { CONTACT, HOURS_LINES } from "@/lib/data/locations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLocationsCatalog } from "@/context/LocationsCatalogContext";
import type { LocationItem } from "@/lib/locations/schema";
import {
  formatAddressLine,
  resolvedAppleMapsUrl,
  resolvedEmbedSrc,
  resolvedMapsUrl,
  telHrefFromDisplay,
} from "@/lib/locations/helpers";
import { GoogleMapGreedy } from "@/components/locations/GoogleMapGreedy";

function cardDescription(loc: LocationItem): string {
  const note = loc.statusNote?.trim();
  if (note) return note;
  if (loc.type === "restaurant") {
    return "Our brick-and-mortar home on Southwest Blvd — the same flavors that started on four wheels, now with room for the whole neighborhood.";
  }
  return "Catch the truck where KC eats — check status for today’s pin.";
}

function addressLines(loc: LocationItem): string[] {
  const cityLine = [loc.city, loc.state, loc.zip].filter(Boolean).join(" ").trim();
  const lines = [loc.address, cityLine].filter(Boolean);
  return lines.length > 0 ? lines : [formatAddressLine(loc)];
}

export function LocationsSection() {
  const { loading, error, data } = useLocationsCatalog();
  const [mapOpen, setMapOpen] = useState(false);

  const restaurants = data?.restaurantLocations ?? [];
  const trucks = data?.foodTruckLocations ?? [];
  const primaryTruck = trucks[0];
  const primaryRestaurant = restaurants[0];

  const phoneDisplay =
    primaryTruck?.phone?.trim() || primaryRestaurant?.phone?.trim() || CONTACT.phoneDisplay;
  const phoneTel = telHrefFromDisplay(phoneDisplay, CONTACT.phoneTel);
  const emailAddr =
    primaryTruck?.email?.trim() || primaryRestaurant?.email?.trim() || CONTACT.email;

  return (
    <section
      id="locations"
      className="scroll-mt-[calc(var(--nav-h)+12px)] border-t border-white/10 py-24"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <SectionHeading
          kicker="Find us"
          title="Restaurant as home base. Truck as heartbeat."
          subtitle="The best Mexican burger in Kansas City lives alongside tacos, birria, and papas locas — on Southwest Blvd and rolling as a KC food truck."
        />

        {error ? (
          <p className="mt-6 rounded-xl border border-salsa/40 bg-salsa/10 p-4 text-sm text-cream">
            {error} — try refreshing. Call{" "}
            <a className="underline" href={`tel:${CONTACT.phoneTel}`}>
              {CONTACT.phoneDisplay}
            </a>{" "}
            or email{" "}
            <a className="underline" href={`mailto:${CONTACT.email}`}>
              {CONTACT.email}
            </a>
            .
          </p>
        ) : null}

        {loading ? (
          <div className="mt-12 grid animate-pulse gap-8 lg:grid-cols-2">
            <div className="h-72 rounded-3xl bg-white/10" />
            <div className="h-72 rounded-3xl bg-white/10" />
          </div>
        ) : (
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {(data?.locations ?? []).map((loc) => (
              <LocationCard key={loc.id} loc={loc} />
            ))}
          </div>
        )}

        <div
          id="hours"
          className="mt-12 scroll-mt-[calc(var(--nav-h)+12px)] rounded-3xl border border-white/10 bg-black/30 p-8"
        >
          <p className="text-xs uppercase tracking-editorial text-cream/60">Hours</p>
          <ul className="mt-3 space-y-2 text-cream/85">
            {!loading && data?.locations.length
              ? data.locations.map((loc) => (
                  <li key={loc.id}>
                    <span className="font-medium text-cream">{loc.name}</span>
                    {loc.hours ? ` — ${loc.hours}` : null}
                  </li>
                ))
              : HOURS_LINES.map((h) => <li key={h}>{h}</li>)}
            {!loading && data?.locations.length && HOURS_LINES[1] ? (
              <li className="text-cream/70">{HOURS_LINES[1]}</li>
            ) : null}
          </ul>
        </div>

        <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs uppercase tracking-editorial text-cream/60">Truck status</p>
              {loading ? (
                <div className="mt-4 h-24 animate-pulse rounded-xl bg-white/10" />
              ) : trucks.length === 0 ? (
                <p className="mt-2 text-sm text-cream/75">
                  Food truck schedule appears here when a food truck location is published in the
                  sheet.
                </p>
              ) : (
                <ul className="mt-4 space-y-6">
                  {trucks.map((t) => (
                    <li key={t.id} className="border-b border-white/10 pb-6 last:border-0 last:pb-0">
                      <p className="font-display text-3xl text-cream">
                        {t.status?.trim() || "—"}
                      </p>
                      {t.statusNote?.trim() ? (
                        <p className="mt-2 max-w-xl text-sm text-cream/75">{t.statusNote.trim()}</p>
                      ) : null}
                      <p className="mt-2 text-xs uppercase tracking-editorial text-cream/50">
                        {t.name}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {primaryRestaurant ? (
              <MapButton
                label="Open in Google Maps"
                href={resolvedMapsUrl(primaryRestaurant)}
              />
            ) : null}
            {primaryTruck ? (
              <>
                <MapButton label="Truck in Google Maps" href={resolvedMapsUrl(primaryTruck)} />
                <MapButton label="Truck in Apple Maps" href={resolvedAppleMapsUrl(primaryTruck)} />
              </>
            ) : primaryRestaurant ? (
              <MapButton
                label="Apple Maps"
                href={resolvedAppleMapsUrl(primaryRestaurant)}
              />
            ) : null}
            <a
              href={phoneTel}
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-4 py-2 text-[10px] uppercase tracking-editorial text-cream hover:bg-white/5"
            >
              Call {phoneDisplay}
            </a>
            <a
              href={`mailto:${emailAddr}`}
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-4 py-2 text-[10px] uppercase tracking-editorial text-cream hover:bg-white/5"
            >
              Email
            </a>
            {primaryTruck ? (
              <button
                type="button"
                onClick={() => setMapOpen((v) => !v)}
                className="inline-flex items-center gap-2 rounded-full bg-salsa px-5 py-2 text-[10px] font-semibold uppercase tracking-editorial text-cream"
              >
                <Navigation className="h-4 w-4" aria-hidden />
                Find the truck
              </button>
            ) : null}
          </div>

          {mapOpen && data?.locations.length ? (
            <div className="mt-6 space-y-6">
              {data.locations.map((loc) => (
                <MapEmbedBlock key={loc.id} loc={loc} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function LocationCard({ loc }: { loc: LocationItem }) {
  const badge =
    loc.label?.trim() ||
    (loc.type === "restaurant" ? "Restaurant Location" : "Food Truck Location");
  const title =
    loc.name?.trim() || (loc.type === "restaurant" ? "Restaurant" : "Food Truck");

  return (
    <article className="flex flex-col rounded-3xl border border-white/10 bg-black/30 p-8">
      <p className="text-xs uppercase tracking-editorial text-cream/60">{badge}</p>
      <h3 className="mt-2 font-display text-3xl text-cream">{title}</h3>
      <div className="mt-4 flex items-start gap-2 text-cream/85">
        <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-ember" aria-hidden />
        <div>
          {addressLines(loc).map((l) => (
            <p key={l}>{l}</p>
          ))}
        </div>
      </div>
      {loc.status?.trim() || loc.statusNote?.trim() ? (
        <p className="mt-3 text-xs text-accent-green">
          {loc.status?.trim() ? <span className="font-semibold">{loc.status.trim()}</span> : null}
          {loc.status?.trim() && loc.statusNote?.trim() ? " · " : null}
          {loc.statusNote?.trim() ?? ""}
        </p>
      ) : null}
      <p className="mt-4 text-sm leading-relaxed text-cream/70">{cardDescription(loc)}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        <MapButton label="Google Maps" href={resolvedMapsUrl(loc)} />
        <MapButton label="Apple Maps" href={resolvedAppleMapsUrl(loc)} />
      </div>
    </article>
  );
}

/** True only when the sheet provides a truly custom (non-Google) iframe URL. */
function isThirdPartyEmbedUrl(url: string): boolean {
  const u = url.trim().toLowerCase();
  if (!u) return false;
  return !u.includes("google.com") && !u.includes("maps.google.");
}

function parseCoord(n: number | null | undefined): number | null {
  if (n == null) return null;
  const v = Number(n);
  return Number.isFinite(v) ? v : null;
}

function MapEmbedBlock({ loc }: { loc: LocationItem }) {
  const line = formatAddressLine(loc);
  const ownerEmbed = loc.embedUrl?.trim();
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim();
  const lat = parseCoord(loc.lat);
  const lng = parseCoord(loc.lng);
  const coordsOk = lat != null && lng != null;

  /**
   * Embed API iframes (including `mapEmbedSrc` / owner-pasted Google iframe URLs) always
   * use cooperative “⌘ + scroll”. Prefer Maps JavaScript API with `gestureHandling: greedy`
   * whenever we have coordinates + a public key — even if the Sheet has a Google embed URL.
   */
  const useGreedyJsMap =
    coordsOk && Boolean(apiKey) && (!ownerEmbed || !isThirdPartyEmbedUrl(ownerEmbed));
  const src = useGreedyJsMap ? null : resolvedEmbedSrc(loc);

  return (
    <div>
      <p className="text-xs uppercase tracking-editorial text-cream/50">
        {loc.label?.trim() || loc.name}
      </p>
      <p className="mt-1 text-sm text-cream/80">{line}</p>
      {useGreedyJsMap && lat != null && lng != null ? (
        <div className="mt-3 overflow-hidden rounded-2xl border border-white/10">
          <GoogleMapGreedy
            lat={lat}
            lng={lng}
            title={loc.name}
            className="h-[220px] w-full min-h-[220px] bg-charcoal"
          />
        </div>
      ) : src ? (
        <div className="mt-3 overflow-hidden rounded-2xl border border-white/10">
          <iframe
            title={`Map — ${loc.name}`}
            className="h-[220px] w-full bg-charcoal"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={src}
          />
        </div>
      ) : (
        <div className="mt-3 rounded-2xl border border-dashed border-white/20 bg-charcoal/60 p-6 text-sm text-cream/75">
          {loc.lat != null && loc.lng != null ? (
            <>
              <p className="font-medium text-cream">Pin not embedded — coordinates</p>
              <p className="mt-2 font-mono text-xs">
                {loc.lat}, {loc.lng}
              </p>
            </>
          ) : (
            <p className="font-medium text-cream">Map preview</p>
          )}
          <p className="mt-2">{line}</p>
          <div className="mt-4">
            <MapButton label="Open in Google Maps" href={resolvedMapsUrl(loc)} />
          </div>
        </div>
      )}
    </div>
  );
}

function MapButton({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="rounded-full border border-white/15 px-4 py-2 text-[10px] uppercase tracking-editorial text-cream hover:bg-white/5"
    >
      {label}
    </a>
  );
}
