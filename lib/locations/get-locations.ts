import { parseLocationsFromCsvText } from "./google-sheet-locations";
import { localLocationItems } from "./local-locations";
import type { LocationItem, LocationsResponse, LocationsSource } from "./schema";

function sortLocations(items: LocationItem[]): LocationItem[] {
  return [...items].sort((a, b) => {
    if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
    return a.name.localeCompare(b.name);
  });
}

function buildResponse(
  items: LocationItem[],
  source: LocationsSource,
  updatedAt: string,
): LocationsResponse {
  const sorted = sortLocations(items.filter((i) => i.active));
  const restaurantLocations = sorted.filter((i) => i.type === "restaurant");
  const foodTruckLocations = sorted.filter((i) => i.type === "food_truck");
  return {
    locations: sorted,
    restaurantLocations,
    foodTruckLocations,
    source,
    updatedAt,
  };
}

/**
 * Locations CSV is cached ~5 minutes via fetch `revalidate: 300`.
 */
export async function getLocationsCatalog(): Promise<LocationsResponse> {
  const updatedAt = new Date().toISOString();
  const url = process.env.LOCATIONS_CSV_URL ?? process.env.NEXT_PUBLIC_LOCATIONS_CSV_URL;

  if (url) {
    try {
      const res = await fetch(url, { next: { revalidate: 300 } });
      if (!res.ok) throw new Error(`Locations CSV fetch ${res.status}`);
      const text = await res.text();
      const parsed = parseLocationsFromCsvText(text);
      if (parsed.length === 0) throw new Error("Parsed zero location rows");
      return buildResponse(parsed, "google-sheet", updatedAt);
    } catch (e) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[locations] Google Sheet / CSV failed, using local fallback:", e);
      }
    }
  }

  return buildResponse(localLocationItems, "local-fallback", updatedAt);
}
