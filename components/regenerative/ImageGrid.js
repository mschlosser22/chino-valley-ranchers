/* Section 5 of the CVR Regen Page design: a four-photo row.

   The columns are deliberately unequal. Measured off the design render by
   finding the white gutters between the photos:

     barn aerial   25.2%
     hen mid       13.3%
     hen close     14.4%
     woodland      47.1%

   That is why this is a grid with explicit fractions rather than four equal
   columns -- the rhythm is part of the design, and equal thirds would read
   as a different composition.

   It was a single flat JPEG before, which meant no alt text per photo and no
   way for the row to reflow on a phone. */
/* The frame (Layer 59, 2075x570) carries its tears at rows 49 and 492, so the
   photographs occupy only the 77.7% between them. The section is the frame's
   full 27.47vw; the photo band is that clear middle, and the frame is placed
   so its torn strips land on the band's top and bottom edges rather than
   across the pictures. */
const FRAME = 27.47;                 // vw, Layer 59's 570 of the 2075 artboard
const CLEAR = 0.7772;                // share of the frame between its tears
/* The tiles fill the grid, which is the band between the frame's two rules.
   This was clamp(150px, 21.35vw, 443px): on phones the section holds its
   150px floor, the band between the rules is ~117px of that, and the 150px
   tiles ran 33px past the bottom rule. 100% only works because the outer grid
   also pins its row to minmax(0, 1fr) -- with an auto row the grid grows to
   the images' intrinsic height and they overrun by 44px at 768 and 83px at
   1440 instead. (Review item WI-2; sec5tilestest.) */
const BAND = "100%";
const TEAR_TOP = FRAME * 49 / 570;    // vw, depth of the frame's top tear
const TEAR_BOT = FRAME * 78 / 570;    // vw, depth of its bottom tear
const GAP = 5;

/* One photograph behind the middle three windows, exactly as the design's
   clipping frame does it. Each window needs its own background-size and
   position because the boxes differ in size: a percentage position aligns the
   same fraction of the image with the same fraction of the box, so the values
   are offset/(imageSize - boxSize), not a pixel offset. Sizes are the photo's
   1306px width over each box's design width, which keeps the bird at ONE scale
   across all three -- fitting a separate image per window is what made its head
   smaller than its body. */
const SHOT = (size, x, y) => ({
  backgroundImage: "url(/images/regen/row-hen-c.jpg)",
  backgroundSize: `${size} auto`,
  backgroundPosition: `${x} ${y}`,
  backgroundRepeat: "no-repeat",
  /* Any sliver the photograph does not reach reads as shade, not as a white
     notch in the row. */
  backgroundColor: "#6b5a3a",
});

