/* The OUR EGGS mega menu: tabs, product groups and the featured-product card
   for every product. From the Figma "CVR Mega Menu" (Nov 2026).

   Only the EGGS tab is designed; LIQUID EGGS and COOKED PRODUCTS use the same
   column style with the products the site sells in those categories.

   Card copy: the Figma's 14 cards all carry Organic Free Range's title and
   description as placeholder text, and that description is word for word the
   first sentence of content/products/organic.json. Every card therefore takes
   the first sentence of its own product's description (two where the first is
   too short to read as a description). Regenerative and Jammy have no product
   file; their lines come from the client-approved copy on those pages.

   Image boxes are the Figma's own placements for each card, as percentages of
   the card (377x400 design units): [left, top, width, height]. Most packaging
   shots overhang the card's top and sides, as drawn. The Veg-A-Fed Omega-3
   card in the Figma reuses the Organic Free Range image as a placeholder, so it
   takes the Veg-A-Fed card's layout, which is the same packaging format.

   Shell-egg accents (CVR feedback, Figma "CVR Mega Menu (1)", Nov 2026): the
   old two-egg shot is replaced per card by a polished shot with a soft
   shadow, in the colour of that product's eggs (each carton says Large
   Brown or Large White). Veg-A-Fed is the only white-egg product. Jammy
   swaps its shell eggs for a sliced soft-boiled egg. The Figma left the old
   two-egg shot on the Organic card only; it takes the brown shot used by
   the other organic shell-egg cards so no card keeps the unpolished image.

   "Free-range": CVR asked for wording without it. The Figma copy is still
   placeholder, so the Organic card and the liquid egg whites use other
   sentences from their own product pages. Note the Organic carton photo
   itself still prints "Free Range". */

const PACK = [-10.08, 0.0, 116.45, 61.5]; // Veg-A-Fed / standard carton
const BURST = [78.78, -4.25, 22.81, 19.49]; // the orange burst, top right
// Accent shots and their Figma boxes.
const BROWN = { src: "eggs-brown", box: [63.66, 29.75, 39.52, 30.25] };
const THREE = { src: "eggs-three", box: [53.85, 28.25, 61.8, 32.75] };
const WHITE = { src: "eggs-white", box: [61.27, 29.0, 41.91, 32.0] };

export const MEGA_MENU = [
  {
    id: "eggs",
    label: "Eggs",
    defaultProduct: "organic",
    columns: [
      [
        {
          heading: "Pasture-Raised Eggs",
          items: ["pasture-raised", "pasture-raised-organic"],
        },
        {
          heading: "Organic Eggs",
          items: ["organic", "organic-omega-3", "organic-omega-3-soy-free"],
        },
      ],
      [
        { heading: "Naturally Fertilized Eggs", items: ["nutri-fresh-fertile"] },
        { heading: "Regenerative Eggs", items: ["regenerative"] },
        {
          heading: "Cage Free Eggs",
          items: ["comet", "veg-a-fed", "veg-a-fed-omega-3", "humane-harvest"],
        },
      ],
    ],
  },
  {
    id: "liquid",
    label: "Liquid Eggs",
    defaultProduct: "liquid-egg-whites",
    columns: [
      [
        {
          heading: "Liquid Eggs",
          items: [
            "liquid-egg-whites",
            "pasture-raised-liquid-whole-eggs",
            "cage-free-liquid-egg-whites",
          ],
        },
      ],
      [],
    ],
  },
  {
    id: "cooked",
    label: "Cooked Products",
    defaultProduct: "jammy",
    // "The ready-to-eat, soft-boiled egg" -- the Jammy bag's own line.
    columns: [[{ heading: "Soft-Boiled Eggs", items: ["jammy"] }], []],
  },
];

