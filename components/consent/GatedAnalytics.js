import Script from "next/script";

import { useConsent } from "../../context/consent";

export const GA_MEASUREMENT_ID = "UA-37752280-1";

/**
 * Google Analytics, held until analytics consent is granted.
 *
 * Previously this loaded unconditionally from pages/_app.js with
 * strategy="lazyOnload" -- which delayed the request but did not gate it, so a
 * pageview hit still reached Google before the visitor chose anything.
 *
 * Note: UA-37752280-1 is a Universal Analytics property, which stopped
 * processing data in July 2023. The GA4 property that actually receives data
 * (cookie _ga_Q4KN0FHYBM) is injected by the GTM container, not from here --
 * see GatedTagManager. This is kept gated rather than deleted so that nothing
 * silently changes about what the site sends; removing it is a separate call
 * for the client to make.
 */
export function GatedAnalytics() {
  const { consent, ready } = useConsent();

  if (!ready || !consent.analytics) return null;

  return (
    <>
      <Script
        id="ga-lib"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script id="ga-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
