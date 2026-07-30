import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

/**
 * Consent state for chinovalleyranchers.com.
 *
 * Nothing that transmits data to a third party may run until the visitor has
 * made a choice. Until `ready` is true we are still reading localStorage, so
 * consumers must treat consent as denied.
 *
 * Bump STORAGE_KEY if the category set changes -- an old stored choice can no
 * longer be interpreted as informed consent for a category that did not exist
 * when it was given.
 */
const STORAGE_KEY = "cvr_consent_v1";

export const CONSENT_CATEGORIES = [
  {
    id: "necessary",
    label: "Strictly necessary",
    required: true,
    description:
      "Needed for the site to work — remembering your cookie choice and keeping forms secure. These are never used for tracking or advertising.",
  },
  {
    id: "analytics",
    label: "Analytics",
    required: false,
    description:
      "Google Analytics, so we can see which pages people find useful. We use this to improve the site, not to advertise to you.",
  },
  {
    id: "marketing",
    label: "Marketing & embedded media",
    required: false,
    description:
      "Google advertising tags and embedded YouTube videos. Turning this off means videos need one extra click to play.",
  },
];

const DENIED = { necessary: true, analytics: false, marketing: false };
const GRANTED = { necessary: true, analytics: true, marketing: true };

const ConsentContext = createContext(null);

function readStored() {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;

    return {
      necessary: true,
      analytics: parsed.analytics === true,
      marketing: parsed.marketing === true,
      ts: typeof parsed.ts === "number" ? parsed.ts : null,
    };
  } catch (err) {
    // Private browsing, disabled storage, or corrupted JSON. Treat as no
    // choice made -- the banner shows again, which is the safe direction.
    return null;
  }
}

function persist(consent) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        analytics: consent.analytics,
        marketing: consent.marketing,
        ts: Date.now(),
      })
    );
  } catch (err) {
    // Storage unavailable. The choice still applies for this page view; the
    // banner will simply reappear on the next visit.
  }
}

/**
 * Google Consent Mode v2. The denied-by-default signal is set in _document.tsx
 * before any Google script tag; this only ever sends updates.
 */
function pushConsentMode(consent) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }

  gtag("consent", "update", {
    analytics_storage: consent.analytics ? "granted" : "denied",
    ad_storage: consent.marketing ? "granted" : "denied",
    ad_user_data: consent.marketing ? "granted" : "denied",
    ad_personalization: consent.marketing ? "granted" : "denied",
  });

  window.dataLayer.push({
    event: "cvr_consent_update",
    cvr_consent_analytics: consent.analytics,
    cvr_consent_marketing: consent.marketing,
  });
}

/**
 * Best-effort cleanup when analytics consent is withdrawn. Cookies set on a
 * parent domain by a third party cannot always be removed from here, so this
 * reduces rather than guarantees. Revocation still takes effect immediately
 * because the scripts stop being rendered.
 */
function clearAnalyticsCookies() {
  if (typeof document === "undefined") return;

  const host = window.location.hostname;
  const domains = [host, "." + host];

  const bare = host.split(".").slice(-2).join(".");
  if (bare !== host) domains.push("." + bare);

  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0].trim();
    if (!name) return;
    if (!/^(_ga|_gid|_gat|_gac_|__utm)/.test(name)) return;

    domains.forEach((domain) => {
      document.cookie = `${name}=; path=/; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    });
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  });
}

export function ConsentProvider({ children }) {
  const [consent, setConsent] = useState(DENIED);
  const [hasChoice, setHasChoice] = useState(false);
  const [ready, setReady] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  // localStorage is not available during SSR, so the stored choice is read
  // after mount. Everything stays denied until it resolves.
  useEffect(() => {
    const stored = readStored();

    if (stored) {
      setConsent({
        necessary: true,
        analytics: stored.analytics,
        marketing: stored.marketing,
      });
      setHasChoice(true);
      pushConsentMode(stored);
    }

    setReady(true);
  }, []);

  const commit = useCallback(
    (next) => {
      const resolved = { ...next, necessary: true };

      if (consent.analytics && !resolved.analytics) {
        clearAnalyticsCookies();
      }

      setConsent(resolved);
      setHasChoice(true);
      persist(resolved);
      pushConsentMode(resolved);
    },
    [consent.analytics]
  );

  const acceptAll = useCallback(() => {
    commit(GRANTED);
    setPreferencesOpen(false);
  }, [commit]);

  const rejectAll = useCallback(() => {
    commit(DENIED);
    setPreferencesOpen(false);
  }, [commit]);

  const savePreferences = useCallback(
    (selection) => {
      commit({
        necessary: true,
        analytics: selection.analytics === true,
        marketing: selection.marketing === true,
      });
      setPreferencesOpen(false);
    },
    [commit]
  );

  const value = useMemo(
    () => ({
      consent,
      ready,
      hasChoice,
      // The banner is only a prompt; gating reads `consent` directly, so a
      // visitor who ignores the banner is treated exactly as a rejection.
      showBanner: ready && !hasChoice,
      preferencesOpen,
      openPreferences: () => setPreferencesOpen(true),
      closePreferences: () => setPreferencesOpen(false),
      acceptAll,
      rejectAll,
      savePreferences,
    }),
    [
      consent,
      ready,
      hasChoice,
      preferencesOpen,
      acceptAll,
      rejectAll,
      savePreferences,
    ]
  );

  return (
    <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
  );
}

export function useConsent() {
  const ctx = useContext(ConsentContext);

  if (!ctx) {
    // Rendered outside the provider -- fail closed rather than throwing, so a
    // missing provider can never become a reason tracking runs ungated.
    return {
      consent: DENIED,
      ready: false,
      hasChoice: false,
      showBanner: false,
      preferencesOpen: false,
      openPreferences: () => {},
      closePreferences: () => {},
      acceptAll: () => {},
      rejectAll: () => {},
      savePreferences: () => {},
    };
  }

  return ctx;
}

/** Convenience for gated components. Denied until consent is read and granted. */
export function useHasConsent(category) {
  const { consent, ready } = useConsent();
  return ready && consent[category] === true;
}
