import type { MenuCategoryMeta } from "./schema";

/**
 * Editorial styling for menu category tabs. Labels must match sheet `category` values
 * (case-insensitive match in `InteractiveMenu`).
 */
export const MENU_CATEGORY_META: MenuCategoryMeta[] = [
  {
    id: "hamburguesas",
    label: "Hamburguesas",
    panelKickerEn: "Hamburgers",
    subtitle: "With fries",
    color: "cyan",
    number: "01",
  },
  { id: "tacos", label: "Tacos", panelKickerEn: "Tacos", subtitle: "Street classics", color: "green", number: "02" },
  {
    id: "tortas",
    label: "Tortas",
    panelKickerEn: "Tortas",
    subtitle: "Mexican sandwiches",
    color: "yellow",
    number: "03",
  },
  {
    id: "antojitos",
    label: "Antojitos",
    panelKickerEn: "Antojitos",
    subtitle: "Mexican cravings",
    color: "pink",
    number: "04",
  },
  {
    id: "kids-menu",
    label: "Kids Menu",
    panelKickerEn: "Kids Menu",
    subtitle: "Simple favorites",
    color: "orange",
    number: "05",
  },
  {
    id: "drinks",
    label: "Drinks",
    panelKickerEn: "Drinks",
    subtitle: "Sodas and aguas frescas",
    color: "red",
    number: "06",
  },
];
