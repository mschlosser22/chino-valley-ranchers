import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition, Switch } from "@headlessui/react";

import { useConsent, CONSENT_CATEGORIES } from "../../context/consent";

export function ConsentPreferences() {
  const {
    consent,
    preferencesOpen,
    closePreferences,
    savePreferences,
    acceptAll,
    rejectAll,
  } = useConsent();

  const [draft, setDraft] = useState(consent);
  const saveRef = useRef(null);

  // Re-seed the toggles from saved consent each time the dialog opens, so an
  // abandoned edit does not persist into the next visit to this dialog.
  useEffect(() => {
    if (preferencesOpen) setDraft(consent);
  }, [preferencesOpen, consent]);

  return (
    <Transition show={preferencesOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-consent overflow-y-auto"
        onClose={closePreferences}
        initialFocus={saveRef}
      >
        <div className="min-h-screen px-4 flex items-center justify-center">
          <Transition.Child
            as={Fragment}
            enter="transition-opacity duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-60" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition duration-200"
            enterFrom="opacity-0 translate-y-4"
            enterTo="opacity-100 translate-y-0"
            leave="transition duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-4"
          >
            <div className="relative bg-white rounded-md w-full max-w-2xl my-12 shadow-xl">
              <div className="px-6 py-6 lg:px-8 lg:py-8">
                <Dialog.Title
                  as="h2"
                  className="font-ultra uppercase tracking-wide text-chinodarkblue text-xl lg:text-2xl"
                >
                  Cookie preferences
                </Dialog.Title>

                <Dialog.Description
                  as="p"
                  className="font-lato text-chinodarkblue text-base leading-relaxed mt-3"
                >
                  Choose which cookies Chino Valley Ranchers may use. Your
                  choice is saved on this device and you can change it any time
                  from the link in the footer.
                </Dialog.Description>

                <div className="mt-6 border-t border-gray-200">
                  {CONSENT_CATEGORIES.map((category) => {
                    const enabled = category.required
                      ? true
                      : draft[category.id] === true;

                    return (
                      <div
                        key={category.id}
                        className="py-5 border-b border-gray-200 flex items-start justify-between gap-4"
                      >
                        <div className="flex-1">
                          <h3 className="font-din uppercase tracking-wider text-chinodarkblue text-lg">
                            {category.label}
                          </h3>
                          <p className="font-lato text-sm text-gray-700 leading-relaxed mt-1">
                            {category.description}
                          </p>
                        </div>

                        <Switch
                          checked={enabled}
                          disabled={category.required}
                          onChange={(value) =>
                            setDraft((prev) => ({
                              ...prev,
                              [category.id]: value,
                            }))
                          }
                          className={[
                            "relative inline-flex flex-shrink-0 h-7 w-12 mt-1 border-2 border-transparent rounded-full",
                            "transition-colors ease-in-out duration-200",
                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-chinoblue",
                            category.required
                              ? "bg-chinogray cursor-not-allowed"
                              : enabled
                              ? "bg-chinoblue cursor-pointer"
                              : "bg-gray-300 cursor-pointer",
                          ].join(" ")}
                        >
                          <span className="sr-only">
                            {category.required
                              ? `${category.label} — always on`
                              : `Allow ${category.label.toLowerCase()} cookies`}
                          </span>
                          <span
                            aria-hidden="true"
                            className={[
                              "pointer-events-none inline-block h-6 w-6 rounded-full bg-white shadow",
                              "transform ring-0 transition ease-in-out duration-200",
                              enabled ? "translate-x-5" : "translate-x-0",
                            ].join(" ")}
                          />
                        </Switch>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap gap-3">
                  <button
                    ref={saveRef}
                    type="button"
                    onClick={() => savePreferences(draft)}
                    className="font-din uppercase tracking-wider text-lg bg-chinoyellow text-chinodarkblue rounded-md py-3 px-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-chinoblue"
                  >
                    Save preferences
                  </button>
                  <button
                    type="button"
                    onClick={acceptAll}
                    className="font-din uppercase tracking-wider text-lg bg-white text-chinodarkblue border-2 border-chinodarkblue rounded-md py-3 px-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-chinoblue"
                  >
                    Accept all
                  </button>
                  <button
                    type="button"
                    onClick={rejectAll}
                    className="font-din uppercase tracking-wider text-lg bg-white text-chinodarkblue border-2 border-chinodarkblue rounded-md py-3 px-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-chinoblue"
                  >
                    Reject all
                  </button>
                </div>

                <p className="font-lato text-sm text-gray-600 mt-5">
                  Read our{" "}
                  <a
                    href="/privacy-policy"
                    className="underline text-chinoblue"
                  >
                    Privacy Policy
                  </a>{" "}
                  for details on what each cookie does.
                </p>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
