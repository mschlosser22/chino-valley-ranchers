import Script from "next/script";

import { useConsent } from "../../context/consent";

export const GTM_CONTAINER_ID = "GTM-5BWNNM7F";

/**
 * Loads the Google Tag Manager container, but only after consent.
 *
 * We do not manage the GTM container -- the client's tag manager does. That
 * means we cannot rely on the tags inside it being individually consent-aware.
 * A live audit found at least two tags absent from this codebase (a GA4
 * property and a Meta/Facebook pixel), and non-Google tags like Meta's do not
 * honour Google Consent Mode at all.
 *
 * So gating happens at the loader instead of at the tag: if the container never
 * boots, nothing inside it can fire, however it is configured.
 *
 * The container is held until BOTH analytics and marketing are granted. That is
 * stricter than Consent Mode alone would require, and it costs us analytics
 * from visitors who accept analytics but reject marketing. It is deliberate:
 * it is the only way to guarantee a marketing-rejecting visitor is not tracked
 * by a non-Google tag we do not control. Once the container's tags carry proper
 * consent triggers (see docs/gtm-handoff.md), this can be relaxed to
 * `analytics` alone and Consent Mode will handle the rest.
 */
export function GatedTagManager() {
  const { consent, ready } = useConsent();

  const allowed = ready && consent.analytics && consent.marketing;

  if (!allowed) return null;

  return (
    <Script
      id="gtm-container"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(w,d,s,l,i){
            w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),
                dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');
        `,
      }}
    />
  );
}
