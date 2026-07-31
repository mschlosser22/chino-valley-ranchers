import Head from 'next/head'
import Script from 'next/script'
import { useEffect, useState } from 'react'

import { Nav } from '../../components/Nav'
import { Footer } from '../../components/footer/Footer'

/**
 * Store locator.
 *
 * Destini's installer script (destinilocators.com/.../install/) builds its
 * iframe with document.write(). That only works while the document is still
 * open, so loading it through next/script -- which runs after hydration -- is a
 * silent no-op and leaves a blank page. We therefore render the same iframe
 * ourselves and skip the installer entirely.
 *
 * The installer also pulls in jQuery 1.11.3 from code.jquery.com purely to
 * drive an auto-resize helper. Rendering the iframe directly avoids that
 * third-party dependency as well; the iframe carries the same fixed 770px
 * height the installer used.
 *
 * Consent: the locator is the entire purpose of this page, so it is treated as
 * a FUNCTIONAL third party -- loaded so the page works, with a visible
 * disclosure naming the provider. This treatment is pending client and counsel
 * sign-off. To gate it strictly instead, wrap `showLocator` in a marketing
 * consent check from useConsent().
 */
export default function StoreLocator() {
  // The iframe URL includes the referring host, which is only known client-side.
  const [origin, setOrigin] = useState(null)

  useEffect(() => {
    setOrigin(`${window.location.protocol}//${window.location.hostname}`)
  }, [])

  const locatorSrc = origin
    ? `https://destinilocators.com/chinovalleyranchers/site/locator.php?MM=panel2&RFR=${encodeURIComponent(origin)}`
    : null

  return (
    <>
      <Head>
        <title>Store Locator | Chino Valley Ranchers</title>
        <meta name="description" content="Healthy And Delicious Organic Eggs Since 1953"></meta>
        <meta name="keywords" content="chino valley ranchers, store locator"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`relative min-`}>
        <Nav />
      </div>

      {/* Clears the fixed nav, whose logo hangs below the bar on desktop. */}
      <div className="pt-20 lg:pt-48">
        {locatorSrc && (
          <iframe
            id="destini"
            title="Chino Valley Ranchers store locator"
            src={locatorSrc}
            scrolling="no"
            frameBorder="0"
            style={{ width: '100%', height: '770px' }}
          >
            chinovalleyranchers product locator. Your browser does not support
            iframes.
          </iframe>
        )}

        {/*
          Destini's resize helper, which listens for postMessage from the
          iframe and adjusts its height. Loaded after the iframe exists.
        */}
        <Script
          id="destini-resize"
          strategy="afterInteractive"
          src="https://destinilocators.com/control/dscript_s.js"
        />
      </div>

      <p className="font-lato text-sm text-gray-600 text-center max-w-3xl mx-auto px-8 py-8">
        Our store finder is provided by Destini. Using it may set cookies from
        destinilocators.com so the map and your search results work.
      </p>

      <Footer />
    </>
  )
}
