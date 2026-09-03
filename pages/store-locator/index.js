import Head from 'next/head'
import Script from 'next/script'
import { useEffect, useState } from 'react'

import { Nav } from '../../components/Nav'
import { Footer } from '../../components/footer/Footer'
import { useConsent } from '../../context/consent'

/**
 * Store locator.
 *
 * Destini's installer script (destinilocators.com/.../install/) builds its
 * iframe with document.write(), which is a silent no-op once the document is
 * closed. Loading it through next/script left the page blank, so we render the
 * same iframe ourselves and skip the installer. That also avoids the jQuery
 * 1.11.3 fetch from code.jquery.com the installer pulled in for its resize
 * helper.
 *
 * Consent: the locator is gated. It is by far the heaviest third party on the
 * site -- a measured page load pulls 116 requests across 13 hosts (Destini,
 * Esri ArcGIS mapping, three CDNs) and runs Destini's own Google Analytics
 * inside their iframe. None of that should fire before the visitor agrees.
 *
 * With marketing consent the locator loads immediately, as it always did.
 * Without it, a placeholder explains what loading it involves and offers a
 * one-click load -- the same pattern used for embedded video.
 */
export default function StoreLocator() {
  const { consent, ready, openPreferences } = useConsent()
  const [loadedByClick, setLoadedByClick] = useState(false)

  // The iframe URL embeds the referring host, only known client-side.
  const [origin, setOrigin] = useState(null)

  useEffect(() => {
    setOrigin(`${window.location.protocol}//${window.location.hostname}`)
  }, [])

  const allowed = (ready && consent.marketing) || loadedByClick

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
        {allowed ? (
          <>
            {locatorSrc && (
              <iframe
                id="destini"
                title="Chino Valley Ranchers store locator"
                src={locatorSrc}
                scrolling="no"
                frameBorder="0"
                style={{ width: '100%', height: '770px' }}
              >
                chinovalleyranchers product locator. Your browser does not
                support iframes.
              </iframe>
            )}

            {/*
              Destini's resize helper, which listens for postMessage from the
              iframe and adjusts its height. Only loaded alongside the iframe.
            */}
            <Script
              id="destini-resize"
              strategy="afterInteractive"
              src="https://destinilocators.com/control/dscript_s.js"
            />
          </>
        ) : (
          <div className="bg-chinodarkblue px-6 py-16 lg:py-24">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="font-ultra uppercase tracking-wide text-chinoyellow text-2xl lg:text-4xl">
                Find Chino Valley near you
              </h1>

              <p className="font-lato text-white text-base lg:text-lg leading-relaxed mt-5">
                Our store finder is provided by Destini. Loading it contacts
                Destini and their mapping provider, and sets cookies from
                destinilocators.com so the map and your search results work.
              </p>

              <button
                type="button"
                onClick={() => setLoadedByClick(true)}
                className="font-din uppercase tracking-wider text-lg bg-chinoyellow text-chinodarkblue rounded-md py-4 px-10 mt-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-chinodarkblue"
              >
                Load store finder
              </button>

              <p className="font-lato text-white text-sm mt-6">
                To load it automatically next time, allow marketing cookies in{' '}
                <button
                  type="button"
                  onClick={openPreferences}
                  className="underline text-chinoyellow focus:outline-none focus-visible:ring-2 focus-visible:ring-chinoyellow rounded-sm"
                >
                  cookie settings
                </button>
                .
              </p>

              <p className="font-lato text-white text-sm mt-8 pt-8 border-t border-white border-opacity-20">
                Prefer not to? Call us on{' '}
                <a href="tel:8003544503" className="underline text-chinoyellow">
                  (800) 354-4503
                </a>{' '}
                or email{' '}
                <a
                  href="mailto:info@chinovalleyranchers.com"
                  className="underline text-chinoyellow"
                >
                  info@chinovalleyranchers.com
                </a>{' '}
                and we&rsquo;ll help you find a store.
              </p>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  )
}
