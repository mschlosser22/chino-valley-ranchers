import { BlocksControls } from "react-tinacms-inline";

/**
 * Homepage promo band for The Jammy Egg, linking through to /jammy.
 *
 * Built from the "Comet Eggs Section" design file. The torn top and bottom
 * edges are inline SVG paths rather than the raster strips used elsewhere on
 * the site -- they scale to any width without resampling, cost nothing to load,
 * and take their colour from whatever sits above and below.
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

/* Torn edge silhouettes, lifted from the design file. */
const TEAR_TOP =
  "M0,0 H1435 V16 L1435,16 L1419.4,15 L1402.4,17.2 L1383,22.1 L1373,22 L1361.9,10.5 L1345.4,17.8 L1322.2,22.9 L1306.6,31 L1284.9,23.2 L1275.9,16.5 L1261.6,23.8 L1254.8,24.9 L1236.6,17.9 L1221.1,6.5 L1196,21.9 L1173.8,14.8 L1157.8,15.7 L1131.5,16.4 L1112.1,24 L1098.1,22 L1085.6,21.9 L1070,6.5 L1043,23.5 L1028.1,14.6 L1017.6,21.1 L1011,18.5 L989.9,19.7 L975.6,14.1 L964.9,7.4 L943.6,23.2 L916.3,6.6 L902.2,15.8 L891.2,22.3 L882.2,19.6 L864.8,20.4 L850.9,20 L839.9,22.8 L823.5,6.3 L798.3,23.5 L773.3,19.7 L758,14.6 L741.3,21.4 L721.7,23.6 L703,17.6 L677.9,17.7 L652,16.1 L628.3,14.3 L607.8,23.5 L580.1,16.8 L552.5,18.4 L537.9,17.5 L517.4,22.8 L491.5,21.3 L481.4,19.6 L471.2,19.4 L448.3,20.8 L434.6,20.9 L413.9,18.1 L402.2,24.8 L375.3,17.7 L356,22.9 L339,20.3 L328.3,7.5 L309.6,34.9 L301.2,23 L277.3,10.6 L261.8,27.6 L239.7,20.7 L213.6,9.9 L199.2,20.2 L185.8,9.7 L174.1,15.1 L163.4,17.5 L136.2,24.1 L119.3,21.1 L99.1,6.7 L84,15.5 L60.5,18.8 L45.9,20.9 L26.8,17 L0,16 Z";

const TEAR_BOTTOM =
  "M0,40 H1435 V24 L1435,24.0 L1422.6,23.9 L1416,21.1 L1402.6,30.1 L1382.3,31.5 L1368.4,10.7 L1344.6,21.3 L1331.3,16.7 L1322.6,16.9 L1298.3,20.1 L1277.2,25.7 L1258,25.4 L1233.3,24.1 L1217.6,33.6 L1194.7,19.6 L1184.8,19.8 L1172.3,29.9 L1148.7,15.6 L1125.4,19.6 L1111.9,23.9 L1092.8,10.7 L1083.5,15.9 L1065.5,30.1 L1051,22.6 L1038.3,23.8 L1010.6,24.8 L998.4,19.1 L976.7,33.2 L959.2,20.2 L948.6,11.5 L937.1,16.7 L909.1,23.4 L895.6,20.8 L873.8,12.4 L850.7,15.4 L836.7,17.0 L820.7,20.3 L803.7,21.3 L790.7,22.1 L777.7,25.2 L763.3,17.1 L743.9,18.6 L731,20.5 L713.9,20.1 L705.9,17.7 L691.2,18.3 L670.8,15.4 L647.9,25.6 L638.1,24.6 L627.8,32.7 L618.4,20.2 L592.6,20.6 L564.7,21.2 L556.7,33.1 L537.8,22.5 L525.4,32.3 L515.9,23.3 L499.9,18.7 L478.4,19.5 L471.6,20.6 L446.3,23.3 L432.8,20.5 L407.8,9.2 L398.7,25.8 L392.2,32.1 L385.1,17.3 L368.6,21.3 L347.9,17.6 L333.7,19.4 L306.6,21.3 L282.7,21.5 L257.8,24.0 L238.2,21.9 L229.4,17.0 L210.5,30.7 L184.5,19.3 L178.3,18.9 L150.7,16.1 L141.6,23.5 L114.2,23.7 L102.1,15.1 L80.9,21.5 L67.7,6.7 L47.5,15.3 L29.5,23.1 L16.7,24.0 L0,24.0 Z";

/**
 * One mask for the whole band: opaque everywhere except the torn slivers at top
 * and bottom, which become true holes.
 *
 * Painting the tears as coloured strips means guessing what sits above and
 * below, and the neighbours here are a photographic hero and a textured
 * background -- neither is a flat colour to match. Cutting the shape out of the
 * band instead lets whatever is actually there show through, so the seam is
 * correct no matter what the adjacent sections change to.
 *
 * Each tear path traces the piece being removed; subtracting both from a
 * full-height rect with evenodd gives the band silhouette.
 */
const BAND_MASK = (() => {
  const H = 806; // matches the band's aspect-ratio box
  // Both tear paths are authored in a 40-unit-tall box. The top one already
  // sits at y=0; the bottom one needs every y shifted down so its 40-unit box
  // lands on the band's lower edge. Rewriting the coordinates keeps the real
  // ragged silhouette rather than approximating it with a straight line.
  const shifted = TEAR_BOTTOM.replace(
    /([ML])\s*([\d.]+)\s*,\s*([\d.]+)/g,
    (_, cmd, x, y) => `${cmd}${x},${(parseFloat(y) + (H - 40)).toFixed(1)}`
  )
    .replace(/V\s*([\d.]+)/g, (_, y) => `V${(parseFloat(y) + (H - 40)).toFixed(1)}`)
    .replace(/H\s*([\d.]+)/g, (_, x) => `H${x}`);

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1435 ${H}" preserveAspectRatio="none">` +
    `<path fill="#fff" fill-rule="evenodd" ` +
    `d="M0,0 H1435 V${H} H0 Z ${TEAR_TOP} ${shifted}"/>` +
    `</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
})();

export function JammyHomeCta() {
  return (
    <div className="jammy-cta__container">
      <section
        className="jammy-cta"
        aria-labelledby="jammy-cta-heading"
        style={{ WebkitMaskImage: BAND_MASK, maskImage: BAND_MASK }}
      >
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

        {/* Torn edges come from BAND_MASK on the section itself -- no overlay
            elements, so nothing has to guess at the neighbours' colours. */}
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
