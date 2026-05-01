export type EssenceCard = {
  id: string;
  number: string;
  title: string;
  teaser: string;
  body: string;
  image: string;
};

export const ESSENCE_CARDS: EssenceCard[] = [
  {
    id: "fire",
    number: "01",
    title: "Fire",
    teaser: "Mesquite heat, plancha discipline.",
    body: "We cook with intention — sear marks that mean something, onions that melt into sweetness, and proteins that carry smoke without losing their soul.",
    image:
      "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "masa",
    number: "02",
    title: "Masa",
    teaser: "Hand-pressed when it matters.",
    body: "From sopes to tortillas, masa is treated like a main ingredient — rested, pressed, and griddled until it puffs with pride.",
    image:
      "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "family",
    number: "03",
    title: "Family",
    teaser: "Sixteen years, one kitchen philosophy.",
    body: "La Hamburguesa Loca is family-owned Kansas City energy — Auténtico Sazón Mexicano with a crew that remembers your order.",
    image:
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1600&q=80",
  },
];
