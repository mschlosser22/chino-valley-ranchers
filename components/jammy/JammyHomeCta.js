import { BlocksControls } from "react-tinacms-inline";

/**
 * Homepage promo band for The Jammy Egg, linking through to /jammy.
 *
 * The source Figma frame was a single 16MB SVG with the headline, body copy and
 * button baked into the artwork. That is rebuilt here as real text over the
 * photograph: it stays sharp on any display, is readable by search engines and
 * screen readers, and can reflow on small screens -- none of which a flattened
 * image can do. Only the photo is an asset.
 *
 * The egg sits centre-right in the frame, so the copy occupies the left on wide
 * screens. Below 768px there is no room to sit text beside it, so the photo
 * becomes a banner above the copy rather than a backdrop behind it.
 */
export function JammyHomeCta() {
  return (
    <section
      className="jammy-cta"
      aria-labelledby="jammy-cta-heading"
      style={{ position: "relative", background: "#A9D4EC", overflow: "hidden" }}
    >
      <div className="jammy-cta__media">
        <img
          src="/images/jammy/cta-messy.jpg"
          srcSet="/images/jammy/cta-messy-sm.jpg 1200w, /images/jammy/cta-messy.jpg 2000w"
          sizes="(max-width: 767px) 100vw, 100vw"
          alt="A soft-boiled Jammy Egg on a spoon with its golden yolk running out"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="jammy-cta__copy">
        <h2 id="jammy-cta-heading" className="jammy-cta__heading">
          Messy looks
          <br />
          good on you.
        </h2>
        <p className="jammy-cta__body">
          Our newest product, The Jammy Egg, is a ready-to-eat soft-boiled egg
          with a golden, jammy center made to upgrade toast, ramen, bowls,
          salads, snacks, and everything in between.
        </p>
        <a href="/jammy" className="jammy-cta__button">
          Explore Jammy
        </a>
      </div>
    </section>
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
