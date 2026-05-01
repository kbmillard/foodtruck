import type { MenuCategoryColor } from "./schema";

export function categoryActiveRing(color: MenuCategoryColor): string {
  switch (color) {
    case "cyan":
      return "ring-2 ring-accent-cyan/70";
    case "green":
      return "ring-2 ring-accent-green/70";
    case "yellow":
      return "ring-2 ring-accent-yellow/80";
    case "pink":
      return "ring-2 ring-accent-pink/70";
    case "orange":
      return "ring-2 ring-accent-orange/70";
    case "red":
      return "ring-2 ring-accent-red/70";
    default:
      return "ring-2 ring-cream/40";
  }
}

export function categoryHeroGradient(color: MenuCategoryColor): string {
  switch (color) {
    case "cyan":
      return "from-accent-cyan/30 via-menu-plum to-plum";
    case "green":
      return "from-accent-green/25 via-menu-plum to-plum";
    case "yellow":
      return "from-accent-yellow/25 via-menu-plum to-plum";
    case "pink":
      return "from-accent-pink/25 via-menu-plum to-plum";
    case "orange":
      return "from-accent-orange/25 via-menu-plum to-plum";
    case "red":
      return "from-accent-red/25 via-menu-plum to-plum";
    default:
      return "from-cream/10 via-menu-plum to-plum";
  }
}
