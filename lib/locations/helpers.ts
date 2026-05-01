import type { LocationItem } from "./schema";

function publicMapsEmbedKey(): string | undefined {
  if (typeof process === "undefined") return undefined;
  return process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim() || undefined;
}

/** Maps Embed API v1 /place when a browser-safe key is available. */
function mapsEmbedV1Place(loc: LocationItem, key: string): string | null {
  const pub = key.trim();
  if (!pub) return null;
  const pid = loc.placeId?.trim();
  if (pid) {
    return `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(pub)}&q=place_id:${encodeURIComponent(pid)}`;
  }
  if (
    loc.lat != null &&
    loc.lng != null &&
    Number.isFinite(loc.lat) &&
    Number.isFinite(loc.lng)
  ) {
    return `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(pub)}&q=${encodeURIComponent(`${loc.lat},${loc.lng}`)}`;
  }
  const line = formatAddressLine(loc);
  if (line.trim()) {
    return `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(pub)}&q=${encodeURIComponent(line)}`;
  }
  return null;
}

/**
 * Server-side: precompute embed URL for JSON (uses public key only).
 * Returns undefined when owner `embedUrl` is set (client uses that) or no key.
 */
export function buildMapEmbedSrcForResponse(
  loc: LocationItem,
  publicKey?: string | null,
): string | undefined {
  if (loc.embedUrl?.trim()) return undefined;
  const k = publicKey?.trim() || publicMapsEmbedKey();
  if (!k) return undefined;
  return mapsEmbedV1Place(loc, k) ?? undefined;
}

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
 * Iframe src: explicit embedUrl, then server-built mapEmbedSrc, then Embed v1 with
 * NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, then legacy `maps?q=lat,lng&output=embed`.
 */
export function resolvedEmbedSrc(loc: LocationItem): string | null {
  const e = loc.embedUrl?.trim();
  if (e) return e;
  const pre = loc.mapEmbedSrc?.trim();
  if (pre) return pre;
  const pub = publicMapsEmbedKey();
  if (pub) {
    const v1 = mapsEmbedV1Place(loc, pub);
    if (v1) return v1;
  }
  if (loc.lat != null && loc.lng != null && !Number.isNaN(loc.lat) && !Number.isNaN(loc.lng)) {
    return `https://www.google.com/maps?q=${loc.lat},${loc.lng}&z=16&output=embed`;
  }
  const line = formatAddressLine(loc);
  if (line.trim()) {
    return `https://www.google.com/maps?q=${encodeURIComponent(line)}&output=embed`;
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
