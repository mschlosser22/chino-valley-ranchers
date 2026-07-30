# GTM & tracking handoff — Chino Valley Ranchers

**For:** whoever manages the `GTM-5BWNNM7F` Google Tag Manager container
**From:** Big Chief Creative
**Date:** July 30, 2026
**Re:** Consent gating deployed on chinovalleyranchers.com

---

## What changed on the website

In response to a CIPA "pen register" demand letter, the website no longer loads
any third-party tracking until the visitor makes a cookie choice.

**This includes the GTM container.** Previously `GTM-5BWNNM7F` loaded on every
page view. It now loads only after a visitor accepts cookies.

Nothing inside your container was modified. We do not have access to it, and we
did not need it — the change is at the loader, in the website's code. Your tags,
triggers, and variables are exactly as you left them.

## Why the container is gated rather than individual tags

Google Consent Mode v2 is now active on the site, with all storage categories
denied by default until the visitor chooses.

Consent Mode works well for Google's own tags — GA4 and Google Ads read the
consent state automatically and adjust. It does **not** govern non-Google tags.
A Meta/Facebook pixel, for example, will fire regardless of Consent Mode unless
it has its own consent trigger configured.

Our audit of a live page load found the container currently injects at least:

| Tag | Evidence |
|---|---|
| GA4 property `G-Q4KN0FHYBM` | cookie `_ga_Q4KN0FHYBM` |
| Meta / Facebook pixel | cookie `_fbp` |
| Google Ads / DoubleClick conversion tags | requests to `doubleclick.net`, cookie `_gcl_au` |

None of these appear anywhere in the website's source code. They come from the
container. Because we cannot verify that each one respects consent, we hold the
whole container until the visitor grants **both** analytics and marketing
consent. That guarantees no tag can fire for a visitor who declined, whatever
its configuration.

## What we'd like you to do

**1. Add consent triggers to non-Google tags — the Meta pixel especially.**

In GTM: *Tag > Advanced Settings > Consent Settings > Require additional consent
for tag to fire*, and select `ad_storage` (and `analytics_storage` where
appropriate).

Google's own tags (GA4, Google Ads) already read Consent Mode and generally need
no change, though it's worth confirming each is set to *"Not set"* rather than
*"No additional consent required"* unless you've deliberately chosen otherwise.

**2. Tell us when that's done.**

Once every non-Google tag carries a consent trigger, we can relax the website's
gate from "analytics AND marketing" to "analytics only." That recovers analytics
data from visitors who accept analytics but decline marketing — currently those
visitors get GA but no container. The change is one line in
`components/consent/GatedTagManager.js`.

**3. Keep future tags behind consent.**

Any tag added to this container from now on inherits the same requirement. A tag
without a consent trigger that transmits data to a third party reintroduces
exactly the exposure this work removed.

## What the website now does, precisely

- **Before a choice:** zero requests to Google, YouTube, Meta, or DoubleClick.
  Verified across 15 pages — the only third-party request site-wide is the
  Destini store locator, treated as functional (see below).
- **Consent Mode v2 defaults** are set in the page `<head>` before any tag can
  load: `ad_storage`, `ad_user_data`, `ad_personalization`, `analytics_storage`
  all `denied`; `functionality_storage` and `security_storage` granted.
- **On Accept:** a `consent update` is pushed to `dataLayer`, then the container
  loads normally.
- **On Reject:** nothing loads. A `cvr_consent_update` event is pushed to
  `dataLayer` if you want to observe consent state in GTM.
- **Visitors can change or withdraw consent** any time via "Manage Cookies" in
  the site footer.

### dataLayer events available to you

```js
{ event: 'cvr_consent_update',
  cvr_consent_analytics: true|false,
  cvr_consent_marketing: true|false }
```

## Other things we found and changed

**YouTube embeds** now use `youtube-nocookie.com` and, without marketing
consent, show a click-to-load placeholder instead of the player. This affects
all 9 video components across the site. Videos still play — they just need one
click when cookies are declined.

**reCAPTCHA v3 was removed from the contact page.** It was loading on every page
view and transmitting to Google, but nothing in the code ever called
`grecaptcha.execute()` — the hidden `g-recaptcha-response` field always
submitted empty. It was providing no spam protection while creating exposure. If
spam becomes an issue, it needs wiring properly on form submit, not just
re-adding the script.

**The GTM `<noscript>` iframe was removed.** It loaded the container for
visitors without JavaScript and cannot be consent-gated — there's no way to ask
a no-JS visitor for consent first.

**Destini store locator** is loaded as a *functional* third party with a visible
disclosure on the page, rather than gated. Hard-gating it would leave visitors
who decline cookies on an empty page, since the locator is the page's entire
purpose. **This treatment is pending client and counsel sign-off.**

**The old GTM snippet had a syntax error.** HTML comments were embedded inside
the JavaScript block, which likely prevented the `<head>` container script from
executing. We did not repair it in place — the container is now loaded by
consent-gated code instead, so the bug is moot.

## Expected impact on your reporting

Analytics volume will drop. Only consenting visitors are measured, so expect to
retain roughly **55–75% of previously reported sessions**.

**Traffic is not dropping — measurement is.** The same number of people visit
the site; the reported number goes down. Post-launch figures cannot be compared
to pre-launch figures, and year-over-year comparisons are broken for a year.

Google Ads attribution is affected more than Analytics sessions. If campaigns
are optimising against reported conversions, the platform may make worse bidding
decisions for a period. Worth annotating the deploy date in both GA and Ads.

## Questions

Contact Big Chief Creative. We're glad to coordinate directly with the client's
counsel and supply technical evidence of the pre/post behavior.

---

*This is a technical handoff, not legal advice.*
