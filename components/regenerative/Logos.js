/* Certification marks.

   Not part of the CVR Regen Page design -- flagged for the client rather than
   removed, since it may have been added deliberately after the comp.

   It did carry a real bug: four fixed-height logos in a single non-wrapping
   flex row with gap-20. At 390px that left the CCOF and Pareve marks
   rendering at 5x6 and 6x6 pixels. They wrap now, and each is capped by width
   rather than pinned to a 219px height. */
const MARKS = [
  { src: "/images/co.png", alt: "Certified Organic" },
  { src: "/images/usda.png", alt: "USDA Organic" },
  { src: "/images/ccof-logo.png", alt: "CCOF Certified Organic" },
  { src: "/images/pareve-logo.png", alt: "OK Kosher Pareve certified" },
];

export function Logos() {
  return (
    <div className="relative bg-white border-b-4 border-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-8 px-8 py-12 sm:gap-14 lg:gap-20 lg:py-20">
        {MARKS.map((m) => (
          <img
            key={m.src}
            src={m.src}
            alt={m.alt}
            className="block h-auto w-auto"
            style={{ maxHeight: 132, maxWidth: "38%" }}
          />
        ))}
      </div>
    </div>
  );
}
