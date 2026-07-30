import { useConsent } from "../../context/consent";

/**
 * First-visit consent prompt.
 *
 * Accept and Reject are deliberately given identical visual weight. CPRA
 * requires that refusing be as easy as accepting, and this site is being
 * remediated in response to a CIPA demand -- a banner that nudges toward
 * acceptance would trade legal posture for analytics volume.
 */
export function ConsentBanner() {
  const { showBanner, acceptAll, rejectAll, openPreferences } = useConsent();

  if (!showBanner) return null;

  const choiceButton =
    "font-din uppercase tracking-wider text-lg rounded-md py-3 px-6 w-full sm:w-auto sm:min-w-[10rem] text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-chinodarkblue focus-visible:ring-white";

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-consent bg-chinodarkblue border-t-4 border-chinoyellow shadow-2xl"
    >
      <div className="max-w-6xl mx-auto px-6 py-5 lg:px-8 lg:py-6">
        <div className="lg:flex lg:items-center lg:gap-8">
          <div className="flex-1">
            <h2 className="font-ultra uppercase tracking-wide text-chinoyellow text-lg lg:text-xl">
              We use cookies
            </h2>
            <p className="font-lato text-white text-base leading-relaxed mt-2 max-w-3xl">
              We&rsquo;d like to use analytics and marketing cookies to
              understand how the site is used and to show embedded videos.
              Nothing runs until you choose. You can change your mind any time
              from the footer.{" "}
              <a
                href="/privacy-policy"
                className="underline text-chinoyellow whitespace-nowrap"
              >
                Privacy Policy
              </a>
            </p>
          </div>

          <div className="mt-5 lg:mt-0 flex flex-col sm:flex-row sm:flex-wrap gap-3 lg:flex-shrink-0">
            <button
              type="button"
              onClick={acceptAll}
              className={`${choiceButton} bg-chinoyellow text-chinodarkblue`}
            >
              Accept all
            </button>
            <button
              type="button"
              onClick={rejectAll}
              className={`${choiceButton} bg-chinoyellow text-chinodarkblue`}
            >
              Reject all
            </button>
            <button
              type="button"
              onClick={openPreferences}
              className={`${choiceButton} bg-transparent text-white border-2 border-white`}
            >
              Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
