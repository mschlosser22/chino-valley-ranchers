import { BlocksControls } from "react-tinacms-inline";

/**
 * Homepage promo band for The Jammy Egg, linking through to /jammy.
 *
 * Built from the "CVR Home Page" design file. The torn top and bottom edges are
 * baked into the supplied artwork as real transparency, so no CSS mask is
 * involved -- the image is served as WebP to keep that alpha channel (an
 * earlier JPEG conversion flattened it to white and lost the tears).
 *
 * The photograph is the only asset. In the design the headline, body and button
 * were baked into a 16MB export; here they are real text, so they stay sharp,
 * reflow on small screens, and are readable by search engines and screen
 * readers.
 *
 * Layout switches at 900px via a container query, matching the design. Above
 * that the photo is a full-bleed backdrop with the copy sitting left; below it
 * the photo becomes a banner above the copy, since there is no room beside the
 * egg on a phone.
 */

export function JammyHomeCta() {
  return (
    <div className="jammy-cta__container">
      <section className="jammy-cta" aria-labelledby="jammy-cta-heading">
        {/* Background image rather than <img>: the design zooms past cover to
            slide the spoon clear of the copy, which object-fit cannot express.
            Decorative, so the alt text lives on the section's heading instead. */}
        <div className="jammy-cta__photo" role="img" aria-label="A soft-boiled Jammy Egg on a spoon with its golden yolk running out"></div>

        <div className="jammy-cta__content">
          <h2 id="jammy-cta-heading" className="jammy-cta__head">
            Messy Looks
            <br />
            Good On You.
          </h2>
          <p className="jammy-cta__body">
            Our newest product, The Jammy Egg, is a ready-to-eat soft-boiled egg
            with a golden, jammy center made to upgrade toast, ramen, bowls,
            salads, snacks, and everything in between.
          </p>
          <a href="/jammy" className="jammy-cta__cta">
            Learn More
          </a>
        </div>

      </section>
    </div>
  );
}

export const jammyHomeCtaBlock = {
  Component: ({ index, data }) => (
    <BlocksControls index={index}>
      <JammyHomeCta {...data} />
    </BlocksControls>
  ),
  template: {
    label: "Jammy Egg Promo",
    defaultItem: {},
    fields: [],
  },
};

export default JammyHomeCta;