export function ImageGrid() {
  return (
    /* The section is the frame's full height; the grid is inset by each tear's
       depth so the torn strips land on the photographs' top and bottom edges.
       Sizing the section to the grid instead left the frame hanging 54px below
       it, with the next section's burlap showing through the pictures. */
    /* No background colour: the frame is 95% transparent, and bg-white filled
       its torn rows with white so the row read as floating in a white gap. In
       the design those rows show the grass above and the burlap below through
       the tear, which is what the neighbouring sections supply once nothing
       paints over them. */
    <section
      className="relative"
      /* Pulled up by the top tear's depth so the frame's transparent rows sit
         over the grass above rather than the page's white -- the same overlap
         the grass/photo seam needs in sections 3 and 4. */
      /* zIndex so the frame's bottom tear paints OVER the next section's
         burlap: without it the burlap starts at the section boundary and
         covers the photographs' lower edge instead of tearing away from it. */
      style={{
        height: `${FRAME}vw`,
        minHeight: 150,
        marginTop: `-${TEAR_TOP.toFixed(2)}vw`,
        /* Clip the frame's overhang: it is rendered 115.85% tall so its top
           tear lands correctly, and the surplus below carries its bottom tear.
           Unclipped that showed as a second rip under the burlap's TornEdge. */
        overflow: "hidden",
        /* No z-index on the section: lifting the whole row above the next
           section meant its frame's transparent bottom rows showed the page's
           white instead of the burlap tearing in behind them. The frame and
           the photographs carry their own z-index within the row, which is
           enough to keep the burlap off the pictures. */
      }}
    >
      {/* The design frames this row in torn white paper: Layer 59 is a
          2075x570 plane that is 95% transparent, carrying a ragged top edge
          (rows 1..49) and bottom edge (rows 492..568) in pure white. It is
          drawn OVER the photographs, so the row reads as a strip of pictures
          torn out of the page rather than a hard-edged band. */}
      <img
        src="/images/regen/row-frame.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-x-0 w-full"
        /* Sized to the SECTION, not to vw: below the phone breakpoint the
           section hits its 150px floor while a vw height keeps shrinking, and
           the two come apart. */
        /* The frame is used WHOLE. It is a hand-painted grid: a rule top and
           bottom, three verticals, and a short rule splitting the stacked pair.
           The verticals overshoot the rules slightly, which is the drawn
           character -- but cropping the asset removed the BOTTOM rule and left
           those overshoots running to the cut edge with nothing terminating
           them, which read as loose white lines through the photographs. */
        style={{ top: 0, height: "100%", zIndex: 2, pointerEvents: "none" }}
      />
      <div
        className="grid absolute inset-x-0"
        style={{
          /* percentages of the section so the insets track the frame at every
             width, including where the section is on its minimum height */
          top: `${(100 * 49 / 570).toFixed(2)}%`,
          /* Between the frame's two rules: rows 49 and 493 of its 570. */
          bottom: `${(100 * 77 / 570).toFixed(2)}%`,
          // Deliberately unequal, measured off the design by finding the white
          // gutters between the photos: 25.2 / 13.3 / 14.4 / 47.1. Equal
          // columns would read as a different composition.
          /* Three columns, not four: the middle one holds all three windows
             onto the shared photograph. Fractions are the design's own --
             barn 695, shared column 569, woodland 974 of the 2246-wide row. */
          /* Four columns, aligned to the frame's own gutter bars (x520-524,
             799-801, 1096-1097 of its 2075 width). Collapsing the middle two
             into one put those bars through the middle of the photographs. */
          gridTemplateColumns: "25.060fr 0.193fr 13.253fr 0.096fr 14.217fr 0.048fr 47.133fr",
          /* No gap: the frame carries the gutters itself, as full-height bars
             at x520-524, 799-801 and 1096-1097 of its 2075 width. A grid gap
             on top of those drew a second set, which is the white lines
             standing proud of the row. */
          gap: 0,
          gridTemplateRows: "minmax(0, 1fr)",
        }}
      >
        <img
          src="/images/regen/row-barn.jpg"
          alt="Aerial view of the ranch barns and pasture"
          className="block w-full"
          style={{ height: BAND, objectFit: "cover", objectPosition: "50% 62%" }}
        />

        {/* Columns two and three are THREE WINDOWS ONTO ONE PHOTOGRAPH, not
            three images. In the design they are three masks (Rectangle 10 copy
            7, copy 3 and copy 6) inside a single 569x443 clipping frame over
            one 1306x734 shot, which is why the bird reads at a consistent
            scale across them. Fitting a separate image to each window is what
            made the head smaller than the body.

            Each window carries the same background-size and a shifted
            background-position, so the photograph is continuous behind them. */}
        <div />

        <div
          className="grid"
          style={{ height: BAND, gridTemplateRows: "50.11fr 1.36fr 48.53fr", gap: 0 }}
        >
          <div
            role="img"
            aria-label="Hens ranging among trees"
            style={SHOT("481.92%", "24.06%", "34.96%")}
          />
          <div />
          <div
            role="img"
            aria-label="A hen's plumage in close detail"
            style={SHOT("481.92%", "24.06%", "78.42%")}
          />
        </div>

        <div />

        <div
          role="img"
          aria-label="Close-up of a hen's head and comb"
          style={{ height: BAND, ...SHOT("447.26%", "51.87%", "61.51%") }}
        />

        <div />

        <img
          src="/images/regen/row-woodland.jpg"
          alt="A flock ranging among trees at sunrise"
          className="block w-full"
          style={{ height: BAND, objectFit: "cover" }}
        />
      </div>
    </section>
  );
}
