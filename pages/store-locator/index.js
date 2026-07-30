import Head from 'next/head'
import Script from 'next/script'

import { Nav } from '../../components/Nav'
import { Footer } from '../../components/footer/Footer'

/**
 * Store locator.
 *
 * The Destini script is the entire function of this page -- hard-gating it
 * behind marketing consent would leave a visitor who rejected cookies on a
 * blank page. It is therefore treated as a FUNCTIONAL third party: loaded so
 * the page works, with a visible disclosure naming the provider.
 *
 * This treatment is pending client and counsel sign-off. To gate it strictly
 * instead, wrap the <Script> in a marketing-consent check the same way
 * GatedTagManager does.
 *
 * It is moved out of <Head> to next/script afterInteractive so it no longer
 * blocks first paint, and the disclosure renders before it loads.
 */
export default function StoreLocator() {

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

    <Script
      id="destini-locator"
      strategy="afterInteractive"
      src="https://destinilocators.com/chinovalleyranchers/site/install/"
    />

    <div className='destini-footer'>
      <p className="font-lato text-sm text-gray-600 text-center max-w-3xl mx-auto px-8 pb-8">
        Our store finder is provided by Destini. Using it may set cookies from
        destinilocators.com so the map and your search results work.
      </p>
      <Footer />
    </div>
    </>
  )
}
