export type LocationType = "restaurant" | "food_truck";

export type LocationsSource = "google-sheet" | "local-fallback";

export type LocationItem = {
  id: string;
  active: boolean;
  type: LocationType;
  sortOrder: number;
  name: string;
  label: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  hours: string;
  phone: string;
  email: string;
  status: string;
  statusNote: string;
  mapsUrl: string;
  embedUrl: string;
  lat: number | null;
  lng: number | null;
  lastUpdated: string;
};

export type LocationsResponse = {
  locations: LocationItem[];
  restaurantLocations: LocationItem[];
  foodTruckLocations: LocationItem[];
  source: LocationsSource;
  updatedAt: string;
};
