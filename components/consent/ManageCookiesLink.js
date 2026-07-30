import { useConsent } from "../../context/consent";

/**
 * Reopens the preferences dialog. Rendered in the footer so a visitor can
 * change or withdraw consent as easily as they gave it.
 */
export function ManageCookiesLink({ className = "" }) {
  const { openPreferences } = useConsent();

  return (
    <button
      type="button"
      onClick={openPreferences}
      className={`text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm ${className}`}
    >
      Manage Cookies
    </button>
  );
}
