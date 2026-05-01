import type { LocationItem } from "./schema";

/** Single-line postal address for display and map search fallback. */
export function formatAddressLine(loc: LocationItem): string {
  const cityLine = [loc.city, loc.state, loc.zip].filter(Boolean).join(" ").trim();
  return [loc.address, cityLine].filter(Boolean).join(", ");
}

/** Google Maps “search” URL when `mapsUrl` is blank. */
export function defaultMapsSearchUrl(loc: LocationItem): string {
  const q = formatAddressLine(loc);
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}

export function resolvedMapsUrl(loc: LocationItem): string {
  const u = loc.mapsUrl?.trim();
  return u || defaultMapsSearchUrl(loc);
}

export function resolvedAppleMapsUrl(loc: LocationItem): string {
  return `https://maps.apple.com/?q=${encodeURIComponent(formatAddressLine(loc))}`;
}

/**
 * Iframe src when `embedUrl` is set, or lat/lng fallback embed.
 * Returns null when neither is usable — UI shows address + placeholder.
 */
export function resolvedEmbedSrc(loc: LocationItem): string | null {
  const e = loc.embedUrl?.trim();
  if (e) return e;
  if (loc.lat != null && loc.lng != null && !Number.isNaN(loc.lat) && !Number.isNaN(loc.lng)) {
    return `https://www.google.com/maps?q=${loc.lat},${loc.lng}&z=16&output=embed`;
  }
  return null;
}

export function telHrefFromDisplay(phoneDisplay: string, fallbackTel: string): string {
  const d = phoneDisplay.replace(/\D/g, "");
  if (d.length === 10) return `tel:+1${d}`;
  if (d.length === 11 && d.startsWith("1")) return `tel:+${d}`;
  if (d.length >= 10) return `tel:+${d}`;
  return `tel:${fallbackTel}`;
}
