/**
 * Hardcoded fallbacks when `/api/locations` is loading, failed, or a row type is missing.
 * Matches canonical business info; keep in sync with `lib/locations/local-locations.ts`.
 */
export const FOOTER_VISIT_FALLBACK = {
  restaurant: {
    address: "904 Southwest Blvd",
    cityLine: "Kansas City, MO 64108",
  },
  truck: {
    address: "3009 Independence Ave",
    detail: "",
    cityLine: "Kansas City, MO 64124",
  },
  hoursPrimary: "Open 5:00 PM - 11:00 PM",
} as const;
