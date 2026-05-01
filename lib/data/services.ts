export type ServiceRow = {
  id: string;
  number: string;
  title: string;
  summary: string;
  detail: string;
  ctas: { label: string; action: "order" | "locations" | "catering" | "scroll"; target?: string }[];
};

export const SERVICE_ROWS: ServiceRow[] = [
  {
    id: "pickup",
    number: "01",
    title: "Pickup Ordering",
    summary: "Order online, skip the line, grab it hot.",
    detail:
      "Built for busy nights — your cart updates live, pickup times stay clear, and everything stays on this page so you never lose momentum.",
    ctas: [{ label: "Open order panel", action: "order" }],
  },
  {
    id: "truck",
    number: "02",
    title: "Food Truck",
    summary: "Same menu DNA, street-level energy.",
    detail:
      "Find us at 3009 Independence Ave by Al Halal Grocery — the truck is how we grew up in KC and how we still meet the neighborhood.",
    ctas: [
      { label: "Find the truck", action: "scroll", target: "locations" },
    ],
  },
  {
    id: "catering",
    number: "03",
    title: "Catering",
    summary: "Trays, toppings, and crowd-ready heat.",
    detail:
      "Office lunches, school celebrations, and block parties — we scale the flavors without losing the handmade touch.",
    ctas: [{ label: "Start catering form", action: "catering" }],
  },
  {
    id: "combos",
    number: "04",
    title: "Family Combos",
    summary: "Feeds the table without the debate.",
    detail:
      "Mix burgers, tacos, and papas locas for the crew — ask us to bundle for your pickup order in the notes.",
    ctas: [{ label: "Build an order", action: "order" }],
  },
  {
    id: "late",
    number: "05",
    title: "Late-Night Food",
    summary: "Kitchen hours that respect KC nights.",
    detail:
      "Tue–Fri from 5 PM and Sat–Sun from 8 AM — because hunger does not clock out at nine.",
    ctas: [{ label: "View hours", action: "scroll", target: "hours" }],
  },
  {
    id: "private",
    number: "06",
    title: "Private Events",
    summary: "Bring the truck — bring the party.",
    detail:
      "Birthdays, corporate mixers, festivals, and school events — we roll up, fire the flat-top, and serve lines with a smile.",
    ctas: [{ label: "Book the truck", action: "catering" }],
  },
];
