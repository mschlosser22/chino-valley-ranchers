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
const BAND = "clamp(120px, 13.5vw, 280px)";
const GAP = 5;

export function ImageGrid() {
  return (
    <section className="relative bg-white">
      <div
        className="grid"
        style={{
          // Deliberately unequal, measured off the design by finding the white
          // gutters between the photos: 25.2 / 13.3 / 14.4 / 47.1. Equal
          // columns would read as a different composition.
          gridTemplateColumns: "25.2fr 13.3fr 14.4fr 47.1fr",
          gap: GAP,
        }}
      >
        <img
          src="/images/regen/row-barn.jpg"
          alt="Aerial view of the ranch barns and pasture"
          className="block w-full"
          style={{ height: BAND, objectFit: "cover", objectPosition: "50% 62%" }}
        />

        {/* Column two is two photographs stacked, not one -- the design splits
            it with the same gutter that separates the columns. */}
        <div
          className="grid"
          style={{
            // Explicit height: without it the stacked pair sized to its own
            // content and stood 19px taller than the other three columns,
            // breaking the row's bottom edge.
            height: BAND,
            gridTemplateRows: "1fr 1fr",
            gap: GAP,
          }}
        >
          <img
            src="/images/regen/row-hen-a.jpg"
            alt="Hens ranging among trees"
            className="block w-full h-full"
            style={{ objectFit: "cover" }}
          />
          <img
            src="/images/regen/row-hen-b.jpg"
            alt="A hen's plumage in close detail"
            className="block w-full h-full"
            style={{ objectFit: "cover" }}
          />
        </div>

        <img
          src="/images/regen/row-hen-c.jpg"
          alt="Close-up of a hen's head and comb"
          className="block w-full"
          style={{ height: BAND, objectFit: "cover", objectPosition: "50% 40%" }}
        />

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
