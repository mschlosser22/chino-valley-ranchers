import Head from "next/head";

import { Nav } from "../../components/Nav";
import { Footer } from "../../components/footer/Footer";
import { RegenerativeLanding } from "../../components/regenerative/RegenerativeLanding";

/**
 * The Regenerative landing page.
 *
 * Rebuilt from the CVR-Regen-LP-R1-v2 design. The design handoff was a fixed
 * 2075px canvas of flattened images with every headline and paragraph baked
 * into JPEGs; this is the same layout rebuilt as live text so it reflows on a
 * phone, can be selected and copied, and is visible to search engines. Only
 * the multi-colour script lockups ship as artwork, because they use Nexa Rust
 * Script with a layered shadow that CSS cannot reproduce.
 *
 * Uses the site's own Nav and Footer rather than the header and footer bands
 * drawn in the design.
 */
export default function RegenerativePage() {
  return (
    <>
      <div className="relative">
        <Head>
          <title>Regenerative | Chino Valley Ranchers</title>
          <meta
            name="description"
            content="Chino Valley Ranchers is Regenerative Organic Certified. Our organic regenerative eggs come from hens raised on family farms using practices that build healthier soil and a better future."
          />
          <meta
            name="keywords"
            content="regenerative eggs, regenerative organic certified, organic eggs, pasture raised eggs, chino valley ranchers, regenerative agriculture"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Nav />

        <RegenerativeLanding />
      </div>
      <Footer />
    </>
  );
}
