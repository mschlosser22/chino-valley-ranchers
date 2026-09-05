import Head from "next/head";

import { Nav } from "../../components/Nav";
import { Footer } from "../../components/footer/Footer";
import { JammyLanding } from "../../components/jammy/JammyLanding";

/**
 * The Jammy Egg landing page.
 *
 * Built from the "Mind the drip" design handoff. Static rather than
 * TinaCMS-driven: this is launch copy for a single product and the
 * animation-heavy sections do not map cleanly onto inline blocks.
 *
 * Not yet linked from the nav or homepage -- reachable only by direct URL
 * until the launch decision is made.
 */
export default function JammyPage() {
  return (
    <>
      <Head>
        <title>The Jammy Egg | Chino Valley Ranchers</title>
        <meta
          name="description"
          content="The Jammy Egg is a ready-to-eat soft-boiled egg with a rich, golden center. Fully cooked, peeled, and ready to upgrade toast, ramen, bowls, salads and more."
        />
        <meta
          name="keywords"
          content="jammy egg, soft boiled egg, ready to eat egg, chino valley ranchers, six minute egg"
        />
        <link rel="icon" href="/favicon.ico" />

        {/* Cubano and Proxima Nova now come from the Adobe kit loaded in
            _document.tsx. Preconnect so the kit's CSS and font files start
            resolving during head parse rather than after it -- Adobe serves the
            CSS from use.typekit.net and the faces from p.typekit.net. */}
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin="anonymous" />

        <meta property="og:title" content="The Jammy Egg | Chino Valley Ranchers" />
        <meta
          property="og:description"
          content="The only egg with a golden, jammy center that makes any meal a moment."
        />
        <meta property="og:type" content="website" />
      </Head>

      <div className="relative">
        <Nav />
      </div>

      <main>
        <JammyLanding />
      </main>

      <Footer />
    </>
  );
}
