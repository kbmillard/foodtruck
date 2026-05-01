export const RESTAURANT = {
  label: "Restaurant",
  shortLabel: "Southwest Blvd",
  address: "904 Southwest Blvd",
  cityLine: "Kansas City, MO 64108",
  mapsQuery: "904 Southwest Blvd, Kansas City, MO 64108",
  role: "dependable home base",
  description:
    "Our brick-and-mortar home on Southwest Blvd — the same flavors that started on four wheels, now with room for the whole neighborhood.",
} as const;

export const TRUCK = {
  label: "Food Truck",
  shortLabel: "Independence Ave",
  address: "3009 Independence Ave",
  detail: "at Al Halal Grocery Store",
  cityLine: "Kansas City, MO 64124",
  mapsQuery: "3009 Independence Ave, Kansas City, MO 64124",
  role: "lively, local, flexible",
  description:
    "Catch the truck where KC eats — parked at Al Halal Grocery for late-night tortas, birria, and burgers hot off the plancha.",
} as const;

/** Hours from printed menu; follow social for extra service days or changes. */
export const HOURS_LINES = [
  "Open 5:00 PM – 11:00 PM",
  "Updates and special hours: @la_hamburguesaloca on Instagram and Facebook",
] as const;

export const CONTACT = {
  phoneDisplay: "(816) 589-8925",
  phoneTel: "+18165898925",
  email: "lahamburguesaloca@yahoo.com",
  socialHandle: "@la_hamburguesaloca",
  socialUrl: "https://www.instagram.com/la_hamburguesaloca/",
  facebookUrl: "https://www.facebook.com/LaHamburguesaLoca",
} as const;

export const TRUCK_STATUS_OPTIONS = [
  "open",
  "moving_soon",
  "closed",
  "catering_event",
  "serving_now",
  "next_stop",
] as const;

export type TruckStatusId = (typeof TRUCK_STATUS_OPTIONS)[number];

export const TRUCK_STATUS_COPY: Record<
  TruckStatusId,
  { badge: string; detail: string }
> = {
  open: { badge: "Open", detail: "Swing by — we are firing the flat-top." },
  moving_soon: {
    badge: "Moving Soon",
    detail: "We are packing up; arrive within the next few minutes.",
  },
  closed: { badge: "Closed", detail: "See hours below — we will be back soon." },
  catering_event: {
    badge: "Catering Event",
    detail: "Booked for a private party — visit the restaurant tonight.",
  },
  serving_now: {
    badge: "Serving Now",
    detail: "Serving now at 3009 Independence Ave (Al Halal Grocery).",
  },
  next_stop: {
    badge: "Next Stop",
    detail: "Catch us at our next stop — follow social for the pin.",
  },
};
