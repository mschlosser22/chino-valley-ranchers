/* Section 4 of the CVR Regen Page design: "THE NEXT Generation" on a torn
   card, with the hen cut-out overlapping it from the left.

   Geometry measured off the design render (2075px wide):
     torn card    52.5% wide, left edge at 36.9%
     THE NEXT     20.9% of canvas
     Generation   28.0% of canvas
     hen divider   4.1% of canvas

   Colours sampled from the render: teal #006088, orange #F8A014.

   The hen is a real cut-out: the .fig ships the photograph and its mask as
   separate layers, so the two are composited rather than the shape being
   approximated. */
export function ImageFull() {
  return (
    <section
      /* overflow visible and above section 3 in the stack: the rooster's comb
         reaches 13px past the grass in the design (its top is y3036 against a
         grass bottom of y3049), so the head paints OVER the grass. With
         overflow:hidden the section clipped its own photo flat at the seam no
         matter what z-index it carried. */
      className="relative regen-next-section"
      /* The design's band: 1363 of the 2075 artboard. */
      style={{ minHeight: "65.69vw", containerType: "inline-size", zIndex: 1 }}
    >
      {/* One photograph, torn at the top in its own alpha -- exactly the
          design's "Background" layer cropped to this band. It already contains
          the foreground hen with its head crossing the rip, so there is no
          separate cut-out to composite: drawing hen-next.webp over this was
          duplicating the bird that is already in the picture. */}
      <img
        src="/images/regen/hens-next.webp"
        alt=""
        aria-hidden="true"
        /* Pinned to the top so its torn edge lands on the seam, and at least
           the band's height so it never leaves a gap at the bottom. The crop
           is 2094x1192 against a 2075x1363 band, so it is scaled up slightly
           rather than letterboxed. */
        /* Lifted so the comb clears the tear. The asset's rip runs rows 0..71
           and the comb starts at row 59, so only ~10px of head sits above the
           deepest part of the tear at 1440 -- pulling the photo up by the
           tear's own depth lets that show over section 3's grass instead of
           being cut flat at the seam. */
        className="absolute inset-x-0 w-full"
        style={{
          top: "-6%",
          minHeight: "106%",
          objectFit: "cover",
          objectPosition: "top",
          zIndex: 1,
        }}
      />

      <div className="regen-next-stage" style={{ zIndex: 2 }}>
        {/* Torn card, from the design's own artwork (Layer 2 copy 9). */}
        <img
          src="/images/regen/card-next.png"
          alt=""
          aria-hidden="true"
          className="absolute"
          style={{ left: "34.80%", top: "37.93%", width: "62.07%", zIndex: 1 }}
        />

        <h2 className="absolute m-0" style={{ left: "53.83%", top: "37.27%", width: "31.90%", zIndex: 3 }}>
          {/* Ultra, not DIN Condensed -- read from the text node. */}
          <span
            className="block uppercase text-center"
            style={{
              fontFamily: "'Ultra', Rockwell, Georgia, serif",
              color: "#00608B",
              fontSize: "3.314cqw",
              letterSpacing: "0.0824em",
              lineHeight: 1.121,
            }}
          >
            The Next
          </span>
          <span
            className="block text-center"
            style={{
              fontFamily: "nexa-rust-script-shad-2, cursive",
              color: "#F9A115",
              fontSize: "5.590cqw",
              lineHeight: 0.964,
              letterSpacing: "0.0135em",
              marginTop: "-0.06em",
            }}
          >
            Generation
          </span>
        </h2>

        {/* Rule + hen + rule, at the design's own coordinates. */}
        <span aria-hidden="true" className="absolute" style={{ left: "57.83%", top: "57.01%", width: "9.06%", height: 2, background: "#2B2B2B", zIndex: 3 }} />
        <img
          src="/images/regen/hen-divider.png"
          alt=""
          aria-hidden="true"
          className="absolute"
          style={{ left: "68.43%", top: "53.19%", width: "4.34%", zIndex: 3 }}
        />
        <span aria-hidden="true" className="absolute" style={{ left: "74.02%", top: "57.01%", width: "9.06%", height: 2, background: "#2B2B2B", zIndex: 3 }} />

        <p
          className="absolute m-0 text-center"
          style={{
            left: "53.83%", top: "60.16%", width: "31.90%", zIndex: 3,
            fontFamily: "'Lato', system-ui, sans-serif",
            color: "#000000",
            fontSize: "1.574cqw",
            letterSpacing: "0.0199em",
            lineHeight: 1.5,
          }}
        >
          We believe regenerative agriculture is one of many promising
          approaches shaping the future of farming. By working in harmony
          with the land and incorporating thoughtful farming practices, it
          offers another opportunity to support the well-being of our birds
          while contributing to a healthier agricultural system.
        </p>
      </div>
    </section>
  );
}