export const PRODUCTS = {
  "pasture-raised": {
    name: "Pasture-Raised",
    href: "/products/pasture-raised",
    description:
      "These pasture raised eggs come exclusively from hens who enjoy the many benefits of sunshine, fresh air and water, and lots of room to roam on family farms.",
    image: "pasture-raised",
    box: [-9.28, 0.5, 115.12, 61.0],
    eggs: BROWN,
  },
  "pasture-raised-organic": {
    name: "Organic Pasture-Raised",
    href: "/products/pasture-raised-organic",
    description:
      "Our pasture raised organic eggs are delicious! These eggs come exclusively from hens who enjoy the many benefits of sunshine, fresh air and water, and lots of room to roam.",
    image: "pasture-raised-organic",
    box: [-4.51, 1.25, 108.75, 54.5],
    eggs: BROWN,
  },
  organic: {
    name: "Organic",
    href: "/products/organic",
    // The product page's second sentence; its first says "free-range" twice.
    description:
      "To ensure purity and quality, we mill our own feed onsite at Southern California’s only dedicated organic poultry feed mill.",
    image: "organic",
    box: [-9.02, 1.25, 114.32, 59.75],
    eggs: BROWN,
  },
  "organic-omega-3": {
    name: "Organic Omega-3",
    href: "/products/organic-omega-3",
    description:
      "Our Organic Omega-3 eggs come from hens raised in free roaming environments and fed a special organic diet that contains flax seed—a grain naturally high in Omega-3 fatty acids.",
    image: "organic-omega-3",
    box: [-9.81, -0.25, 115.92, 61.25],
    eggs: THREE,
  },
  "organic-omega-3-soy-free": {
    name: "Organic Omega-3 Soy-Free Corn-Free",
    // The Figma breaks this one with a line separator after "Omega-3".
    lines: ["Organic Omega-3", "Soy-Free Corn-Free"],
    href: "/products/organic-omega-3-soy-free",
    description:
      "Our Organic Omega-3 eggs are fed a special soy-free, corn-free diet that contains flax seed—a grain naturally high in Omega-3 fatty acids.",
    image: "organic-omega-3-soy-free",
    box: [-5.04, 1.5, 109.55, 54.75],
    eggs: BROWN,
  },
  "nutri-fresh-fertile": {
    name: "Nutri-Fresh Fertile",
    href: "/products/nutri-fresh-fertile",
    description:
      "Our Nutri-Fresh Fertile eggs come from hens raised right along side roosters in a free roaming environment.",
    image: "nutri-fresh-fertile",
    box: [-10.61, 11.84, 116.98, 49.0],
    eggs: THREE,
  },
  regenerative: {
    name: "Regenerative Eggs",
    href: "/regenerative",
    description:
      "Our regenerative eggs are pasture raised on family farms, with sustainable and regenerative farming practices.",
    image: "regenerative",
    box: [-4.43, 1.25, 111.95, 53.85],
    eggs: THREE,
  },
  comet: {
    name: "Comet Eggs",
    href: "/products/comet-eggs",
    description:
      "Comet Eggs have become the latest trend in interstellar haute cuisine. Discriminating chefs everywhere choose Comet Eggs for their striking orange yolks.",
    image: "comet",
    box: [-12.2, -9.25, 127.85, 80.25],
    eggs: BROWN,
  },
  "veg-a-fed": {
    name: "VEG-A-FED",
    href: "/products/veg-a-fed",
    description:
      "Our Veg-A-Fed eggs come from hens raised in free roaming environments and fed a pure vegetarian diet consisting of premium grains, seeds & meal.",
    image: "veg-a-fed",
    box: PACK,
    eggs: WHITE,
  },
  "veg-a-fed-omega-3": {
    name: "VEG-A-FED Omega-3",
    href: "/products/veg-a-fed-omega-3",
    description:
      "Our Veg-a-Fed Omega-3 eggs come from hens raised in free roaming environments and fed a special vegetarian diet that contains flax seed—a grain naturally high in Omega-3 fatty acids.",
    image: "veg-a-fed-omega-3",
    box: PACK,
    eggs: BROWN,
  },
  "humane-harvest": {
    name: "Humane Harvest",
    href: "/products/humane-harvest",
    description:
      "Our Humane Harvest eggs come from hens raised in free roaming environments and fed a pure vegetarian diet consisting of premium grains, seeds & meal.",
    image: "humane-harvest",
    box: [-10.08, 0.25, 115.92, 61.5],
    eggs: BROWN,
  },
  "liquid-egg-whites": {
    // "Organic" now that the tab also has the cage-free egg whites.
    name: "Organic Liquid Egg Whites",
    href: "/products/liquid-egg-whites",
    description:
      "Our 100% Liquid Organic Egg Whites are naturally fat free, cholesterol free, and contain no additives or artificial ingredients.",
    image: "liquid-egg-whites",
    box: [18.3, -4.5, 90.19, 63.0],
    burst: [62.07, -8.5, 22.81, 19.49],
    eggs: THREE,
  },
  "pasture-raised-liquid-whole-eggs": {
    name: "Pasture Raised Liquid Whole Eggs",
    href: "/products/pasture-raised-liquid-whole-eggs",
    description:
      "Chino Valley Ranchers Pasture Raised Liquid Whole Eggs come from pasture raised hens who are free to roam the fields and eat grass, seeds, bugs and worms.",
    image: "pasture-raised-liquid-whole-eggs",
    box: [26.53, -8.75, 79.05, 72.0],
    burst: [61.01, -8.5, 22.81, 19.49],
    eggs: null, // its pack shot already has eggs beside it
  },
  // New in the Figma's second round. There is no product page yet, so the
  // card goes to the store locator; copy is from the carton ("Cage Free 100%
  // Liquid Egg Whites, Pasteurized") and the organic page's wording.
  "cage-free-liquid-egg-whites": {
    name: "Cage-Free Liquid Egg Whites",
    href: "/store-locator",
    description:
      "Our 100% Liquid Cage-Free Egg Whites are pasteurized, naturally fat free and cholesterol free, with no additives or artificial ingredients.",
    image: "cage-free-liquid-egg-whites",
    box: [15.12, -12.25, 69.5, 68.75],
    burst: [61.01, -8.5, 22.81, 19.49],
    eggs: { src: "eggs-three", box: [46.68, 25.75, 61.8, 32.75] },
  },
  jammy: {
    name: "Jammy Eggs",
    href: "/jammy",
    description:
      "The only egg with a golden, jammy center that makes any meal a moment.",
    image: "jammy",
    box: [17.24, -7.25, 69.5, 73.75],
    // A sliced soft-boiled egg in place of shell eggs (CVR feedback). The
    // Figma hung it off the card's right edge; CVR round 2 asked for it
    // "closer to the bag", so it tucks against the bag's lower-right corner
    // like the shell eggs do on the carton cards.
    eggs: { src: "jammy-halves", box: [60.5, 36.0, 32.89, 22.5] },
    burst: [63.66, -9.75, 22.81, 19.49],
  },
};

export const CARD_DEFAULTS = { burst: BURST };
