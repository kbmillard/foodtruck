# La Hamburguesa Loca — `foodtruck`

Production-ready **one-page** Next.js experience for La Hamburguesa Loca: editorial navigation, cinematic sections, interactive menu, live cart drawer, Clover tokenization modal, and a mock order API — all on a single homepage.

## Local setup

From `/Users/kyle/Desktop/foodtruck`:

```bash
npm install
npm run dev
```

`npm install` runs **`postinstall`** to generate `public/icons` from `scripts/brand-source.svg` (run `npm run icons` anytime to refresh).

Open [http://localhost:3000](http://localhost:3000).

## Restaurant Menu Updates

The live site reads the menu from **Google Sheets** (published as CSV). The restaurant team can update the website by editing the Sheet — no code deploy is required for name, description, price, photos, or hiding an item.

- **How it works:** Each row is one menu item. The app fetches the published CSV about every **5 minutes**, so changes appear on the site shortly after you save in Sheets.
- **`active`:** Set to `FALSE` to hide an item from the menu.
- **`price`:** Leave **blank** for **Price TBD** on the site. Add a number (e.g. `12.99`) when the price is confirmed. **Add real prices before turning on live card checkout** (Clover); until then, guests use **Send Order Request** for carts with unknown prices.
- **`imageUrl`:** Optional. Leave blank if you do not have a photo yet.
- **Required columns (header row):**  
  `id`, `active`, `category`, `sortOrder`, `name`, `description`, `price`, `includesFries`, `meatChoiceRequired`, `featured`, `imageUrl`

Start from **`prompt/google-sheet-menu-template.csv`**, publish the tab as CSV, and set **`MENU_CSV_URL`** on Vercel (see Environment variables). More detail: **`prompt/menu-management.md`**.

## Food Truck Location Updates

Restaurant and food truck addresses, hours, status, and map links can come from a **second Google Sheet** published as CSV — no deploy needed for most location changes.

- **How it works:** Each row is one location (`restaurant` or `food_truck`). The app fetches the CSV about every **5 minutes** (same cache window as the menu).
- **`active`:** Set to `FALSE` to hide that row from the public site.
- **`status`:** Short label guests see (e.g. `Open`, `Closed`, `Moving Soon`, `Catering Event`, `Sold Out`).
- **`statusNote`:** Extra line — e.g. where the truck is parked today (“At Al Halal Grocery Store”).
- **`mapsUrl`:** Full **Open in Google Maps** link for that row. If blank, the site builds a search link from the address fields.
- **`embedUrl`:** **iframe-safe** Google Maps embed URL for the expandable map panel. If blank but **`lat`** / **`lng`** are set, the site uses a coordinate-based embed; if those are missing too, it shows the address and a map placeholder with an **Open in Google Maps** button (nothing breaks).
- **Columns:** See **`prompt/google-sheet-locations-template.csv`** for the full header row and examples.

Set **`LOCATIONS_CSV_URL`** on Vercel (preferred) or **`NEXT_PUBLIC_LOCATIONS_CSV_URL`** to enable live updates. If neither is set or the fetch fails, **`lib/locations/local-locations.ts`** is used.

The **footer** Visit and Hours blocks use the same **`/api/locations`** data (via **`LocationsCatalogProvider`**), with the same CSV + local fallback. If the client request fails, the footer still shows canonical visit lines and hours from **`lib/locations/footer-visit-fallbacks.ts`**.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run lint` | ESLint |
| `npm run icons` | Generate `public/icons/*` from `scripts/brand-source.svg` |

## Environment variables

Copy `.env.example` to `.env.local` and fill as needed:

- **`NEXT_PUBLIC_SITE_URL`** — Canonical site URL for metadata + JSON-LD image URLs (optional; layout has a default).
- **`MENU_CSV_URL`** — Published Google Sheet **CSV** URL (server-side fetch). When unset, `/api/menu` serves the local TypeScript menu. See `prompt/menu-management.md`.
- **`NEXT_PUBLIC_MENU_CSV_URL`** — Optional alternate env name (also read server-side); prefer `MENU_CSV_URL` on Vercel.
- **`LOCATIONS_CSV_URL`** — Published Google Sheet **CSV** for locations (restaurant + food truck). When unset or on fetch error, `/api/locations` uses `lib/locations/local-locations.ts`. Prefer this over `NEXT_PUBLIC_*` on Vercel.
- **`NEXT_PUBLIC_LOCATIONS_CSV_URL`** — Optional alternate (read server-side in `get-locations.ts`); same CSV shape as the template.
- **`NEXT_PUBLIC_CLOVER_PUBLIC_TOKEN_SANDBOX`** — Clover public / PAKMS-style key for sandbox.
- **`NEXT_PUBLIC_CLOVER_MERCHANT_ID_SANDBOX`** — Clover merchant ID for sandbox.
- **`NEXT_PUBLIC_CLOVER_ENV`** — `sandbox` or `production`.

Without Clover keys, checkout still works using a **demo token** so you can test `/api/orders`.

## Clover sandbox notes

1. Create / locate your Clover sandbox app and merchant.
2. Retrieve the **public ecommerce key** and **merchant ID** from the Clover dashboard or developer tools.
3. Place them in `.env.local` as above and reload `npm run dev`.
4. The SDK script loads from `https://checkout.clover.com/sdk.js` (see `lib/clover/loadClover.ts`). If Clover updates element APIs, adjust `CloverPaymentModal` while keeping the integration isolated.

## Vercel (`foodtruck` project)

1. Import this repo into a Vercel project named **foodtruck** (or link via CLI).
2. Set the same environment variables in the Vercel dashboard (Production + Preview).
3. Deploy; confirm `metadataBase` / `NEXT_PUBLIC_SITE_URL` match your production domain for OG + schema URLs.
4. Icons: **`postinstall`** runs `npm run icons`, so `public/icons` is created on every `npm install` (including Vercel builds). Optionally commit `public/icons/` so local clones work offline without Sharp.

## Launch checklist (remaining follow-ups)

These need **you / the business** (not fully automatable in repo code):

| Item | What to do |
| --- | --- |
| **Menu CSV** | Publish the Google Sheet as CSV; set **`MENU_CSV_URL`** on Vercel. |
| **Locations CSV** | Publish the locations tab as CSV; set **`LOCATIONS_CSV_URL`** (see **`prompt/google-sheet-locations-template.csv`**). |
| **Menu images** | If `imageUrl` uses a host not in `next.config.ts`, add that hostname under `IMAGE_HOSTS`. |
| **Confirmed prices** | Fill prices in the sheet or `local-menu.ts`, then enable real Clover charges (see TODOs in `lib/menu/local-menu.ts` and `CloverPaymentModal`). |
| **Orders** | Replace mock logic in `app/api/orders/route.ts` (email, POS, Clover server-side charge). |
| **Catering form** | Wire `components/catering/CateringSection.tsx` to email or a server action. |
| **Map** | Section uses embedded Google Maps; upgrade to a keyed Maps/Mapbox product if you need analytics or custom styling. |
| **Brand assets** | Copy final logo pack into `la_hamburguesa_loca_web_assets` / `public/icons` per `prompt/asset-map.md`. |
| **Security audit** | Run `npm audit`; optional later: replace `to-ico` if transitive advisories matter to you. |

## Replacing the mock order API

Edit or replace `app/api/orders/route.ts`:

- Keep strict payload validation (or move validation to shared code).
- On the server, exchange the Clover token for a charge / order pay operation using **secret** keys.
- Point `submitOrder` in `context/OrderContext.tsx` to your new endpoint if the path changes.

## Editable content

See `prompt/content-map.md` for where menu data, copy, hours, and catering config live. Primary data files:

- `lib/menu/local-menu.ts` (fallback menu items when no CSV is set)
- `lib/menu/category-meta.ts` (category tab labels and colors for the interactive menu)
- `lib/menu/get-menu.ts` / `app/api/menu/route.ts` (Sheet + fallback)
- `lib/locations/*` and **`GET /api/locations`** (Sheet + fallback); **`components/footer/SiteFooter.tsx`** reads visit/hours via **`LocationsCatalogContext`** (with hardcoded visit/hours fallbacks in `lib/locations/footer-visit-fallbacks.ts` when the API is empty or unavailable); **`lib/data/locations.ts`** keeps **`CONTACT`**, **`HOURS_LINES`** (Instagram line), and legacy **`RESTAURANT` / `TRUCK`** for non–UI consumers only.
- `lib/data/services.ts`
- `lib/data/essence.ts`

## Logo / favicon / manifest

- **Intended assets:** `/Users/kyle/Desktop/foodtruck/la_hamburguesa_loca_web_assets` (see its `README.md`).
- **Runtime paths:** `public/icons/` — favicon, PNG sizes, WebP, `site.webmanifest`.
- **Wiring:** `app/layout.tsx` metadata + `components/ui/BrandLogo.tsx`.
- **Mapping:** `prompt/asset-map.md`.

## Prompt guide (`/prompt`)

Helper docs for future edits:

- `prompt/implementation-notes.md` — architecture, flow, Clover, API replacement.
- `prompt/content-map.md` — copy and data locations.
- `prompt/asset-map.md` — icons + metadata mapping.

The original creative brief: `prompt/la_hamburguesa_loca_one_page_cursor_prompt.txt`.
